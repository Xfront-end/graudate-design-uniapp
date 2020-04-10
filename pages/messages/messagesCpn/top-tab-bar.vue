<template>
	<view class="container">
		<view class="text-container">
			<block v-for="(item, index) in tabBarInfo" :key="index">
				<text :class="currentIndex==index?'active':''" @click="selecte(index)">
					{{item}}
				</text>
			</block>
		</view>
		<view class="icon-container">
			<text class="iconfont icon-quanxuan"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBarInfo: ['通知', '评论'],
				currentIndex: 0
			}
		},
		methods: {
			selecte(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		justify-content: space-between;
		padding: 0rpx 20rpx;
		color: #515151;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1px solid #EEEEEE;
	}
	.container .text-container {
		font-size: 32rpx;
	}
	.text-container text {
		display: inline-block;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0rpx 40rpx;
		box-sizing: border-box;
	}
	.active {
		font-size: 38rpx;
		font-weight: 700;
		border-bottom: 1px solid #FF5777;
	}
</style>
