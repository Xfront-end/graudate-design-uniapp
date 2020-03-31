<template>
	<view class="container">
		<view class="text">性别:</view>
		<radio-group name="sex" @change="chooseSex">
			<label class="radio-gruop">
				<view><radio :value="1" checked color="#EEEEEE"/><text class="iconfont icon-nan"></text></view>
				<view><radio :value="0" color="#EEEEEE"/><text class="iconfont icon-nv"></text></view>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		methods: {
			chooseSex(event) {
				const sex = event.detail.value
				this.$emit('sexChanged', sex)
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
	.icon-nan {
		font-weight: bold;
		color: #2800FF;
	}
	.icon-nv {
		font-weight: bold;
		color: #FF5777;
	}

</style>
