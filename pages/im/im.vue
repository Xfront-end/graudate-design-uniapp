<template>
	<view>
		<view class="container" :style="containerStyle">
			<chat-room 
				style="width: 100%; height: 100%" 
				:envId="chatRoomEnvId" 
				:collection="chatRoomCollection" 
				:groupId="chatRoomGroupId"
				:groupName="chatRoomGroupName" 
				:userInfo="userInfo" 
				:onGetUserInfo="ongetUserInfo" 
				:getOpenID="getopenID"></chat-room>
		</view>
	</view>
</template>

<script>
	import chatRoom from '../../components/chatRoom/chat-room.vue'
	export default {
		components: {
			chatRoom,
		},
		data() {
			return {
				avatarUrl: './user-unlogin.png',
				userInfo: null,
				logged: false,
				takeSession: false,
				requestResult: '',
				chatRoomCollection: 'chatroom',
				chatRoomGroupId: 'demo',
				chatRoomGroupName: '聊天室',
				containerStyle: '',
				onGetUserInfo: null,
				getOpenID: null,
			}
		},
		methods: {
			getopenID: async function() {
				if (this.openid) {
					return this.openid
				}

				const {
					result
				} = await wx.cloud.callFunction({
					name: 'login',
				})

				return result.openid
			},

			ongetUserInfo: function(e) {
				if (!this.logged && e.detail.userInfo) {
					this.logged = true
					this.avatarUrl = e.detail.userInfo.avatarUrl
					this.userInfo = e.detail.userInfo
				}
			},

			onShareAppMessage() {
				return {
					title: '即时通信 Demo',
					path: '/pages/im/room/room',
				}
			},
		},
		onLoad(options) {
			const sellerInfo = JSON.parse(options.sellerInfo)
			console.log(sellerInfo)
			uni.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
						uni.getUserInfo({
							success: res => {
								this.avatarUrl = res.userInfo.avatarUrl
								this.userInfo = res.userInfo
							}
						})
					}
				}
			})
			this.onGetUserInfo = this.onGetUserInfo
			this.getOpenID = this.getOpenID
			uni.getSystemInfo({
				success: res => {
					console.log('system info', res)
					if (res.safeArea) {
						const { top, bottom } = res.safeArea
						this.containerStyle = `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`
					}
				}
			})
		}
	}
</script>

<style>
	.container {
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: 80rpx;
		padding-bottom: 30rpx;
	}
</style>
