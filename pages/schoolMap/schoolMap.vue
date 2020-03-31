<template>
	<view>
		<map id="myMap" 
			show-location 
			subkey="F3DBZ-7CYY2-5MWU7-CDDGD-EBXCS-7IFKP"
			style="width: 100%;height: 92vh;"
			:longitude="longitude"
			:latitude="latitude"
			:scale="scale"
			@tap="getLL"
			:markers="placeMarkers"
			/>
			<view class="back" @click="back">
				<text class="iconfont icon-zuojiantou"></text><text>返回</text>
			</view>
			<view class="control-bar">
				<scroll-view scroll-x="true" >
					<view class="place">
						<block v-for="(item, index) in place" :key="index">
							<view @click="choosed(index)" :class="index === currentIndex? 'active':''">
								{{item}}
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
			<view class="search">
				<text class="iconfont icon-fangdajing"></text>
			</view>
	</view>
</template>

<script>
	const SCHOOL_LONGITUDE = 117.22864866256714
	const SCHOOL_LATITUDE = 31.75052177731564
	const SCHOOL_SCALE = 17
	const PLACE = ['全部','宿舍','餐厅','校门','操场','图书馆','场馆','公交站']

	const db = wx.cloud.database()
	const location = db.collection('location')
	export default {
		data() {
			return {
				longitude: SCHOOL_LONGITUDE,
				latitude: SCHOOL_LATITUDE,
				scale: SCHOOL_SCALE,
				mapCtx: null,
				place: PLACE,
				currentIndex: 0,
				placeMarkers: []
			}
		},
		methods: {
			getLL(e) {
				console.log(e)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			choosed(index) {
				this.currentIndex = index
				if(index === 0) {
					this.getAllLocation()
				}else {
					this.getTypeLocation(index)
				}
			},
			getAllLocation() {
				location.get().then(res => {
					this.placeMarkers = res.data
				})
			},
			getTypeLocation(type) {
				location.where({
					type
				}).get()
				.then(res => {
					this.placeMarkers = res.data
				})
			}
		},
		onLoad() {
			this.mapCtx = wx.createMapContext('myMap')
			this.getAllLocation()
		}
	}
</script>

<style scoped>
	.back {
		position: fixed;
		top: 75rpx;
		left: 40rpx;
		color: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.3) ;
		width: 88rpx;
		border-radius: 28rpx;
		font-size: 26rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 10rpx;
	}
	.search {
		position: fixed;
		right: 0;
		bottom: 0;
		height: 8vh;
		width: 15%;
		font-size: 70rpx;
		text-align: center;
	}
	.control-bar {
		background-color: #ff5777;
		color: #FFFFFF;
		width: 100%;
		text-align: center;
	}
	scroll-view {
		width: 85%;
	}
	.place {
		width: 1300rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 8vh;
	}
	.place view {
		flex: 1;
		padding: 15rpx;
	}
	.icon-fangdajing {
		font-size: 40rpx;
		color: #FFFFFF;
	}
	.icon-zuojiantou {
		font-size: 24rpx;
	}
	.active {
		font-size: 38rpx;
		border-bottom: 6rpx #FFFFFF solid;
	}
</style>
