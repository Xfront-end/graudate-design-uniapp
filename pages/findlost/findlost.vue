<template>
	<view>
		<search-bar placeholder="搜一下,也许就找到了呢..."></search-bar>
		<view style="height:100rpx"></view>
		<view>
			<block>
				<view class="lost-list">
					<block v-for="item in findLostInfo" :key="item._id">
						<view class="margin-top">
							<lost-info-card
								:lostInfo="item"
								@showDetail="onshowDetail" />
						</view>
					</block>
				</view>
			</block>
		</view>
		<mask :is-show="isShowMask" @closeMask="onCloseMask">
			<scroll-view scroll-y="true">
				<user-info-bar :user-info="currentClickedCard"></user-info-bar>
				<view class="detail">
					<view class="time">
						<text class="iconfont icon-shizhong right-padding"/>
						<text>{{currentClickedCard.type?'拾取':'丢失'}}时间: {{currentClickedCard.time}}</text>
					</view>
					<view class="place">
						<text class="iconfont icon-didian-copy right-padding"/>
						<text>{{currentClickedCard.type?'拾取':'丢失'}}地点: {{currentClickedCard.place}}</text>
					</view>
				</view>
				<view class="desc" v-if="currentClickedCard.desc">
					<view class="tips">
						<text class="iconfont icon-beizhu right-padding"></text>详情简介:
					</view>
					<view class="content">
						{{currentClickedCard.desc}}
					</view>
				</view>
				<view class="image-area" v-if="currentClickedCard.iamge.length != 0">
					<view class="image-title">
						物品图片
					</view>
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<block v-for="item in currentClickedCard.images" :key="item">
							<swiper-item>
								<image :src="item" mode="aspectFill"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</scroll-view>
		</mask>
		<release @onPublish="onRelease"></release>
		<load-more :is-loading="isLoading" :text="loadText" v-if="isLoadMoreShow"/>
	</view>
</template>

<script>
	//引入全局组件
	import searchBar from '../../components/searchBar/search-bar.vue'
	import mask from '../../components/mask/mask.vue'
	import userInfoBar from '../../components/userInfoBar/user-info-bar.vue'
	import release from '../../components/release/release.vue'
	import loadMore from '../../components/loadMore/load-more.vue'
	//引入子组件
	import lostInfoCard from './findlostCpn/lost-info-card.vue'
	export default {
		components: {
			searchBar,
			lostInfoCard,
			mask,
			userInfoBar,
			release,
			loadMore
		},
		data() {
			return {
				isShowMask: false,
				findLostInfo: [],
				loadText: '上拉加载更多',
				isLoading: false,
				isLoadMoreShow: false,
				lock: false,
				currentClickedCard: {}
			}
		},
		methods: {
			onshowDetail(id) {
				this.isShowMask = true
				const index = this.findLostInfo.findIndex(item => item._id === id)
				this.currentClickedCard = this.findLostInfo[index]
			},
			onCloseMask() {
				this.isShowMask = false
			},
			onRelease() {
				if(this.$store.getters.isLogin) {
					uni.navigateTo({
						url: '../findlostEidt/findlostEidt'
					})
				}else {
					uni.showModal({
						title: '该操作需要实名认证',
						content: '是否前往实名认证?',
						confirmText: '去认证',
						success: res => {
							if(res.confirm) {
								uni.navigateTo({
									url: '../identify/identify'
								})
							}
						}
					})
				}
			},
			getFindLostList() {
				wx.cloud.callFunction({
					name: 'findlost',
					data: {
						$url: 'getFindLost',
						skip: this.findLostInfo.length
					}
				}).then(res => {
					this.findLostInfo.push(...res.result.data)
					if(res.result.data.length === 0) {
						this.loadText = '已经触底了哦~'
						this.lock = true
					}
				})
			}
		},
		onReachBottom() {
			if(!this.lock) {
				this.isLoadMoreShow = true
				this.loadText = '拼命加载中···'
				this.getFindLostList()
				console.log('加载数据')
			}
		},
		onShow() {
			this.lock = false
			this.findLostInfo = []
			this.getFindLostList()
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}
	.lost-list {
		margin: 0 auto;
		width: 90%;
	}
	scroll-view {
		height: 80vh;
		padding: 10rpx;
		box-sizing: border-box;
	}
	release {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
		z-index: 999;
	}
	.margin-top {
		margin-top: 24rpx;
	}
	.detail {
		font-size: 28rpx;
		color: #515151;
	}
	.detail view {
		padding: 4rpx 0;
	}
	.right-padding {
		padding-right: 10rpx;
	}
	.desc {
		padding: 5rpx 10rpx;
		border-bottom: 1px #EEEEEE solid;
		font-size: 28rpx;
		color: #515151;
	}
	swiper {
		height: 600rpx;
		margin-top: 20rpx;
	}
	.image-area .image-title {
		padding: 10rpx;
		text-align: center;
	}
</style>
