<template>
	<view class="contain-mask" v-show="isShow" :style="{'bottom': bottom+'px'}">
		<view class="pannel" :style="{'height': height+'rpx'}"
			id="getheight">
			<image  
				src="../../static/images/bottomModal/close.png" 
				v-if="isShowcloseIcon"
				:style="{height:closeIcon?'40rpx':'0rpx'}"
				@click.stop="closeModal"></image>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isShowModal: {
				type: Boolean
			},
			height: {
				type: Number,
				default() {
					return 300
				}
			},
			bottom: {
				type: Number,
				default() {
					return 0
				}
			},
			closeIcon: {
				type: Boolean,
				default() {
					return true
				}
			}
		},
		data() {
			return {
				isShow: this.isShowModal,
				isShowcloseIcon: this.closeIcon,
				pannelHeight: 300
			}
		},
		methods: {
			closeModal() {
				this.$emit('bottomModalclosed')
			}
		},
		watch: {
			isShowModal(newValue) {
				this.isShow = newValue
			},
			closeIcon(newValue) {
				this.isShowcloseIcon = newValue
			}
		},
		mounted() {
			// var query = uni.createSelectorQuery()
			// query.select('#getheight').boundingClientRect()
			// query.exec(function (res) {
			// 	this.panelHeight = res[0].height
			// })
		}
	}
</script>

<style scoped>
	.contain-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
	}
	.pannel {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		height: 300rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	.pannel image {
		position: absolute;
		padding: 10rpx;
		top: 10rpx;
		right: 20rpx;
		width: 40rpx;
	}
</style>
