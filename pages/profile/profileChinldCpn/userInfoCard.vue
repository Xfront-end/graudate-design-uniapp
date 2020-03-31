<template>
	<view class="userInfo">
		<image src="../../../static/images/profile/my@bg.png" class="gb"></image>
		<view class="avatar">
			<open-data type="userAvatarUrl"></open-data>
		</view>
		<view class="login-info">
			<open-data type="userNickName"></open-data>
			<view>
				({{loginStatus?'身份已认证':'身份未认证'}})
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			loginStatus: {
				type: Boolean,
				defualt() {
					return false
				}
			}
		}
	}
</script>

<style scoped>
	.userInfo {
		position: relative;
		height: 350rpx;
		width: 100%;
		overflow: hidden;
	}
	.gb {
		width: 100%;
	}
	.userInfo .avatar {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 195rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.login-info {
		left: 40rpx;
		top: 90rpx;
		position: absolute;
		z-index: 999;
		color: #FFFDEF;
		font-size: 40rpx;
		font-weight: bold;
		letter-spacing: 8rpx;
	}
	.login-info view {
		font-size: 28rpx;
		color: #FFFDEF;
		font-weight: 400;
		letter-spacing: normal;
	}
</style>
