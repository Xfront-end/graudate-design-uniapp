<template>
	<view class="container">
		<view class="header">
			<view class="user-info">
				<image :src="userInfo.avatarUrl" 
					mode="widthFix"></image>
				<view class="text-info">
					<view class="name">
						{{userInfo.nickName}}
					</view>
					<view class="other-info">
						<view class="department">
							学院: {{userInfo.department}}
						</view>
						<view class="major-grade">
							<view class="major">
								专业: {{userInfo.major}}
							</view>
							<view class="grade">
								大{{userInfo.year|getGrade}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="back" @click="back">
				<text class="iconfont icon-zuojiantou"></text><text>返回</text>
			</view>
			<view class="filter-bg">
				<image :src="userInfo.avatarUrl"></image>
			</view>
		</view>
		<view class="">
			<block v-for="item in newThingsList" :key="newThings._id">
				<things-card 
					:thingsDetail="item"
					@cardClicked="nav2detail"
					@deleteNewThings="onDeleteNewThings"
				/>
				<splite-line></splite-line>
			</block>
		</view>
	</view>
</template>

<script>
	import thingsCard from '../../components/newThingsCard/newThingsCard.vue'
	import spliteLine from '../../components/spliteLine/splite-line.vue'
	//获取数据库
	const db = wx.cloud.database()
	const newThings = db.collection('newThings')
	const user = db.collection('user')
	export default {
		components: {
			thingsCard,
			spliteLine
		},
		data() {
			return {
				userInfo: {},
				start: 0,
				newThingsList: []
			}
		},
		methods: {
			nav2detail(upLoad) {
				this.toggle = false
				uni.navigateTo({
					url: `../../pages/newThingsDetail/newThingsDetail?newThingsDoc=${upLoad}`
				})
			},
			onDeleteNewThings(upLoad) {
				console.log("hello")
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getNewThings(openid) {
				newThings.where({
					_openid: openid
				}).skip(this.start)
				.limit(10)
				.get()
				.then(res => {
					this.newThingsList.push(...res.data)
				})
			},
			getUserInfo(openid) {
				user.where({
					_openid: openid
				}).get()
				.then(res => {
					this.userInfo = res.data[0]
				})
			}
		},
		onLoad(options) {
			this.openid = options.openid
			this.getUserInfo(this.openid)
			this.getNewThings(this.openid)
		},
		filters: {
			//将入学年份转换为年级
			getGrade(year) {
				const currentYear = new Date().getFullYear()
				const gradeChinese = ['','一', '二', '三', '四']
				return gradeChinese[currentYear - year]
			}
		},
		onReachBottom() {
			this.start += 5
			this.getNewThings(this.openid)
		}
	}
</script>

<style scoped>
	.header {
		position: relative;
		height: 350rpx;
		width: 100%;
		background-color: rgba(7, 17, 27, 0.6);
		overflow: hidden;
		color: #F1F1F1;
	}
	.user-info {
		margin: 160rpx 40rpx 0rpx 40rpx;
		display: flex;
		align-items: center;
	}
	.user-info image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
	}
	.text-info {
		flex: 1;
		margin-left: 40rpx;
	}
	.major-grade {
		display: flex;
		justify-content: space-between;
	}
	.filter-bg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.filter-bg image {
		height: 100%;
		width: 100%;
	}
	.back {
		position: fixed;
		top: 75rpx;
		left: 40rpx;
		color: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.3) ;
		width: 88rpx;
		border-radius: 22rpx;
		font-size: 26rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 10rpx;
	}
	.icon-zuojiantou {
		font-size: 24rpx;
	}
</style>
