<template>
	<view>
		<book-detail-card :book-detail="bookDetail" ref="detailCard" />
		<book-desc ref="bookDesc"/>
		<seller-info ref="sellerInfo"/>
		<view class="submit-sellInfo" @click="bookRelease">发布</view>
	</view>
</template>

<script>
	import bookDetailCard from './oldBookSellEditCpn/book-detail-card.vue'
	import bookDesc from './oldBookSellEditCpn/book-desc.vue'
	import sellerInfo from './oldBookSellEditCpn/seller-info.vue'
	const db = wx.cloud.database()
	export default {
		components: {
			bookDetailCard,
			bookDesc,
			sellerInfo
		},
		data() {
			return {
				bookDetail: {},
				isbn: ''
			}
		},
		methods: {
			bookRelease() {
				const bookDesc = this.$refs.bookDesc
				const sellInfo = this.$refs.sellerInfo
				const detailCard = this.$refs.detailCard
				if(sellInfo.contact=='' || bookDesc.price=='') { 
					uni.showToast({
						icon: 'none',
						title: '价格和联系方式为必填项'
					})
					return
				}
				const bookInfo = {
					avatarUrl: this.$store.state.userInfo.avatarUrl,
					name: this.$store.state.userInfo.userName,
					isbn: this.isbn,
					coverImg: this.bookDetail.cover_url,
					bookIntro: this.bookDetail.book_intro,
					title: this.bookDetail.title,
					publisher: detailCard.publisher,
					anthor: detailCard.anthor,
					price: bookDesc.price,
					time: detailCard.time,
					oldDesc: bookDesc.arr[bookDesc.index],
					orginPrice: parseFloat(detailCard.price.match(/\d+\.\d+/g)),
					desc: bookDesc.desc,
					contact: sellInfo.contact,
					exchangeType: sellInfo.exchangeType,
					createdTime: db.serverDate()
				}
				uni.showLoading({
					mask: true,
					title: '发布中...'
				})
				db.collection('oldBookSellInfo').add({
					data: {
						...bookInfo
					}
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						mask: true,
						title: '发布成功'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					},500)
				})
			}
		},
		onLoad(options) {
			this.isbn = options.isbn
			uni.showLoading({
				mask: true,
				title: '查询书籍信息中...'
			})
			uni.request({
				url: `http://book.feelyou.top/isbn/${options.isbn}`
			}).then(res=> {
				uni.hideLoading()
				this.bookDetail = res[1].data
				console.log(res)
			})
		}
	}
</script>

<style>
 .submit-sellInfo {
		margin: 90rpx auto;
		width: 240rpx;
		height: 90prx;
		line-height: 90rpx;
		border-radius: 50rpx;
		background-color: #ff5777;
		color: #FFFFFF;
		text-align: center;
 }
</style>
