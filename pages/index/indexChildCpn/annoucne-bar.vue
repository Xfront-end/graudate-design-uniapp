<template>
	<view>
		<view class="notice-bar">
			<view class="notice-icon" @click="navgiate2news">
				<text class="iconfont icon-huo"></text>
				<text>校内热点</text>
			</view>
			<view class="notice-icon">
				<text class="iconfont icon-gengduo"></text>
			</view>
		</view>
		<swiper 
			:vertical="true" 
			:autoplay="true" 
			:interval="3000"
			:duration="1000">
			<block v-for="item in hotNews" :key="item.realHref">
				<swiper-item>
					<view class="swiper-item" @click="navgiate2news(item.realHref)">
						<view class="news-title">
							标题: {{item.newsTitle}}
						</view>
						<view class="news-other">
							<text>{{item.newsAuth?'newsAuth':'来自学校官网'}}</text>
							<text>{{item.newsTime}}</text>
						</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			hotNews: {
				type: Array,
				default() {
					return []
				}
			}
		},
		methods: {
			navgiate2news(upload) {
				this.$emit('navgiate2news', upload)
			},
		}
	}
</script>

<style scoped>
	.notice-bar {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		font-size: 32rpx;
		color: #666666;
		height: 60rpx;
		padding: 8rpx;
	}
	.notice-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	swiper {
		height: 155rpx;
	}
	.swiper-item {
		box-sizing: border-box;
		padding: 10rpx;
		color: #666666;
		font-size: 32rpx;
	}
	.news-content {
		text-indent: 64rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 30rpx;
	}
	.news-other {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 30rpx;
	}
	.icon-huo {
		font-size: 40rpx;
		color: #D81E06;
		margin-right: 5rpx;
	}
	
</style>
