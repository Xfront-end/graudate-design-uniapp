<template>
	<view class="container">
		<block v-for="(item,index) in tempFileArr" :key="item">
			<view class="img-container">
				<image :src="item" mode="aspectFill" class="pics" @click="listenPreviewImg(index)"></image>
				<image src="../../static/images/bottomModal/close.png" class="del" @click="deleteImg(index)"></image>
			</view>
		</block>
		<view class="img-container increase-container" v-show="isIncreaseShow">
			<image src="../../static/images/newThingEdit/increase.png" mode="widthFix" class="increase" @click="chooseImg"></image>
		</view>
	</view>
</template>

<script>
	import {onPreviewImg} from '../../common/js/common.js'
	export default {
		props: {
			limit: {
				type: Number,
				default() {
					return 9
				}
			}
		},
		data() {
			return {
				tempFileArr: [],
				isIncreaseShow: true
			}
		},
		methods: {
			chooseImg() {
				uni.chooseImage({
					count: this.limit - this.tempFileArr.length,
					sizeType: ['orginal', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
							this.tempFileArr.push(...res.tempFilePaths)
							this.$emit('getTempFilePaths', this.tempFileArr)
							if(this.tempFileArr.length === this.limit) {
								this.isIncreaseShow = false
							}
					},
				})
			},
			deleteImg(index) {
				this.tempFileArr.splice(index, 1)
				this.$emit('getTempFilePaths', this.tempFileArr)
				if(this.tempFileArr.length === this.limit - 1) {
					this.isIncreaseShow = true
				}
			},
			listenPreviewImg(current) {
				onPreviewImg(current, this.tempFileArr)
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
	.img-container {
		position: relative;
		box-sizing: border-box;
		width: 33.33%;
		padding: 5rpx;
	}
	.del {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		width: 36rpx;
		height: 36rpx;
	}
	.increase {
		position: absolute;
		width: 80rpx;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.increase-container {
		height: 240rpx;
		border: 1px #EEEEEE solid;
	}
	.pics {
		height: 240rpx;
		width: 100%;
	}
	
</style>
