<template>
	<view class="container">
		<textarea 
			v-model="content"
			@focus="setKeyboradHeight"
			:maxlength="300"
			focus
			@blur="resetKeyboradHeight"
			placeholder="在这里分享您的新鲜事儿..." 
			placeholder-class="placeholder-class"/>
		<view class="ablum-container">
			<block v-for="(item ,index) in albumArr" :key="item">
				<view class="pic">
					<image :src="item" mode="aspectFill" class="userPic" @click="onPreviewImg"></image>	
					<image src="../../static/images/newThingEdit/delete.png" class="del" @click="deleImg(index)"></image>
				</view>
			</block>
			<view class="pic" @click="chooseImg" v-show="!isShow">
				<image src="../../static/images/newThingEdit/increase.png" class="inc"></image>
			</view>
		</view>
		<view class="footer" :style="{bottom:bottomDest+'px'}">
			<text>还可以输入: {{300-content.length}}字</text>
			<text @click="publish" class="release">发布</text>
		</view>
	</view>
</template>

<script>
	const MAX_PIC_COUNT =  9
	const MAX_CONTENT_LENGTH = 300
	const db = wx.cloud.database()
	
	import { write2cloudStroge } from '../../common/js/common.js'
	export default {
		data() {
			return {
				albumArr: [],
				content: '',
				bottomDest: 0,
				userInfo: {}
			}
		},
		onLoad(options) {
			this.userInfo = options
		},
		methods: {
			chooseImg() {
				uni.chooseImage({
					count: MAX_PIC_COUNT - this.albumArr.length,
					sizeType: ['orginal', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						if(res.tempFilePaths.length !== 0) {
							this.albumArr.push(...res.tempFilePaths)
						}
					},
				})
			},
			deleImg(index) {
				this.albumArr.splice(index, 1)
			},
			setKeyboradHeight(event) {
				this.bottomDest = event.detail.height
			},
			resetKeyboradHeight() {
				this.bottomDest = 0
			},
			onPreviewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.albumArr
				})
			},
			successPublish() {
				uni.hideLoading()
				uni.showToast({
					icon: 'none',
					title: '发布成功'
				})
				uni.navigateBack({
					delta: 1
				})
			},
			async publish() {
				const content = this.content.trim()
				if(!content) {
					uni.showToast({
						icon: 'none',
						title: '内容不许为空'
					})
					return 
				}
				uni.showLoading({
					title: '上传loading',
					mask: true
				})
				const fileIDArr = await write2cloudStroge('newThings/', this.albumArr)
				db.collection('newThings').add({
					data: {
						...this.userInfo,
						fileIDArr,
						content,
						createdTime: db.serverDate(),
						favNum: 0
					}
				}).then(res => {
					this.successPublish()
					wx.cloud.callFunction({
						name: 'baiduAI',
						data: {
							$url: 'checkNewThing',
							fileIDArr,
							content,
							_id: res._id
						}
					}).then(res => {
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: res.result.info
						})
					})
				}).catch(err => {
					uni.showToast({
						title: '上传失败'
					})
				})
			}
		},
		computed: {
			isShow() {
				return this.albumArr.length === MAX_PIC_COUNT
			}
		}
	}
</script>

<style scoped>
	.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 100rpx;
			line-height: 100rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 35rpx;
			color: #666666;
			background-color: #FFFFFF;
		}
		textarea {
			width: 100%;
		}
		.release {
			height: 60rpx;
			width: 120rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 20rpx;
			background-color: #ff5777;
			color: #FFFFFF;
		}
	.container {
		padding: 10rpx;
	}
	.placeholder-class{
		color: #666666;
	}
	.ablum-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border: 1px #333333 soild;
	}
	.pic {
		position: relative;
		width: 33.3%;
		box-sizing: border-box;
		border: 1px #F1F1F1 solid;
		height: 250rpx;
	}
	.userPic {
		width: 100%;
		height: 100%;
	}
	.pic .inc {
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.pic .del {
		position: absolute;
		top: 5rpx;
		right: 5rpx;
		width: 36rpx;
		height: 36rpx;
	}
</style>
