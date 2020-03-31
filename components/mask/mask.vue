<template>
	<view class="container" v-show="isShowMask">
		<view class="mask" @click="closeMask"></view>
		<view class="slot-style">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			isShow: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				isShowMask: this.isShow
			}
		},
		methods: {
			closeMask() {
				this.$emit('closeMask')
			}
		},
		watch: {
			isShow(value) {
				this.isShowMask = value
			}
		}
	}
</script>

<style scoped>
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.slot-style {
		position: fixed;
		width: 80vw;
		height: 80vh;
		background-color: #FFFFFF;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
