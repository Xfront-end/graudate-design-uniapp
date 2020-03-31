<template>
	<view class="container">
		<view class="cover">
			<image :src="bookDetail.cover_url" mode="widthFix"></image>
		</view>
		<view class="detail">
			<view class="title">
				{{bookDetail.title}}
			</view>
			<view class="publisher">
				<text>出版社:</text> {{publisher}}
			</view>
			<view class="time">
				<text>时间:</text> {{time}}
			</view>
			<view class="author">
				<text>作者:</text> {{anthor}}
			</view>
			<view class="price">
				<text>定价:</text> {{price}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bookDetail: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				publisher: '',
				anthor: '',
				price: '',
				time: ''
			}
		},
		watch: {
			bookDetail(newValue) {
				const detailArr = newValue.abstract.split('/')
				this.anthor = detailArr[0]
				this.publisher = detailArr[detailArr.length - 3]
				this.time = detailArr[detailArr.length - 2]
				this.price = detailArr[detailArr.length - 1]
			}
		}
		
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}
	.container {
		display: flex;
		flex-direction: row;
		padding: 18rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		color: #515151;
		width: 90%;
		margin: 20rpx auto;
	}
	.cover {
		flex: 1;
		margin-right: 15rpx;
	}
	.cover image {
		width: 240rpx;
		height: 332.4rpx;
	}
	.detail {
		flex: 2.5;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.detail .title {
		font-size: 36rpx;
		font-weight: 650;
	}
</style>
