<template>
	<view>
		<block v-for="item in thingsList" :key="item._id">
			<things-card :thingsDetail="item" @cardClicked="nav2detail" />
			<splite-line></splite-line>
		</block>
		<load-more :isLoading="isLoading" :text="loadText" v-if="isLoadMoreShow" />
	</view>
</template>
<script>
	import thingsCard from '../../components/newThingsCard/newThingsCard.vue'
	import thingsControl from '../../components/thingsControl/things-control.vue'
	import spliteLine from '../../components/spliteLine/splite-line.vue'
	import loadMore from '../../components/loadMore/load-more.vue'
	export default {
		components: {
			thingsCard,
			thingsControl,
			spliteLine,
			loadMore
		},
		data() {
			return {
				thingsList: [],
				limit: 5,
				skip: 0,
				isLoading: false,
				loadText: '下拉加载更多',
				isLoadMoreShow: false,
				openid: ''
			}
		},
		methods: {
			nav2detail(upLoad) {
				uni.navigateTo({
					url: `../../pages/newThingsDetail/newThingsDetail?newThingsDoc=${upLoad}`
				})
			},
			getFavThings() {
				wx.cloud.callFunction({
					name: 'controlzan',
					data: {
						$url: 'getUserLikeNewThingsId',
						openid: this.openid,
						limit: this.limit,
						skip: this.skip
					}
				}).then(res => {
					if(res.result.list.length === 0) {
						this.isLoading = false
						this.loadText = "没有更多数据了(┬＿┬)"
					}
					res.result.list.forEach(item => {
						this.thingsList.push(...item.userLike)
					})
				})
			}
		},
		onReachBottom() {
			this.isLoadMoreShow = true
			this.isLoading = true
			this.loadText = '玩命加载中···'
			this.skip += this.limit
			console.log(this.limit)
			console.log(this.skip)
			this.getFavThings()
		},
		onLoad(options) {
			this.openid = options.openid
			this.getFavThings()
		}
	}
</script>

<style>

</style>
