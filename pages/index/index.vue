<template>
	<view>
		<z-swiper :imgArr="swiperImages"/>
		<announce-bar :hotNews="hotNewsList"/>
		<splite-line/>
		<function-box @nav2thatPage="handleNav2thatPage"/>
	</view>
</template>

<script>
	// 引入全局组件
	import spliteLine from '../../components/spliteLine/splite-line.vue'
	//引入子组件
	import zSwiper from './indexChildCpn/z-swiper.vue'
	import announceBar from './indexChildCpn/annoucne-bar.vue'
	import functionBox from './indexChildCpn/z-function.vue'
	//初始化云数据库
	const db = wx.cloud.database()
	import {mapMutations} from 'vuex'
	export default {
		components: {
			zSwiper,
			announceBar,
			spliteLine,
			functionBox
		},
		data() {
			return {
				swiperImages: null,
				hotNewsList: null
			}
		},
		methods: {
			...mapMutations(['login']),
			handleNav2thatPage(url) {
				console.log(url)
				wx.navigateTo({
					url
				})
			}
		},
		onLoad() {
			db.collection('swiperImages').get().then(res=> {
				this.swiperImages = res.data
			})
			db.collection('hotNewsList').get().then(res => {
				this.hotNewsList = res.data
				console.log(res.data)
			})
			
			wx.cloud.callFunction({
				name: 'login'
			}).then(res => {
				db.collection('user').where({
					_openid: res.result.openid
				}).get()
				.then(res => {
					if(res.data.length !== 0) {
						this.login(res.data[0])
					}
				}) 
			})
		},
	}
</script>

<style>

</style>
