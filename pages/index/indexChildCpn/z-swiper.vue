<template>
	<view>
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="4000" 
			:duration="1000"
			indicator-active-color="#FEFEFE">
			<block v-for="(item, index) in imgArr" :key="index">
				<swiper-item>
					<image :src="item.imgSrc" mode="widthFix"></image>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			imgArr: Array
		},
	}
</script>

<style scoped>
	swiper {
		height: 400rpx;
	}
	swiper image{
		width: 100%;
		height: 400rpx;
	}
</style>
