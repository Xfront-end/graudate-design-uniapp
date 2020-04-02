<template>
	<view>
		<user-info-card :loginStatus="isIdentified"/>
		<personal-service @nav2ThatPage="onNav2ThatPage"/>
		<view class="list-area">
			<z-list listContent="身份认证信息" :needArrow="true" iconClass="icon-ziyuan" @onListClick="handlerListClick"></z-list>
			<z-list listContent="分享给好友" iconClass="icon-fenxiangcopy" @onListClick="handlerListClick"></z-list>
			<z-list listContent="意见反馈" iconClass="icon-tucao" :needArrow="true" @onListClick="handlerListClick"></z-list>
			<z-list listContent="关于合师服务平台" iconClass="icon-jiaoshi" :needArrow="true" @onListClick="handlerListClick"></z-list>
			<z-list listContent="版本: Version 0.0.1" iconClass="icon-biaoti" @onListClick="handlerListClick"></z-list>
			<z-list listContent="清除缓存数据" iconClass="icon-shanchu" @onListClick="handlerListClick"></z-list>
		</view>
	</view>
</template>

<script>
	//引入全局组件
	import zList from '../../components/list/list.vue'
	//引入页面子组件
	import userInfoCard from './profileChinldCpn/userInfoCard.vue'
	import personalService from './profileChinldCpn/personalService.vue'
	const db = wx.cloud.database()
	const user = db.collection('user')
	const {log} = console
	export default {
		components:{
			zList,
			userInfoCard,
			personalService
		},
		data() {
			return {
				isIdentified: false
			}
		},
		methods: {
			handlerListClick(upLoad) {
				switch(upLoad) {
					case '身份认证信息':
						uni.navigateTo({
							url: '../identify/identify'
						})
						break
				}
			},
			async onNav2ThatPage(upload) {
				const openid = await wx.cloud.callFunction({
					name: 'login'
				}).then(res => res.result.openid)
				const url = `${upload}?openid=${openid}`
				console.log(url)
				uni.navigateTo({
					url
				})
			}
		},
		onShow() {
			this.isIdentified = this.$store.getters.isLogin 
		}
	}
</script>

<style scoped>
	.list-area {
		margin-top: 100rpx;
		width: 86%;
		margin: 0 auto;
	}
</style>
