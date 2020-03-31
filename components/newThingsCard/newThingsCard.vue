<template>
	<view class="container" @click="cardClicked">
		<view class="userInfo">
			<image :src="thingsDetail.avatarUrl" mode="widthFix"></image>
			<view class="userName">
				<view class="nickName">
					{{thingsDetail.nickName}}
				</view>
				<view class="createdTime">
					{{thingsDetail.createdTime|format}}
				</view>
			</view>
		</view>
		<view class="content" :class="isMoreLine?'':'ellipsis_mul'">
			{{thingsDetail.content}}
		</view>
		<view class="img">
			<block v-for="(item, index) in thingsDetail.fileIDArr" :key="index">
				<image 
					:lazy-load="true"
					:src="item" 
					mode="aspectFill" 
					@click.stop="onPreviewImg(index)"></image>
			</block>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import {formatTime} from '../../uitil/formatTime.js'
	export default{
		props: {
			thingsDetail:	Object,
			isMoreLine: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		methods: {
			onPreviewImg(currentIndex) {
				uni.previewImage({
					current: currentIndex,
					urls: this.thingsDetail.fileIDArr
				})
			},
			cardClicked() {
				this.$emit('cardClicked', this.thingsDetail._id)
			}
		},
		filters: {
			format(time) {
				return formatTime(new Date(time))
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
		margin: 0 auto;
		color: #333;
	}
	.userInfo {
		display: flex;
		flex-direction: row;
		margin-bottom: 10rpx;
		align-items: center;
	}
	.userInfo image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin: 10rpx 10rpx 0 10rpx;
	}
	.userName .nickName {
		margin-top: 15rpx;
		color: #515151;
		font-weight: 550;
	}
	.userName .createdTime {
		margin-top: 15rpx;
		color: #666666;
		font-size: 32rpx;
	}
	.content {
		width: 98%;
		font-size: 36rpx;
		margin-bottom: 10rpx;
		margin: 0 auto;
	}
	.img {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding-bottom: 10rpx;
	}
	.img image {
		width: calc(33.33333% - 8rpx);
		height: 240rpx;
		margin: 4rpx;
	}
	.ellipsis_mul{    
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display:-webkit-box;
	    -webkit-box-orient:vertical;
	    -webkit-line-clamp:2;
	}
</style>
