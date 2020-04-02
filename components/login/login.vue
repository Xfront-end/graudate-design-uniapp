<template>
	<bottom-modal :isShowModal="isShowModal" @bottomModalclosed="onbottomModalclosed">
		<template>
			<button type="plain" @click="toIdentify">{{tips}}</button>
		</template>
	</bottom-modal>
</template>


<script>
	import bottomModal from '../bottomModal/bottom-modal.vue'
	export default {
		props: {
			isShowModal: {
				type: Boolean
			},
			tips: {
				type: String,
				default() {
					return '实名认证'
				}
			}
		},
		components: {
			bottomModal
		},
		methods: {
			toIdentify() {
				this.$emit('toIdentify')
			},
			onbottomModalclosed() {
				this.$emit('bottomModalclosed')
			}
		}
	}
</script>

<style scoped>
	button {
		margin: 120rpx auto;
		width: 78%;
		background-color: #ff5777;
		color: #FFFFFF;
	}
</style>
