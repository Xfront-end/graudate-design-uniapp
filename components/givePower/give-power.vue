<template>
	<bottom-modal :isShowModal="isShowModal" @bottomModalclosed="onbottomModalclosed">
		<template>
			<button 
				type="plain" 
				open-type="getUserInfo" 
				@getuserinfo="ongetuserinfo">{{tips}}</button>
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
					return '授权校服务平台'
				}
			}
		},
		components: {
			bottomModal
		},
		methods: {
			ongetuserinfo(res) {
				if(res.detail.userInfo) {
					this.$emit('userGreeGivePower', res.detail.userInfo)
				}else {
					this.$emit('userRejectGivePower')
				}
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
