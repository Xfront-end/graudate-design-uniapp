<template>
	<view class="container">
		<view>
			<text class="iconfont icon-erweima big-font"></text>
			<text class="normal">我的健康码</text>
		</view>
		<view>
			<text class="iconfont icon-viphuiyuanhuangguan big-font"></text>
			<text class="normal">我的收藏</text>
		</view>
		<view>
			<text class="iconfont icon-fabu big-font"></text>
			<text class="normal">我的工单</text>
		</view>
	</view>
</template>

<script>
	export default {
		
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
