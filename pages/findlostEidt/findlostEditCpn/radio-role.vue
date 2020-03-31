<template>
	<view class="container">
		<view class="text">类型:</view>
		<radio-group name="sex" @change="chooseRole">
			<label class="radio-gruop">
				<view><radio :value="0" checked color="#EEEEEE"/><text>失物</text></view>
				<view><radio :value="1" color="#EEEEEE"/><text>拾物</text></view>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		methods: {
			chooseRole(event) {
				const role = event.detail.value
				this.$emit('roleChanged', role)
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		width: 90%;
		margin: 0 auto;
		color: #666666;
		padding: 15rpx 0rpx;
	}
	.radio-gruop {
		display: flex;
	}
	.radio-gruop view {
		margin-left: 50rpx;
	}
	.container .text {
		padding: 0 10rpx;
	}

</style>
