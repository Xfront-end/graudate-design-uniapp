<template>
	<view class="user-info-bar">
		<view class="avatar">
			<image :src="userInfo.avatarUrl" mode="aspectFill"></image>
		</view>
		<view class="desc-info">
			<view class="nickname">
				{{userInfo.userName}}
			</view>
			<view class="release-time">
				{{userInfo.createdTime|dateFormat}}
			</view>
		</view>
		<view class="slot-style">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import {formatTime} from '../../uitil/formatTime.js'
	export default {
		props: {
			userInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		filters: {
			dateFormat(date) {
				return formatTime(new Date(date))
			}
		}
	}
</script>

<style scoped>
	.user-info-bar {
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		color: #515151;
		align-items: center;
		border-bottom: 1px #EEEEEE solid;
	}
	image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.nickname {
		text-align: left;
		font-weight: bold;
		padding-bottom: 8rpx;
	}
	.release-time {
		font-size: 23rpx;
	}
	.avatar {
		flex: 0.7;
	}
	.desc-info {
		flex: 4;
	}
	
</style>
