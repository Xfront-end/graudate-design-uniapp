<template>
	<view class="container">
		<block v-for="(item, index) in services" :key="index">
			<view @click="nav2ThatPage(item.url)">
				<text class="iconfont big-font" :class="item.icon"></text>
				<text class="normal">{{item.name}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				services: [
					{
						name: '我的健康码',
						icon: 'icon-erweima',
						url: '../profileFav/profileFav'
					},
					{
						name: '我的收藏',
						icon: 'icon-viphuiyuanhuangguan',
						url: '../profileFav/profileFav'
					},
					{
						name: '我的工单',
						icon: 'icon-fabu',
						url: '../profileFav/profileFav'
					},
				]
			}
		},
		methods: {
			nav2ThatPage(url) {
				if(this.$store.getters.isLogin) {
					this.$emit('nav2ThatPage', url)
				}else {
					uni.showToast({
						icon: 'none',
						title: '没认证,别捣乱'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.container view {
		width: 33.3%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.normal {
		font-size: 32rpx;
		color: #525252;
		padding-bottom: 20rpx;
	}
	.big-font {
		padding: 20rpx;
		font-size: 50rpx;
	}
</style>
