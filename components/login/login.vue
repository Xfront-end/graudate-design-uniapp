<template>
	<bottom-modal :isShowModal="isShowModal" @bottomModalclosed="onbottomModalclosed">
		<template>
			<button type="plain" open-type="getUserInfo" @getuserinfo="onGetUserInfo">{{tips}}</button>
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
			onGetUserInfo(event) {
				console.log(event)
				const userInfo = event.detail.userInfo
				if(userInfo) {
					this.onbottomModalclosed()
					this.$emit('successLogin', userInfo)
				}else {
					this.$emit('failLogin')
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
