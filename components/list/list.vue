<template>
	<view class="container" @click="listClick">
		<view class="left">
			<text class="iconfont left-icon" :class="iconClass"></text>
		</view>
		<view class="center">
			{{listContent}}
		</view>
		<text class="right iconfont icon-youjiantou1" v-show="arrow"></text>
	</view>
</template>

<script>
	export default {
		props: {
			iconClass: {
				type: String
			},
			listContent: {
				type: String,
				default() {
					return '列表'
				}
			},
			needArrow: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				arrow: this.needArrow
			}
		},
		methods: {
			listClick() {
				this.$emit('onListClick', this.listContent)
			}
		}
	}
</script>

<style scoped>
	.container {
		color: #525252;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 1px #EEEEEE solid;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}
	.left {
		width: 40rpx;
		margin-top: 5rpx;
		box-sizing: border-box;
		margin-right: 30rpx;
	}
	.left-icon {
		width: 38rpx;
		height: 38rpx;
	}
	.center {
		font-size: 32rpx;
		flex: 6;
	}
	.right {
		text-align: right;
		margin-top: 5rpx;
		flex: 1;
	}
</style>
