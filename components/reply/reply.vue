<template>
	<view class="reply">
		<block v-for="(item, index) in sonReplyDetail" :key="item._id">
			<view class="reply-item" @longpress.stop="deleteReply(index)" >
				<text class="name">{{item.nickName}}:</text>
				<text>{{item.replyContent}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			replyDetail: {
				type: Array,
				default() {
					return []
				}
			},
			commentId: {
				type: String
			}
		},
		data() {
			return {
				sonReplyDetail: this.replyDetail,
				openid: ''
			}
		},
		methods: {
			deleteReply(index) {
				if(this.openid && this.openid === this.sonReplyDetail[index]._openid) {
					const content = '内容:' + this.sonReplyDetail[index].replyContent
					uni.showModal({
						title: '删除回复',
						content,
						success: res => {
							if(res.confirm) {
								const docid = this.sonReplyDetail[index]._id
								wx.cloud.callFunction({
									name: 'newThings',
									data: {
										$url: 'delteReply',
										docid
									}
								}).then(res => {
									this.$emit('changeCount', index)
									wx.cloud.callFunction({
										name: 'newThings',
										data: {
											$url: 'updateReplyNum',
											docid: this.commentId,
											num: -1
										}
									})
								})
							}
						}
					})
				}
			}
		},
		created() {
			this.openid = this.$store.state.userInfo._openid
		},
		watch: {
			replyDetail(newValue) {
				this.sonReplyDetail = newValue
			}
		}
	}
</script>

<style scoped>
	.reply {
		font-size: 28rpx;
		background-color: #F6F6F6;
		display: flex;
		flex-direction: column;
		background-color: #F6F6F6;
		padding: 10rpx;
		border-radius: 10rpx;
	}
	.name {
		color: #515151;
		font-weight: 550;
		padding: 10rpx;
	}
</style>
