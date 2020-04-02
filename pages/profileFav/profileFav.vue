<template>
	<view>
		<block v-for="item in thingsList" :key="item._id">
			<things-card :thingsDetail="item" @cardClicked="nav2detail">
				<things-control :docid="item._id" v-if="toggle"/>
			</things-card>
			<splite-line></splite-line>
		</block>
	</view>
</template>
<script>
	import newThingsCard from '../../components/newThingsCard/newThingsCard.vue'
	export default {
		components: {
			newThingsCard
		},
		data() {
			return {
				thingsList: []
			}
		},
		methods: {
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
			}
		},
		async onLoad() {
			const res = await this.getRectentNewThings()
			this.thingsList = res.data
		}
	}
</script>

<style>

</style>
