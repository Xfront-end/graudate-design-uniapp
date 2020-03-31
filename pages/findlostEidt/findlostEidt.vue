<template>
	<view>
		<view class="margin-top">
			<radio-role @roleChanged="onRoleChange"></radio-role>
		</view>
		<view class="margin-top">
			<from-input
				@getInputCentent="onGetInputContent"
				icon-class="icon-shiwuzhaoling"
				:must-fill="true"
				:place-holder="placeHolder+'物品地点'"
				item-name="名称"
			/>
		</view>
		<view class="margin-top">
			<from-input
				@getInputCentent="onGetInputContent"
				icon-class="icon-didian-copy"
				:must-fill="true"
				:place-holder="placeHolder+'物品地点'"
				item-name="地点"
			/>
		</view>
		<view class="pick-container">
			<view class="tips same-height">
				请选择{{placeHolder}}日期:
			</view>
			<view class="data-picker same-height">
				<picker
					mode="date"
					:value="date" 
					:start="startDate" 
					:end="endDate" 
					@change="bindDateChange">
				  <view class="picker-res">
						<text class="iconfont icon-shizhong"></text>
						<text>{{date}}</text>
					</view>
				</picker>
			</view>
		</view>
		<view class="mark-input-area .margin-top">
			<view>
				<text class="iconfont icon-beizhu"></text>请描述物品特征及相关线索:
			</view>
			<textarea 
				maxlength="140"
				v-model="mark" 
				placeholder="请在此书输入内容(限140字)...记得填写联系方式哦" />
		</view>
		<view class="choose-image">
			<view class="image-tips">
				<text class="iconfont icon-ziyuan1"></text>
				添加{{placeHolder}}物品图片
			</view>
			<choose-image @getTempFilePaths="onGetTempFilePaths"/>
		</view>
		<view class="subit" @click="submit">
			发布{{placeHolder}}信息
		</view>
		<login 
			tips='授权登录'
			:is-show-modal="isShowLogin"
			@bottomModalclosed="onBottomModalclosed"
			@successLogin="onLoginSuccess"
		></login>
	</view>
</template>

<script>
	import fromInput from '../../components/form-input/form-input.vue'
	import chooseImage from '../../components/chooseImage/chooseImg.vue'
	import login from '../../components/login/login.vue'
	import radioRole from './findlostEditCpn/radio-role.vue'
	import { write2cloudStroge, getUserInfo } from '../../common/js/common.js'
	const db = wx.cloud.database()
	export default {
		components: {
			fromInput,
			radioRole,
			chooseImage,
			login
		},
		data() {
			const currentDate = this.getDate({format: true})
			return {
				type: 0,
				isShowLogin: false,
				date: currentDate,
				startDate: '2020-03-01',
				endDate: currentDate,
				placeHolder: '丢失',
				lostThings: '',
				place: '',
				mark: '',
				images: ''
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			onRoleChange(type) {
				this.type = type
				this.placeHolder = type==0?'丢失':'拾取'
			},
			bindDateChange(event) {
				this.date = event.detail.value
			},
			onGetInputContent(upLoad) {
				if(upLoad.type === '名称') {
					this.lostThings = upLoad.content
				}else if(upLoad.type === '地点') {
					this.place = upLoad.content
				}
			},
			onGetTempFilePaths(upload) {
				this.images = upload
			},
			onBottomModalclosed() {
				this.isShowLogin = false
			},
			onLoginSuccess(userInfo) {
				this.write2db(userInfo)
			},
			async write2db(userInfo) {
				uni.showLoading({
					mask: true,
					title: '发布中...'
				})
				let images= []
				if(this.images.length !== 0) {
					images = await write2cloudStroge('findlost/', this.images)
					console.log('图片上传完成')
				}
				const lostDetail = {
					type: this.type,
					userName: userInfo.nickName,
					avatarUrl: userInfo.avatarUrl,
					lostThings: this.lostThings,
					place: this.place,
					time: this.date,
					desc: this.mark,
					createdTime: db.serverDate(),
					images
				}
				db.collection('findlost').add({
					data: {
						...lostDetail
					}
				}).then(res => {
					uni.hideLoading()
					uni.navigateBack({
						delta: 1
					})
				})
			},
			async submit() {
				if(!(this.lostThings && this.place)) {
					uni.showToast({
						icon: 'none',
						title: '必填项不可以为空'
					})
					return
				}
				const userInfo = await getUserInfo()
				if(userInfo === '') {
					this.isShowLogin = true
				}else {
					this.write2db(userInfo)
				}
			}
		}
	}
</script>

<style scoped>
	.pick-container {
		padding: 0 35rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 140rpx;
		color: #CDCDC9;
	}
	.tips {
		color: #515151;
	}
	.same-height {
		height: 70rpx;
		line-height: 70rpx;
	}
	.picker-res {
		display: flex;
		border-top: 1px #EEEEEE solid;
		border-bottom: 1px #EEEEEE solid;
	}
	.picker-res text:first-child {
		width: 40rpx;
	}
	.picker-res text:last-child {
		flex: 1;
		text-align: center;
	}
	.margin-top {
		margin-top: 20rpx;
	}
	.mark-input-area {
		margin-left: 38rpx;
		color: #515151;
	}
	textarea {
		padding: 15rpx;
		border: 1px #EEEEEE solid;
		margin-top: 20rpx;
		border-radius: 20rpx;
		height: 180rpx;
	}
	.choose-image {
		color: #515151;
		margin-top: 15rpx;
	}
	.image-tips {
		margin-bottom: 15rpx;
	}
	.subit {
		width: 48%;
		background-color: #FF5777;
		color: #FFFFFF;
		border-radius: 50rpx;
		text-align: center;
		margin: 70rpx auto;
		height: 90rpx;
		line-height: 90rpx;
	}
	
</style>
