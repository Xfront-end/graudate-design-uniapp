<template>
	<view class="container">
		<view class="sub-container">
			<image 
				class="rotate" 
				src="../../static/images/loadMore/loadMore.png" 
				v-show="isLoading"
				mode="widthFix"></image>{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: String,
			isLoading: {
				type: Boolean,
				default() {
					return false
				}
			}
		}
	}
</script>

<style scoped>
.container {
	height: 120rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #666666;
}
.sub-container image {
	width: 50rpx;
	height: 50rpx;
}
.rotate{
	-webkit-animation:rotateImg 1s linear infinite;
	vertical-align: middle;
}

@keyframes rotateImg {
  0% {transform : rotate(0deg);}
  100% {transform : rotate(360deg);}
}

@-webkit-keyframes rotateImg {
    0%{-webkit-transform : rotate(0deg);}
  100%{-webkit-transform : rotate(360deg);}
}
</style>
