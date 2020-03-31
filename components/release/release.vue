<template>
	<view class="container">
		<text class="iconfont icon-fabu1" @click="onPublish"></text>
	</view>
</template>

<script>
	export default {
		methods: {
			onPublish() {
				this.$emit('onPublish')
			}
		}
	}
</script>

<style scoped>
	.container {
		background-color: #ff5777;
		border-radius: 50%;
		overflow: hidden;
		padding: 15rpx;
		display: flex;
	}
	.icon-fabu1 {
		color: #FFFFFF;
		font-size: 50rpx;
		padding: 15rpx;
	}
</style>
