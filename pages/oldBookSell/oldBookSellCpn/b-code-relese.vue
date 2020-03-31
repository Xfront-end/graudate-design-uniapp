<template>
	<view class="container" @click="release">
		<text class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></text>
		扫码卖书
	</view>
</template>

<script>
	export default {
		methods: {
			release() {
				this.$emit('release')
			}
		}
	}
</script>

<style scoped>
	.container {
		height: 85rpx;
		line-height: 85rpx;
		width: 260rpx;
		text-align: center;
		background-color: #ff5777;
		border: 1px #FFFFFF solid;
		box-shadow: 0px 0px 3px #FF5777;
		color: #FFFFFF;
		border-radius: 50rpx;
	}
</style>
