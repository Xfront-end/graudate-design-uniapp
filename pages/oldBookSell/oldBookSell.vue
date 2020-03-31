<template>
	<view>
		<search-bar placeholder="搜搜吧,也许有您想要的.."/>
		<view style="height: 90rpx;"></view>
		<block v-for="item in oldBookInfo" :key="item._id">
			<book-info-card :book-info="item" @nav2bookDetail="onNav2bookDetail"/>
		</block>
		<view class="code-release">
			<b-code-release @release="release" />
		</view>
		<load-more :text="textText" :is-loading="false" />
	</view>
</template>

<script>
	import searchBar from '../../components/searchBar/search-bar.vue'
	import bCodeRelease from './oldBookSellCpn/b-code-relese.vue'
	import bookInfoCard from './oldBookSellCpn/book-info-card.vue'
	import loadMore from '../../components/loadMore/load-more.vue'
	const db = wx.cloud.database()
	const oldBookSellInfo = db.collection('oldBookSellInfo')
	export default {
		components: {
			bCodeRelease,
			bookInfoCard,
			searchBar,
			loadMore
		},
		data() {
			return {
				oldBookInfo: [],
				textText: '下拉加载更多'
			}
		},
		methods: {
			release() {
				uni.scanCode({
					scanType: ['barCode'],
					success: res => {
						console.log(res)
						uni.navigateTo({
							url: `../oldBookSellEdit/oldBookSellEdit?isbn=${res.result}`
						})
					}
				})
			},
			onNav2bookDetail(upload) {
				uni.navigateTo({
					url: `../oldBookDetail/oldBookDetail?bookInfo=${JSON.stringify(upload)}`
				})
			}
		},
		onLoad() {
			oldBookSellInfo.get().then(res=> {
				this.oldBookInfo = res.data
			})
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}
	.code-release {
		position: fixed;
		bottom: 60rpx;
		z-index: 999;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
