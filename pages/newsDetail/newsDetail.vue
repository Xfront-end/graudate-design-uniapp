<template>
	<view class="newContent">
		<rich-text :nodes="htmlNode"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htmlNode: ''
			}
		},
		methods: {
			
		},
		onLoad(options) {
			console.log(options.href)
			uni.request({
				url: 'http://192.168.0.105:3000/news/detail',
				method: 'get',
				data: {
					scrapyHref: options.href
				}
			}).then(res => {
				let rawHtml = res[1].data.htmlContent
				rawHtml = rawHtml.replace(/width\s*:\s*[0-9]+px/g, 'width:100%')
				rawHtml = rawHtml.replace(/\<img/gi, '<img class="rich-img" ')
				rawHtml = rawHtml.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="width:100%;height:auto;display: block;margin:auto"')
				rawHtml = rawHtml.replace(/\<p/gi, '<P class="rich-p" ')
				this.htmlNode = rawHtml
			})
		}
	}
</script>

<style>
.rich-img{
    width: 100%;
    margin: 20rpx 0;
}
.rich-p{
    color: #333333;
    font-size: 32rpx;
    line-height: 45rpx;
}
.newContent {
	padding: 20rpx;
	color: #515151;
}
</style>
