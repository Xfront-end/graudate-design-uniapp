<template>
	<view>
		messgaes
		<button type="default" @click="navigate2Chat">
			去聊天室
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navigate2Chat() {
				console.log(123)
				uni.navigateTo({
					url:'../im/im'
				})
			}
		}
	}
</script>

<style>

</style>
