<template>
	<view class="container">
		<view class="contcat">
			<text class="iconfont icon-lianxifangshi">填写联系方式</text>
			<input type="text" placeholder="微信/QQ/手机号" v-model="contact"/>
		</view>
		<view class="exchang-methods">
			<text>选择交易方式</text>
			<view>
				<radio-group name="ways" @change="chooseWay">
					<label>
						<radio :value="0" :checked="true" color="#ff5777"/><text>面交</text>
						<text style="width: 40rpx;display: inline-block;"></text>
						<radio :value="1" color="#ff5777"/><text>邮寄</text>
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contact: '',
				exchangeType: 0
			}
		},
		methods: {
			chooseWay(e) {
				this.exchangeType = e.detail.value
			}
		}
	}
</script>

<style scoped>
	.container {
		color: #515151;
		padding: 15rpx;
		width: 90%;
		margin: 15rpx auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.container view {
		padding: 15rpx;
	}
	input {
		height: 70rpx;
	}
	.exchang-methods text{
		margin-bottom: 15rpx;
	}
	radio {
		margin-right: 15rpx;
	}
</style>
