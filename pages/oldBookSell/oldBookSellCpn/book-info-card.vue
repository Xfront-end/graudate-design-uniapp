<template>
	<view class="container" @click="nav2bookDetail">
		<view class="cover">
			<image :src="bookInfo.coverImg" mode="widthFix"></image>
		</view>
		<view class="detail">
			<view class="book-info">
				<view class="title">
					{{bookInfo.title}}
				</view>
				<view class="intro">
					{{bookInfo.anthor}} {{bookInfo.time}} {{bookInfo.publisher}}
				</view>
			</view>
			<view class="avatar-price-discount">
				<image :src="bookInfo.avatarUrl" mode="aspectFill"></image>
				<view class="price-count">
					<text>{{bookInfo.price}}</text>元
					<text class="discount">{{discount}}折</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bookInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			nav2bookDetail() {
				this.$emit('nav2bookDetail', this.bookInfo)
			}
		},
		computed: {
			discount() {
				return ((parseInt(this.bookInfo.price) / this.bookInfo.orginPrice)*10).toFixed(1)
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		padding: 15rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #515151;
		width: 90%;
		margin: 15rpx auto;
	}
	.cover image {
		width: 180rpx;
		height: 250rpx;
		border-radius: 8rpx;
	}
	.detail {
		padding-left: 20rpx;
		width: 490rpx;
	}
	.book-info .title {
		font-size: 35rpx;
		font-weight: 600;
		margin-bottom: 24rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; 
	}
	.book-info .intro {
		padding-bottom: 24rpx;
		margin-bottom: 15rpx;
		border-bottom: 1px solid #EEEEEE;
	  overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; 
		-webkit-box-orient: vertical;
	}
	.avatar-price-discount {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.avatar-price-discount image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
	.avatar-price-discount .price-count {
		margin-left: 20rpx;
	}
	.discount {
		padding: 5rpx 10rpx;
		border: 1px #ff5777 solid;
		color: #FF5777;
		background-color: #FFFFFF;
		margin-left: 20rpx;
		border-radius: 10rpx;
		font-size: 22rpx;
	}
</style>
