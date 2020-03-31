<template>
		<view class="pick">
			选择你的专业
			<picker mode="multiSelector" :range="majorArr" @change="chooseMajor" @columnchange="onColumnchange" :value="value">
				<view class="marjor-info">
					<text class="text">您的选择:</text>
					<text class="marjor">{{majorArr[1][major]}}</text>
					<text class="iconfont icon-youjiantou1"></text>
				</view>
			</picker>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				department: 0,
				value: [10, 0],
				major: 0,
				allMajor: [
					['国际经济与贸易','经济学','市场营销','人力资源管理','财务管理','酒店管理','经济与金融'],
					['教育学','应用心理学','学前教育','小学教育'],
					['美术学','动画','视觉传达设计','环境设计','产品设计','服装与服饰设计'],
					['物理学','电子信息工程','通信工程','电气工程及其自动化','光电信息科学与工程','微电子科学与工程','新能源材料与器件','机械设计制造及其自动化'],
					['汉语言文学','编辑出版学','网络与新媒体','汉语国际教育'],
					['英语','西班牙语','商务英语'],
					['音乐学','音乐表演'],
					['数学与应用数学','统计学','经济统计学','应用统计学','金融工程'],
					['化学', '制药工程', '化学工程与工艺', '材料科学与工程'],
					['生物科学','生物技术','食品质量与安全','生物制药'],
					['计算机科学与技术','软件工程','物联网工程','网络工程','数据科学与大数据技术'],
					['体育教育','运动训练','舞蹈表演','运动康复'],
					['思想政治教育'],
					['财务管理', '电子信息工程', '计算机科学与技术'],
				],
				majorArr: [
					['经济与管理学院','教师教育学院','艺术传媒学院','电子信息工程学院',
						'文学院','外国语学院','音乐学院','数学与统计学院',
						'化学与化学工程学院','生命科学学院','计算机学院','体育科学学院',
						'马克思主义学院','刘铭传学院'], 
					['计算机科学与技术','软件工程','物联网工程','网络工程','数据科学与大数据技术']
				]
			}
		},
		methods: {
			chooseMajor(e) {
				this.department = e.detail.value[0]
				this.major = e.detail.value[1]
				this.$emit('chooseMajor', this.majorArr[0][this.department], this.majorArr[1][this.major])
			},
			onColumnchange(e) {
				const column = e.detail.column
				if(column !== 0) {
					return 
				}
				const value = e.detail.value
				this.majorArr.splice(1, 1, this.allMajor[value])
			}
		}
	}
</script>

<style scoped>
	.pick {
		margin: 0 auto;
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		color: #666666;
	}
	.marjor-info {
		display: flex;
		border-bottom: 1px #EEEEEE solid;
		border-top: 1px #EEEEEE solid;
	}
	.marjor-info text {
		font-size: 28rpx;
		margin-right: 30rpx;
	}
	.marjor {
		flex: 4;
	}
</style>
