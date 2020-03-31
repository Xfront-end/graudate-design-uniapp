<template>
	<view>
		<things-card :thingsDetail="newThingsDetail" :is-more-line="true">
			<things-control :docid="newThingsDetail._id" />
		</things-card>
		<splite-line></splite-line>
		<comment-list
			@reply="onReply"
			ref="commentList"
			:new-thingopenid="newThingsDetail._openid"
			:new-thingid="newThingsDetail._id" 
			v-if="newThingsDetail._id"/>
		<view style="height:100rpx;"></view>
		<view class="footer-control" v-show="!isShowModal" @click="clickFakeInput">
			<view class="fake-input">
				期待您的精彩评论...
			</view>
		</view>
		<bottom-modal 
			:bottom="keyBroadHeight"
			:isShowModal="isShowModal" 
			:height="hasCommentImagesHeight"
			@bottomModalclosed="onBottomModalclosed">
			<view class="comment-area">
				<view class="inputArea">
					<textarea
						:adjust-position="false"
						@focus="changeHeight"
						:show-confirm-bar="false"
						@blur="resetKeyboradHeight"
						v-model="commentContent"
						placeholder="说点什么吧..." 
						maxlength="300"/>
				</view>
				<view class="ablum-container">
					<block v-for="(item, index) in commentAblum" :key="item">
						<image 
							:src="item" 
							mode="aspectFill" 
							@click="operateImages(index)"
							class="comment-images"></image>
					</block>
				</view>
				<view class="footer footer-border">
					<view @click="addImages">
						<text class="iconfont icon-ziyuan1"></text><text style="margin-left: 8rpx;">添加图片</text>
					</view>
					<text>还可以输入:{{300-commentContent.length}}字</text>
					<text @click.stop="release" class="release">发表</text>
				</view>
			</view>
		</bottom-modal>
		<bottom-modal :isShowModal="isOperateImagesShow" :closeIcon="false">
			<view class="operator-container">
				<view class="item" @click.stop="deleteCommentImages">
					<text>删除该图片</text>
				</view>
				<view class="item" @click.stop="previewCommentImages">
					预览图片
				</view>
				<view class="item" @click.stop="cancel">
					取消
				</view>
			</view>
		</bottom-modal>
		<bottom-modal 
			:bottom="keyBroadHeight"
			:height="170"
			@bottomModalclosed="onReplyShow"
			:is-show-modal="isShowReply">
			<view class="reply-container">
				<view class="replayInputArea">
					<textarea 
						:adjust-position="false"
						@focus="changeHeight"
						:show-confirm-bar="false"
						@blur="resetKeyboradHeight"
						placeholder="评论"
						maxlength="140" 
						v-model="replyContent"/>
				</view>
				<view class="control">
					<text @click.stop="reply" class="release">发表</text>
				</view>
			</view>
		</bottom-modal>
	</view>
</template>

