<template>
	<view>
		<search-bar/>
		<view style="height:100rpx"></view>
		<view>
			<block v-for="item in thingsList" :key="item._id">
				<things-card 
					:thingsDetail="item" 
					@cardClicked="nav2detail"
					@deleteNewThings="onDeleteNewThings">
					<things-control :docid="item._id" v-if="toggle"/>
				</things-card>
				<splite-line></splite-line>
			</block>
			<load-more :isLoading="isLoading" :text="loadText" v-if="isLoadMoreShow"/>
			<release @onPublish="handlerPub"/>
			<z-login 
				:isShowModal="isShowModal" 
				@bottomModalclosed="onbottomModalclosed"
				@toIdentify="ontoIdentify"/>
		</view>
	</view>
</template>

<script>
	//引入全局组件
	import searchBar from '../../components/searchBar/search-bar.vue'
	import release from '../../components/release/release.vue'
	import zLogin from '../../components/login/login.vue'
	import thingsCard from '../../components/newThingsCard/newThingsCard.vue'
	import loadMore from '../../components/loadMore/load-more.vue'
	import thingsControl from '../../components/thingsControl/things-control.vue'
	import spliteLine from '../../components/spliteLine/splite-line.vue'
	const db = wx.cloud.database()
	const thingsDb = db.collection('newThings')
	const user = db.collection('user')
	export default {
		components: {
			searchBar,
			release,
			zLogin,
			thingsCard,
			loadMore,
			thingsControl,
			spliteLine
		},
		data() {
			return {
				isShowModal: false,
				thingsList: [],
				start: 0,
				isLoading: false,
				loadText: '上拉加载更多',
				isLoadMoreShow: false,
				toggle: false, //强制刷新control组件
				lock: false
			}
		},
		async onShow() {
			this.toggle = true
			this.start = 0
			this.lock = false
			const res = await this.getRectentNewThings()
			this.thingsList = res.data
		},
		async onPullDownRefresh() {
			this.start = 0
			const res = await this.getRectentNewThings()
			this.thingsList = res.data
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if(!this.lock){
				this.isLoadMoreShow = true
				this.isLoading = true
				this.loadText = '玩命加载中···'
				this.start += 6
				db.collection('newThings')
				.orderBy('createdTime', 'desc')
				.skip(this.start)
				.limit(6)
				.get()
				.then(res => {
					if(res.data.length === 0) {
						this.loadText = '已经到底了'
						this.isLoading = false
						this.lock = true
					}else {
						this.thingsList.push(...res.data)
					}
				})
			}
			
		},
		methods: {
			nav2detail(upLoad) {
				this.toggle = false
				uni.navigateTo({
					url: `../../pages/newThingsDetail/newThingsDetail?newThingsDoc=${upLoad}`
				})
			},
			ontoIdentify() {
				this.isShowModal = false
				uni.navigateTo({
					url: '../identify/identify'
				})
			},
			handlerPub() {
				if(this.$store.getters.isLogin) {
					const userInfo = this.$store.getters.userInfo
					uni.navigateTo({
						url: `/pages/newThingEidt/newThingEdit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
					})
				}else {
					uni.showToast({
						icon: 'none',
						title: '实名后才可以分享哦'
					})
					this.isShowModal = true
				}
			},
			onbottomModalclosed() {
				this.isShowModal = false
			},
			getRectentNewThings() {
				return new Promise((resolve, reject) => {
					thingsDb.orderBy('createdTime', 'desc')
					.skip(0)
					.limit(6)
					.get()
					.then(res => {
						resolve(res)
					}).catch(err => {
						reject(err)
					}) 
				})
			},
			onDeleteNewThings(upLoad) {
				console.log("hello")
			}
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}
	release {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
	}
</style>
