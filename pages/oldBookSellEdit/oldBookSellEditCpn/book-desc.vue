<template>
	<view class="container">
		<view class="oldDesc lr-flex">
			<text>新旧程度</text>
			<picker mode="selector" :range="arr" @change="chooseOldDesc" :value="index">
				<view>{{arr[index]}}<text class="iconfont icon-down"></text></view>
			</picker>
		</view>
		<view class="price lr-flex">
			<text>价格:</text>
			<input type="number" v-model="price" placeholder="准备卖多少钱?" />
			<text class="iconfont icon-rmb"></text>
		</view>
		<view class="desc-detail lr-flex">
			<text>描述:</text>
			<input type="text" v-model="desc" placeholder="书籍描述(50字以内)" maxlength="50" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: ['九成新', '八成新', '七成新', '六成新', '伊拉克成色', '全新'],
				index: 0,
				price:10,
				desc: ''
			}
		},
		methods: {
			chooseOldDesc(e) {
				this.index = e.detail.value
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 15rpx;
		background-color: #FFFFFF;
		width: 90%;
		margin: 0 auto;
		border-radius: 20rpx;
		color: #515151;
	}
	.lr-flex {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		line-height: 80rpx;
	}
	.lr-flex  input,
	.lr-flex 	picker {
		flex: 1;
		text-align: right;
		height: 80rpx;
		width: 300rpx;
	}
</style>
