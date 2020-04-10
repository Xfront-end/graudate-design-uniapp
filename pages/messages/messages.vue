<template>
	<view>
		<top-tab-bar />
		<view class="tips">
			<img-tips
				tipsText="暂无通知哦"/>
		</view>
	</view>
</template>

<script>
	import imgTips from '../../components/imgTips/img-tips.vue'
	import topTabBar from './messagesCpn/top-tab-bar.vue'
	export default {
		components: {
			topTabBar,
			imgTips
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.tips {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
