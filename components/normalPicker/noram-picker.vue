<template>
	<view class="pick">
		入学年份
		<picker mode="selector" :range="range" @change="chooseYear" :value="index">
			<view class="sub-picker">
				<text class="text">您的选择:</text>
				<text class="chooseInfo">{{range[index]}}</text>
				<text class="iconfont icon-youjiantou1"></text>
			</view>
		</picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 2,
				range: [2016, 2017, 2018, 2019]
			}
		},
		methods: {
			chooseYear(e) {
				this.index = e.detail.value
				this.$emit('chooseYear', this.range[e.detail.value])
			}
		}
	}
</script>

<style scoped>
	.pick {
		margin: 0 auto;
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		color: #666666;
	}
	.sub-picker {
		display: flex;
		border-bottom: 1px #EEEEEE solid;
		border-top: 1px #EEEEEE solid;
	}
	.sub-picker text {
		font-size: 28rpx;
		margin-right: 30rpx;
	}
	.chooseInfo {
		flex: 4;
	}
</style>
