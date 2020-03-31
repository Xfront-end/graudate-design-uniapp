<template>
	<view class="comment-list">
		<view class="list-title">
			<view>
				评论 {{commentArr.length}}
			</view>
			<view @click="chooseSortWay">
				<text>{{order}}</text>
				<text class="iconfont icon-down"></text>
			</view>
		</view>
		<view class="comment">
			<block v-for="(item, index) in commentArr" :key="item._id">
				<comment-card
					ref="commentCard"
					@reply="onReply"
					@updateCommentList="onUpdateCommentList"
					:new-thingopenid="newThingopenid"
					:comment-detail="item" 
					:is-show-floor-num="isShowFloorNum" 
					:floor-num="index+2"/>
			</block>
		</view>
		<bottom-modal
			:closeIcon="false"
			:height = "360"
			:isShowModal="isShowModal">
			<view class="operator-container">
				<view class="item" @click.stop="hotSortWay">
					<text>热门排序</text>
				</view>
				<view class="item" @click.stop="defaultSort">
					正序排序
				</view>
				<view class="item" @click.stop="reverseSort">
					倒序排序
				</view>
				<view class="item" @click.stop="onBottomModealslosed">
					取消
				</view>
			</view>
		</bottom-modal>
	</view>
</template>

<script>
	import bottomModal from '../bottomModal/bottom-modal.vue'
	import commentCard from '../commentCard/commentCard.vue'
	const db = wx.cloud.database()
	const comment = db.collection('newThingsComment')
	export default {
		components: {
			commentCard,
			bottomModal
		},
		props: {
			newThingid: String,
			newThingopenid: String
		},
		data() {
			return {
				sonNewThingid: this.newThingid,
				commentArr: [],
				isShowModal: false,
				tempArr: [],
				isDefault: true,
				isReverse: false,
				order: '正序',
				isShowFloorNum: true,
				commentArrCopy: []
			}
		},
		created() {
			this.getComment()
		},
		methods: {
			onUpdateCommentList(upload) {
				const index = this.commentArr.findIndex(item => item._id === upload)
				this.commentArrCopy.splice(index, 1)
				this.commentArr = this.commentArrCopy.concat([])
			},
			getComment() {
				console.log(this.sonNewThingid)
				wx.cloud.callFunction({
					name: 'newThings',
					data: {
						newThingsId: this.sonNewThingid,
						$url: 'getNewThingsComment'
					}
				}).then(res=> {
					console.log(res)
					this.commentArr = res.result.data
					this.commentArrCopy = this.commentArr.concat([])
				})
			},
			chooseSortWay() {
				this.isShowModal = true
			},
			hotSortWay() {
				const _commentArrCopy = this.commentArrCopy.concat([])
				this.commentArr = _commentArrCopy.sort((a, b) => b.favNum - a.favNum)
				this.order = '热门'
				this.isShowFloorNum = false
				this.isShowModal = false
			},
			defaultSort() {
				this.commentArr = this.commentArrCopy.concat([])
				this.order = '正序'
				this.hiddenFloorBottom()
			},
			reverseSort() {
				const _commentArrCopy = this.commentArrCopy.concat([])
				this.commentArr = _commentArrCopy.reverse()
				this.order = '逆序'
				this.hiddenFloorBottom()
			},
			hiddenFloorBottom() {
				this.isShowModal = false
				this.isShowFloorNum = true
			},
			onBottomModealslosed() {
				this.isShowModal = false
			},
			onReply(upLoad) {
				const commentCardIndex = this.commentArr.findIndex(item => item._id === upLoad)
 				this.$emit('reply', {upLoad, commentCardIndex})
			},
			//通知评论组件,更新数据,重新渲染回复数据
			notify(commentCardIndex) {
				this.$refs.commentCard[commentCardIndex].getReply()
			}
		}
	}
</script>

<style scoped>
	.comment-list {
		width: 95%;
		margin: 0 auto;
	}
	.list-title {
		height: 70rpx;
		line-height: 70rpx;
		width: 100%;
		border-bottom: 1rpx #EEEEEE solid;
		color: #515151;
		display: flex;
		justify-content: space-between;
	}
	.comment {
		width: 100%;
	}
	.operator-container {
		text-align: center;
		color: #666666;
	}
	.item {
		box-sizing: border-box;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
	}
</style>
