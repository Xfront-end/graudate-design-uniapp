<template>
	<view class="tips">
		<image
			:src="imgSrc" 
			style="width: 180rpx;"
			mode="widthFix"/>
			<view class="tips-text">
				{{tipsText}}
			</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgSrc: {
				type: String,
				default: '../../static/images/messages/Snipaste_2020-04-06_20-09-26.png'
			},
			tipsText: String
		}
	}
</script>

<style scoped>
	.tips-text {
		color: rgb(145,145,145);
	}
</style>
