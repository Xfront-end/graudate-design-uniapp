<script>
	export default {
		onLaunch: function() {
			if(!wx.cloud) {
				console.error('请使用2.2.3或以上基础库 以使用云能力')
			} else {
				wx.cloud.init({
					env: "hfnu-service-ebwqm",
					traceUser: true
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/iconfont.css");
</style>
