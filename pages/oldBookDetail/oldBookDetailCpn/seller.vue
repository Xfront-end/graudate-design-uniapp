<template>
	<view class="container">
		<view class="avatar">
			<image :src="sellerInfo.avatarUrl" mode="aspectFill"></image>
		</view>
		<view class="text-info">
			<view class="name-price">
				{{sellerInfo.name}}: <text class="iconfont icon-rmb"></text>{{sellerInfo.price}}
			</view>
			<view class="old-desc">
				<text class="old-precent">{{sellerInfo.oldDesc}}</text>
				<text class="desc">{{sellerInfo.desc}}</text>
			</view>
		</view>
		<view class="contact" @click.stop="contact">
			<view class="iconfont icon-weixin"></view>
			<view>联系Ta</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			sellerInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			contact() {
				const isLogin = this.$store.getters.isLogin
				if(isLogin) {
					this.$emit("contact", this.sellerInfo)
					return 
				}
				uni.showModal({
					title: '提示',
					content: '聊天功能需要实名认证',
					confirmText: '去认证',
					cancelText: '不了',
					success: (res) => {
						if(res.confirm) {
							this.$emit("toIdentify")
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 110rpx;
		border-bottom: 1px #EEEEEE solid;
		color: #515151;
	}
	.avatar image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.text-info {
		margin-left: 20rpx;
		flex: 1;
	}
	.name-price {
		height: 38rpx;
		line-height: 38rpx;
		margin-bottom: 10rpx;
	}
	.old-precent {
		padding: 5rpx 10rpx;
		border: 1px #ff5777 solid;
		color: #FF5777;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		font-size: 22rpx;
	}
	.icon-rmb {
		font-size: 26rpx;
		margin-left: 15rpx;
	}
	.contact {
		text-align: center;
		font-size: 22rpx;
	}
	.desc {
		font-size: 22rpx;
		margin-left: 10rpx;
	}
	.icon-weixin {
		color: #1AAD19;
	}
</style>
