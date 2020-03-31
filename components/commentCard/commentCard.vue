<template>
	<view class="container" @longpress="pressDelete" @click="replyComment">
		<view class="avatar">
			<image :src="commentDetail.avatarUrl" mode="aspectFill"></image>
		</view>
		<view class="comment-info">
			<view class="comment-user-info">
				<view class="name-time">
					<view class="nick-name">
						{{commentDetail.nickName}}
						<text 
							v-if="commentDetail._openid == newThingopenid"
							class="iconfont icon-viphuiyuanhuangguan">
							楼主
						</text>
					</view>
					<view class="comment-time">
						<view class="floorNum" v-show="isShowFloorNum">{{floorNum + '楼'}}</view>
						<view class="time">{{commentDetail.createdTime|format}}</view>
					</view>
				</view>
				<view class="like">
					<like :docid="commentDetail._id" currentDB="comment"></like>
				</view>
			</view>
			<view class="comment-content">
				{{commentDetail.commentContent}}
			</view>
			<view class="comment-iamges" v-if="commentDetail.commentAblum.length">
				<block v-for="(item, index) in commentDetail.commentAblum" :key="item">
					<image :src="item" mode="aspectFill" @click.stop="previewImg(index)"></image>
				</block>
			</view>
			<view class="replytext" v-if="replyArr.length">
				<text @click.stop="seeReply">查看{{replyArr.length}}条回复</text>
				<text class="iconfont icon-quanbupinglunchakangengduo"></text>
			</view>
			<view class="replyContainer">
				<reply 
					@changeCount="changeCount"
					v-if="isSeeReply" 
					:comment-id="commentDetail._id"
					:reply-detail="replyArr"/>
			</view>
		</view>
	</view>
</template>

<script>
	import like from '../like/like.vue'
	import reply from '../reply/reply.vue'
	import {formatTime} from '../../uitil/formatTime.js'
	import {onPreviewImg} from '../../common/js/common.js'
	export default{
		components: {
			like,
			reply
		},
		props: {
			commentDetail: {
				type: Object,
				default() {
					return {}
				},
			},
			isShowFloorNum: {
				type: Boolean,
				default() {
					return false
				}
			},
			floorNum: Number,
			newThingopenid: String
		},
		data() {
			return {
				isSeeReply: false,
				isHasReply: true,
				replyArr: [],
			}
		},
		filters: {
			format(time) {
				return formatTime(new Date(time))
			}
		},
		methods: {
			pressDelete() {
				const userOpenid = this.$store.state.userInfo._openid
				if(userOpenid === this.commentDetail._openid) {
					uni.showModal({
						content: '删除该条评论',
						success: res => {
							if(res.confirm) {
								wx.cloud.callFunction({
									name: 'newThings',
									data: {
										$url: 'deleteComment',
										docid: this.commentDetail._id
									}
								}).then(res=> {
									this.$emit('updateCommentList', this.commentDetail._id)
									uni.showToast({
										icon: 'none',
										title: '删除成功'
									})
								})
							}
						}
					})
				}
			},
			previewImg(current) {
				onPreviewImg(current, this.commentDetail.commentAblum)
			},
			seeReply() {
				this.isSeeReply = !this.isSeeReply
			},
			replyComment() {
				this.$emit('reply', this.commentDetail._id)
			},
			getReply() {
				wx.cloud.callFunction({
					name: 'newThings',
					data: {
						$url: 'getCommentReply',
						newThingsCommentId: this.commentDetail._id
					}
				}).then(res => {
					this.replyArr = res.result.data
				})
			},
			changeCount(index) {
				this.replyArr.splice(index, 1)
			}
		},
		created() {
			this.getReply()
		},
		watch: {
			replyArr(newValue) {
				if(newValue.length === 0) {
					this.isSeeReply = false
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		color: #515151;
		width: 100%;
		margin-bottom: 20rpx;
	}
	.avatar image {
		margin-top: 10rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}
	.comment-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}
	.comment-user-info {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.name-time {
		flex: 1;
	}
	.nick-name {
		font-size: 28rpx;
		font-weight: 550;
	}
	.comment-time {
		color: #8D8D8D;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
	}
	.comment-time .floorNum {
		margin-right: 20rpx;
	}
	.replytext {
		padding: 10rpx 0;
		height: 30rpx;
		line-height: 30rpx;
		margin-top: 10rpx;
	}
	.replytext text{
		font-size: 28rpx;
		color: #8E8E91;
	}
	.comment-iamges {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.comment-iamges image {
		box-sizing: border-box;
		padding: 3rpx;
		width: 25%;
		height: 158rpx;
	}
	.nick-name text{
		font-weight: normal;
		font-size: 20rpx;
		margin-left: 15rpx;
	}
	.replyContainer {
		margin-top: 12rpx;
	}
</style>
