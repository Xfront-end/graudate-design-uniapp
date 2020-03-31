<template>
	<view class="container" @click="showDetail" @longpress="deleteInfo" v-if="noDeleted">
		<view class="title" :style="{'height': lostInfo.images.length?'':'80rpx'}">
			<image
				v-if="lostInfo.images.length"
				:src="lostInfo.images[0]"
				mode="aspectFill"/>
			<!-- 没有image title高度坍塌,需要计算image高度 -->
			<!-- type:0表示丢失,1表示招领 -->
			<view class="mask">
				<text>{{lostInfo.type?'招领':'丢失'}}: {{lostInfo.lostThings}}</text>
			</view>
		</view>
		<view class="detail">
			<view class="time">
				<text class="iconfont icon-shizhong right-padding"/>
				<text>{{lostInfo.type?'拾取':'丢失'}}时间: {{lostInfo.time}}</text>
			</view>
			<view class="place">
				<text class="iconfont icon-didian-copy right-padding"/>
				<text>{{lostInfo.type?'拾取':'丢失'}}地点: {{lostInfo.place}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			lostInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				noDeleted: true
			}
		},
		methods: {
			showDetail() {
				this.$emit('showDetail', this.lostInfo._id)
			},
			deleteInfo() {
				if(this.$store.state.userInfo._openid === this.lostInfo._openid) {
					uni.showModal({
						title: '提示',
						content: '确定删除该条信息?',
						confirmText: '删除',
						success: res => {
							if(res.confirm) {
								console.log(this.lostInfo._id)
								wx.cloud.callFunction({
									name: 'findlost',
									data: {
										$url: 'delete',
										docid: this.lostInfo._id
									}
								}).then(res=> {
									if(res.result.stats.removed>0) {
										this.noDeleted = false
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										})
									}
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		overflow: hidden;
		box-shadow: 0px 3px 3px #c8c8c8;
		color: #515151;
	}
	.title {
		position: relative;
	}
	.title image {
		height: 180rpx;
		width: 100%;
	}
	.mask {
		position: absolute;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 99;
		bottom: 10rpx;
		color: #F5F5F5;
		padding: 0 10rpx;
	}
	.detail {
		padding: 10rpx;
	}
	.detail view {
		padding: 10rpx 0;
	}
	.right-padding {
		padding-right: 10rpx;
	}
</style>
