<template>
	<view class="container">
		<view class="filter-bg">
			<image :src="bookInfo.coverImg" mode="widthFix" class="cover"></image>
			<view class="bg-img">
				<image :src="bookInfo.coverImg"></image>
			</view>
			<view class="back" @click="back">
				<text class="iconfont icon-zuojiantou"></text><text>返回</text>
			</view>
		</view>
		<view class="intro">
			<view class="title">
				{{bookInfo.title}}
			</view>
			<view class="small">
				出版时间: {{bookInfo.time}}
			</view>
			<view class="small">
				作者: {{bookInfo.anthor}}
			</view>
			<view class="small">
				定价: {{bookInfo.orginPrice}}
			</view>
		</view>
		<splite-line />
		<view class="intro">
			<view class="title">
				{{sellersInfo.length}}位同学正在卖这本书
			</view>
			<block v-for="item in sellersInfo" :key="item._id">
				<seller 
					:seller-info="item" 
					@contact="onContact"
					@browserUserInfo="onBrowserUserInfo"
					@toIdentify="onToIdentify"/>
			</block>
		</view>
		<splite-line />
		<view class="intro">
			<view class="title">
				简介和目录
			</view>
			<view class="small">
				{{bookInfo.bookIntro}}
			</view>
		</view>
	</view>
</template>

<script>
	import spliteLine from '../../components/spliteLine/splite-line.vue'
	import seller from './oldBookDetailCpn/seller.vue'
	const db = wx.cloud.database()
	const oldBookSellInfo = db.collection('oldBookSellInfo')
	export default {
		components: {
			spliteLine,
			seller
		},
		data() {
			return {
				bookInfo: {},
				sellersInfo: []
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onContact(sellerInfo) {
				const sellerInfoStringify = JSON.stringify(sellerInfo)
				uni.navigateTo({
					url: `../im/im?sellerInfo=${sellerInfoStringify}`
				})
			},
			onToIdentify() {
				uni.navigateTo({
					url: '../identify/identify'
				})
			},
			onBrowserUserInfo(upLoad) {
				uni.navigateTo({
					url: '../profileDetail/profileDetail?openid='+upLoad
				})
			}
		},
		onLoad(options) {
			this.bookInfo = JSON.parse(options.bookInfo)
			oldBookSellInfo.where({
				isbn: this.bookInfo.isbn
			}).orderBy('createdTime', 'desc').get().then(res=> {
				this.sellersInfo = res.data
			})
		}
	}
</script>

<style scoped>
	.container {
		color: #515151;
	}
	.filter-bg {
		position: relative;
		height: 440rpx;
		width: 100%;
		background-color: rgba(7, 17, 27, 0.6);
		overflow: hidden;
	}
	.cover {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 8rpx;
		width: 200rpx;
		bottom: 20rpx;
		box-shadow: 0 0 12rpx #FFFFFF;
	}
	.bg-img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.bg-img image {
		height: 100%;
		width: 100%;
	}
	.back {
		position: fixed;
		top: 75rpx;
		left: 40rpx;
		color: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.3) ;
		width: 88rpx;
		border-radius: 22rpx;
		font-size: 26rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 10rpx;
	}
	.icon-zuojiantou {
		font-size: 24rpx;
	}
	.intro {
		padding: 35rpx;
	}
	.title {
		font-size: 32rpx;
		font-weight: 550;
		margin-bottom: 20rpx;
	}
	.small {
		font-size: 26rpx;
	}
</style>
