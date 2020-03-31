<template>
	<view>
		<view class="form">
			<view class="margin-top">
				<from-input iconClass="icon-xingming"
										inputType="text"
										@getInputCentent="onGetInputCentent"
										:mustFill="true" 
										placeHolder="您的姓名"
										itemName="姓名"/>
			</view>
			<view class="margin-top">
				<from-input iconClass="icon-ziyuan"
										:mustFill="true" 
										@getInputCentent="onGetInputCentent"
										inputType="number"
										placeHolder="您的学工号"
										itemName="学号"/>
			</view>
			<view class="margin-top">
				<radio-sex @sexChanged="onSexChanged"/>
			</view>
			<view class="margin-top">
				<linkage @chooseMajor="onChooseMajor"/>
				<view class="normal-picker">
					<normal-picker @chooseYear="onChooseYear"/>
				</view>
			</view>
			<view class="margin-top-img">
				<view class="text">上传学生证照片<text class="iconfont icon-bitianxiang-"></text></view>
				<choose-image @getTempFilePaths="onGetTempFilePaths" :limit="1"/>
			</view>
			<button @click="onSubmit" class="submitButton" :disabled="!caniSubmit">提交实名认证</button>
		</view>
		<z-login
			:isShowModal="isShowModal" 
			@bottomModalclosed="onbottomModalclosed"
			@successLogin="onSuccessLogin"
			@failLogin="onFailLogin"
			/>
	</view>
</template>

<script>
	//全局
	import fromInput from '../../components/form-input/form-input.vue'
	import linkage from '../../components/linkage/linkage.vue'
	import normalPicker from '../../components/normalPicker/noram-picker.vue'
	import chooseImage from '../../components/chooseImage/chooseImg.vue'
	import zLogin from '../../components/login/login.vue'
	//子组件
	import radioSex from './identifyChildCpn/radio-sex.vue'
	//js
	const db = wx.cloud.database()
	const user = db.collection('user')
	import {write2cloudStroge} from '../../common/js/common.js'
	export default {
		components: {
			fromInput,
			radioSex,
			linkage,
			normalPicker,
			chooseImage,
			zLogin
		},
		data() {
			return {
				isShowModal: false,
				sex: 1,
				department: '计算机学院',
				major: '计算机科学与技术学院',
				year: 2018,
				studentIdCard: [],
				userName: '',
				studentNumber: 0   
			}
		},
		methods: {
			onbottomModalclosed() {
				this.isShowModal = false
			},
			onSexChanged(upLoad) {
				this.sex = upLoad
			},
			onChooseMajor(department, major) {
				this.department = department
				this.major = major
			},
			onChooseYear(upLoad) {
				this.year = upLoad
			},
			onGetTempFilePaths(upLoad) {
				this.studentIdCard = upLoad
			},
			onGetInputCentent(upLoad) {
				if(upLoad.type === '姓名') {
					this.userName =  upLoad.content
				}else if(upLoad.type === '学号') {
					this.studentNumber = upLoad.content
				}
			},
			async onSuccessLogin(userInfo) {
				uni.showLoading({
					title: '提交数据中'
				})
				const fileID = await write2cloudStroge('studentIdCard/', this.studentIdCard)
				this.write2db(fileID[0], userInfo)
				this.returnFromPage()
			},
			onFailLogin() {
				uni.showModal({
					title: '拒绝实名认证'
				})
			},
			write2db(fileId, userInfo) {
				const formInfo = {
					userName: this.userName,
					studentNumber: this.studentNumber,
					sex: this.sex,
					department: this.department,
					major: this.major,
					year: this.year,
				}
				return new Promise((resolve, reject) => {
					user.add({
						data: {
							...formInfo,
							fileId,
							...userInfo
						}
					}).then(res => {
						uni.hideLoading()
						resolve()
					})
				})
			},
			returnFromPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			onSubmit() {
				wx.getSetting({
					success: (res) => {
						if(res.authSetting['scope.userInfo']) {
							wx.getUserInfo({
								success: async (res) => {
									uni.showLoading({
										title: '提交数据中'
									})
									const fileID = await write2cloudStroge('studentIdCard/', this.studentIdCard)
									this.write2db(fileID[0], res.userInfo)
									this.returnFromPage()
								}
							})
						}else {
							uni.showToast({
								icon: 'none',
								title: '请你授权小程序'
							})
							this.isShowModal = true
						}
					}
				})
				
			},
		},
		computed: {
			caniSubmit() {
				return this.studentIdCard.length !== 0 && this.userName.length !== 0 && this.studentNumber != 0
			}
		}
	}
</script>

<style scoped>
.margin-top {
	margin-top: 50rpx;
}
.normal-picker {
	margin-top: 110rpx;
}
.margin-top-img {
	margin-top: 100rpx;
	margin-left: 20rpx;
}
.text {
	color: #666666;
	font-size: 28rpx;
	margin-bottom: 20rpx;
}
.submitButton {
	color: #FFFFFF;
	margin-top: 40rpx;
	background-color: #FF5777;
	width: 60%;
	border-radius: 80rpx;
}
.icon-bitianxiang- {
	color: #ff0014;
}
</style>