<script>
	//引入全局公用组件
	import thingsCard from '../../components/newThingsCard/newThingsCard.vue'
	import thingsControl from '../../components/thingsControl/things-control.vue'
	import spliteLine from '../../components/spliteLine/splite-line.vue'
	import bottomModal from '../../components/bottomModal/bottom-modal.vue'
	import commentList from '../../components/commentList/commentList.vue'
	//引入页面私有组件
	//测试代码需要删除
	const newThingsComment = wx.cloud.database().collection('newThingsComment')
	import {write2cloudStroge, getUserInfo, getUserInfoFromCloud, isIdentified} 
	from '../../common/js/common.js'
	const IMAGE_MAX = 9
	const db = wx.cloud.database()
	const newThings = db.collection('newThings')
	const reply = db.collection('reply')
	export default {
		components: {
			thingsCard,
			thingsControl,
			spliteLine,
			bottomModal,
			commentList
		},
		data() {
			return {
				isLogin: false, 
				newThingsDetail: {},
				isShowModal: false,
				isOperateImagesShow: false,
				commentAblum: [],
				currentImages: 0,
				commentContent: '',
				isShowLoginModal: false,
				lock: true, //防止多次点击发表的锁
				isShowReply: false,
				replyContent: '',
				newThingsCommentId: '',
				commentCardIndex: 0,
				keyBroadHeight: 0
			}
		},
		methods: {
			onBottomModalclosed() {
				this.isShowModal = false
			},
			onReplyShow() {
				this.isShowReply = false
			},
			addImages() {
				uni.chooseImage({
					count: IMAGE_MAX - this.commentAblum.length,
					sizeType: ['compressed '],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.commentAblum.push(...res.tempFilePaths)
						console.log(this.commentAblum)
					}
				})
			},
			changeHeight(event) {
				this.keyBroadHeight = event.detail.height
			},
			resetKeyboradHeight() {
				this.keyBroadHeight = 0
			},
			operateImages(currentImages) {
				this.currentImages = currentImages
				this.isOperateImagesShow = true
			},
			deleteCommentImages() {
				this.commentAblum.splice(this.currentImages, 1)
				this.cancel()
			},
			previewCommentImages() {
				uni.previewImage({
					current: this.currentImages,
					urls: this.commentAblum
				})
				this.cancel()
			},
			cancel() {
				this.isOperateImagesShow = false
			},
			async release() {
				if(this.lock){
					this.lock = false
					let userInfo = await getUserInfo()
					const commentContent = this.commentContent.trim()
					if(commentContent === '') {
						uni.showToast({
							icon: 'none',
							title: '评论内容不能为空'
						})
						return
					}
					uni.showLoading({
						title: '发表中',
						mask: true
					})
					let commentAblum = []
					if(this.commentAblum.length > 0) {
						commentAblum = await write2cloudStroge('newThings/', this.commentAblum)
					}
					const newThingsId = this.newThingsDetail._id
					const commentInfo = {
						nickName: userInfo.nickName,
						avatarUrl: userInfo.avatarUrl,
						commentAblum,
						commentContent,
						newThingsId,
						createdTime: db.serverDate(),
						favNum: 0,
						reply: 0
					}
					newThingsComment.add({
						data: {
							...commentInfo
						}
					}).then(res=> {
						uni.hideLoading()
						this.isShowModal = false
						this.commentAblum = []
						this.commentContent = ''
						this.lock = true
						this.$refs.commentList.getComment()
						uni.showToast({
							icon: 'none',
							title: '评论成功'
						})
					})
				}
			},
			clickFakeInput() {
				if(this.isLogin){
					this.isShowModal = !this.isShowModal
					return 
				}
				uni.showModal({
					cancelText: '取消',
					confirmText: '去认证',
					title: '发表评论需要实名认证',
					content: '是否前往实名认证',
					success(res) {
						if(res.confirm) {
							uni.navigateTo({
								url: '../identify/identify'
							})
						}
					}
				})
			},
			onReply(upLoad) {
				this.newThingsCommentId = upLoad.upLoad
				this.commentCardIndex = upLoad.commentCardIndex
				this.isShowReply = true
			},
			async reply() {
				console.log(this.commentCardIndex)
				if(this.isLogin) {
					let userInfo = await getUserInfo()
					const replyContent = this.replyContent.trim()
					if(replyContent === '') {
						uni.showToast({
							icon: 'none',
							title: '回复内容不能为空'
						})
						return
					}
					uni.showLoading({
						title: '发表中',
						mask: true
					})
					const newThingsCommentId = this.newThingsCommentId
					const replyInfo = {
						nickName: userInfo.nickName,
						avatarUrl: userInfo.avatarUrl,
						replyContent,
						newThingsCommentId,
						createdTime: db.serverDate()
					}
					reply.add({
						data: {
							...replyInfo
						}
					}).then(res=> {
						this.$refs.commentList.notify(this.commentCardIndex)
						uni.hideLoading()
						this.replyContent = ''
						this.isShowReply = false
						this.lock = true
						console.log(newThingsCommentId)
						wx.cloud.callFunction({
							name: 'newThings',
							data: {
								$url: 'updateReplyNum',
								docid: newThingsCommentId,
								num: 1
							}
						}).then(res=>console.log(res))
						uni.showToast({
							icon: 'none',
							title: '回复成功'
						})
					})
				}else {//询问未实名用户需跳转到实名认证页面
					uni.showModal({
						cancelText: '取消',
						confirmText: '去认证',
						title: '回复评论需要实名认证',
						content: '是否前往实名认证',
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
									url: '../identify/identify'
								})
							}
						}
					})
				}
			}
		},
		async onLoad(options) {
			const newThingsDoc = options.newThingsDoc
			newThings.doc(newThingsDoc).get().then(res => {
				this.newThingsDetail = res.data
			})
		},
		onShow() {
			this.isLogin = this.$store.getters.isLogin
			this.lock = true
			//从认证页面跳转回来之前应该向vuexcommit登录信息
		},
		computed: {
			hasCommentImagesHeight() {
				return this.commentAblum.length === 0 ? 450 : 540
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/footer.css");
	textarea {
			color: #333333;
			width: 100%;
			height: 270rpx;
	}
	.footer {
		position: absolute;
	}
	.ablum-container {
		height: 90rpx;
		width: 100%;
	}
	.comment-images {
		width: 11.11%;
		height: 83.3rpx;
		padding: 2rpx;
		box-sizing: border-box;
	}
	.operator-container {
		text-align: center;
		color: #666666;
	}
	.item {
		box-sizing: border-box;
		border-bottom: 2rpx #EEEEEE solid;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
	}
	.comment-area {
		margin-top: 80rpx;
	}
	.footer-control {
		height: 90rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-shadow: 0px -1rpx 1rpx #EEEEEE;
		background-color: #FFFFFF;
	}
	.fake-input {
		text-align: center;
		color: #B0B1B3;
		width: 80%;
		height: 75rpx;
		line-height: 75rpx;
		background-color: #F3F4F6;
		border-radius: 30rpx;
	}
	.replayInputArea textarea {
		height: 160rpx;
		width: 100%;
	}
	.reply-container {
		height: 170rpx;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
	}
	.replayInputArea {
		padding: 10rpx;
		flex: 1;
	}
	.control {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin: 0 20rpx;
		margin-bottom: 10rpx;
	}
</style>
