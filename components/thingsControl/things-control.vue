<template>
	<view class="things-control">
		<view>
			<like :docid="docid"></like>
		</view>
		<view>
			<text class="iconfont icon-fenxiangcopy"></text>
		</view>
	</view>
</template>

<script>
	import like from '../like/like.vue'
	export default{
		components: {
			like
		},
		props: {
			docid: String
		}
	}
</script>

<style scoped>
	.things-control {
		display: flex;
		flex-direction: row;
		text-align: center;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		border-top: 1px #EEEEEE solid;
		border-bottom: 1px #EEEEEE solid;
	}
	.things-control view {
		flex: 1;
	}
	.icon-fenxiangcopy {
		font-size: 40rpx;
	}

</style>
