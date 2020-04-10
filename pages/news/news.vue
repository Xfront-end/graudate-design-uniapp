<template>
	<view>
		<wave/>
		<view class="news-bar">
			<view class="tab-control">
				<block v-for="(item, index) in newsBar" :key="index">
					<view 
						class="tab-item" 
						:class="currentIndex===index?'active':''" 
						@click="choose(index)">
						{{item}}
					</view>
				</block>
			</view>
			<scroll-view scroll-y="true">
				<view class="news-list">
					<block v-for="(item, index) in hotNews" :key="index">
						<view class="news" @click="naviagte2Detail(item.realHref)">
							<view class="news-title">
								{{item.newsTitle}}
							</view>
							<view class="news-time">
								{{item.newsTime}}
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import wave from '../../components/wave/wave.vue'
	const db = wx.cloud.database()
	const hotNewsList = db.collection('hotNewsList')
	export default {
		components: {
			wave
		},
		data() {
			return {
				newsBar: ['校园新闻', '公告栏'],
				currentIndex: 0,
				hotNews: [],
				newsListHeight: 0
			}
		},
		methods: {
			choose(index) {
				this.currentIndex = index
			},
			getList() {
				hotNewsList.get().then(res => this.hotNews = res.data)
			},
			naviagte2Detail(upLoad) {
				uni.navigateTo({
					url: `../newsDetail/newsDetail?href=${upLoad}`
				})
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.getList()
		}
	}
</script>

<style scoped>
	.news-bar {
		width: 90%;
		position: absolute;
		top: 120rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		z-index: 999;
		height: 85%;
		border-radius: 20rpx;
		color: #515151;
		-webkit-box-shadow:0px 3px 3px #c8c8c8 ;
		-moz-box-shadow:0px 3px 3px #c8c8c8 ;
		box-shadow:0px 3px 3px #c8c8c8 ;
		overflow: hidden;
	}
	scroll-view {
		height: calc(100% - 40px);
	}
	.tab-control {
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		height: 80rpx;
	}
	.tab-item {
		width: 200rpx;
		padding: 20rpx;
	}
	.active {
		border-bottom: 1px #FF5777 solid;
		font-size: 36rpx;
	}
	.news-list {
		font-size: 28rpx;
	}
	.news-title {
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.news {
		padding: 20rpx 15rpx 0rpx 15rpx;
		box-sizing: border-box;
		border-bottom: 1px #EEEEEE solid;
	}
	.news-time {
		text-align: right;
		padding-bottom: 5rpx;
	}
</style>
