<template>
	<view class="school-service">
		<view class="title">
			<view class="title-left">
				<text class="iconfont icon-xuanzefuwu"></text>
				校园服务
			</view>
			<image src="/static/images/zfunction/richyourlife.png" mode="widthFix"></image>
		</view>
		<view class="container">
			<block v-for="item in services" :key="item.url">
				<view class="sub-container" @click="handleClickNav(item.url)">
					<text class="iconfont" :class="item.iconName"></text>
					<text>{{item.serviceName}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				services: [
					{
						serviceName: '校园地图',
						iconName: 'icon-didian-copy',
						url: '../schoolMap/schoolMap'
					},
					{
						serviceName: '闲置书籍',
						iconName: 'icon-shu',
						url: '../oldBookSell/oldBookSell'
					},
					{
						serviceName: '失物招领',
						iconName: 'icon-shiwuzhaoling',
						url: '../findlost/findlost'
					},
					{
						serviceName: '拼车',
						iconName: 'icon-pinche',
						url: '/pages/umap'
					},
					{
						serviceName: '故障报修',
						iconName: 'icon-guzhangbaoxiu',
						url: '/pages/umap'
					},
					{
						serviceName: '兼职信息',
						iconName: 'icon-jianzhi',
						url: ''
					},
					{
						serviceName: '查看校历',
						iconName: 'icon-shijian',
						url: '../schoolCalendar/schoolCalendar'
					},
					{
						serviceName: '成绩查询',
						iconName: 'icon-chenji',
						url: '/pages/umap'
					},
					{
						serviceName: '信息采集',
						iconName: 'icon-beizhu',
						url: '../infoCollection/infoCollection'
					}
				]
			}
		},
		methods: {
			handleClickNav(url) {
				this.$emit('nav2thatPage', url)
			}
		}
	}
</script>

<style scoped>
	.title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0 20rpx 15rpx;
	}
	.title .title-left {
		flex:2;
	}
	.title image {
		flex: 4;
	}
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		margin: 0 auto;
		width: 98%;
		border: 1px #F1F1F1 solid;
		border-radius: 12rpx;
	}
	.sub-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		width: 33.3%;
		padding: 30rpx;
	}
	.sub-container text:first-child {
		padding-bottom: 10rpx;
		font-size: 50rpx;
	}
	.sub-container text:last-child {
		color: #666666;
		font-size: 32rpx;
	}
	.sub-container:nth-child(-n+6) {
		border-bottom: 1px #F1F1F1 solid;
	}
	.sub-container:nth-child(-n+2) {
		border-right: 1px #F1F1F1 solid;
	}
	.icon-xuanzefuwu {margin-right: 8rpx;}
	.sub-container:nth-child(4) {border-right: 1px #F1F1F1 solid;}
	.sub-container:nth-child(5) {border-right: 1px #F1F1F1 solid;}
	.sub-container:nth-child(7) {border-right: 1px #F1F1F1 solid;}
	.sub-container:nth-child(8) {border-right: 1px #F1F1F1 solid;}
</style>
