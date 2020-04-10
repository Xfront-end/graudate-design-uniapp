<template>
	<view>
		<text 
			class="iconfont icon-tubiaozhizuomoban" 
			@click.stop="toggleLike" 
			:class="isLike?'zan':''"></text>
		<text class="favNum">{{favNum}}</text>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	const newThings = db.collection('newThings')
	const zan = db.collection('zan')
	const comment = db.collection('newThingsComment')
	export default {
		props: {
			docid: {
				type: String
			},
			currentDB: {
				type: String,
				default() {
					return 'newThings'
				}
			}
		},
		data() {
			return {
				isLike: false,
				favNum: 0,
				openid: '',
				favNumInThisDB: this.currentDB
			}
		},
		methods: {
			toggleLike() {
				this.isLike = !this.isLike
				if (this.isLike) {
					this.favNum++
					zan.add({
						data: {
							docid: this.docid,
							createdTime: db.serverDate()
						}
					}).then(res => {
						this.updataFavNum(1)
					})
				} else {
					this.favNum--
					wx.cloud.callFunction({
						name: 'controlzan',
						data: {
							$url: 'deletelike',
							openid: this.openid,
							docid: this.docid
						}
					}).then(res => {
						this.updataFavNum(-1)
					})
				}
			},
			getUserOpenid() {
				return new Promise((resolve, reject) => {
					wx.cloud.callFunction({
						name: 'login'
					}).then(res => {
						this.openid = res.result.openid
						resolve()
					}).catch(err => {
						reject(err)
					})
				})
			},
			initIsLike(openid, docid) {
				return new Promise((resolve, reject) => {
					zan.where({
							_openid: openid,
							docid: docid
						}).get()
						.then(res => {
							this.isLike = res.data.length === 0 ? false : true
							resolve()
						})
				})
			},
			updataFavNum(num) {
				wx.cloud.callFunction({
					name: 'controlzan',
					data: {
						docid: this.docid,
						num,
						currentDB: this.favNumInThisDB,
						$url: 'updataFavNum'
					}
				})
			},
			initFavNum() {
				let currentDB = null
				if(this.favNumInThisDB === 'newThings') {
					currentDB = newThings
				}else if(this.favNumInThisDB === 'comment') {
					currentDB = comment
				}
				currentDB.doc(this.docid).get().then(res => {
					this.favNum = res.data.favNum
				}).catch(err => {
					console.log()
				})
			}
		},
		async created() {
			await this.getUserOpenid()
			await this.initIsLike(this.openid, this.docid)
			this.initFavNum()
		}
	}
</script>

<style  scoped>
	.favNum {
		font-size: 28rpx;
		bottom: 15rpx;
		position: relative;
		margin-left: 5rpx;
	}
	.zan {
		color: #DD001B;
	}
	.icon-tubiaozhizuomoban {
		font-size: 50rpx;
	}
</style>
