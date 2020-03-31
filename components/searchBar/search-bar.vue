<template>
	<view class="container">
		<view class="search-container">
			<view class="input-bar">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" :placeholder="placeholder"/>
			</view>
			<text class="search-button" @click="search">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default() {
					return '有事没事,先搜一下...'
				}
			}
		},
		methods: {
			search() {
				console.log('search')
			}
		}
	}
</script>

<style scoped>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #F1F1F1;
	}
	.search-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		width: 95%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.search-container .search-button {
		background-color: #ff5757;
		color: #FFFFFF;
		padding: 8rpx 30rpx;
		margin-right: 30rpx;
		border-radius: 40rpx;
	}
	.input-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #666666;
	}
	.icon-sousuo {
		font-weight: bolder;
		margin: 0 20rpx;
	}
</style>
