<template>
	<view class="container">
		<view class="calendar-container">
			<imt-calendar></imt-calendar>
		</view>
		
		<view class="blue-bg">
			<view class="top-btn">
			</view>
			<view class="water-group">
				<view class="water water1" style="background-image: url('../../static/15707364-c7cd6d04891a5a56.png')"></view>
				<view class="water water2" style="background-image: url('../../static/15707364-c7cd6d04891a5a56.png')"></view>
				<view class="water water3" style="background-image: url('../../static/15707364-c7cd6d04891a5a56.png')"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import imtCalendar from '../../components/imt-calendar/imt-calendar.vue'
	export default {
		components: {
			imtCalendar
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #F1F1F1;
	}
	.container {
		width: 100%;
	}
	.calendar-container {
		position: fixed;
		top: 350rpx;
		z-index: 999;
		left: 50%;
		transform: translateX(-50%);
	}
	.blue-bg {
		height: 400rpx;
		width: 100%;
		margin: auto;
		background: linear-gradient(to bottom, #ff5777, #f1f1f1);
	}

	.top-btn {
		height: 200rpx;
	}

	.water-group {
		position: relative;
		height: 110px;
		width: 100%;
		overflow: hidden;
	}

	.water-group .water {
		position: absolute;
		width: 200%;
		height: 100%;
	}

	.water-group .water1 {
		top: 20px;
		left: -100%;
		opacity: 0.2;
		animation: water-right 20s infinite linear;
	}

	.water-group .water2 {
		top: 30px;
		left: 0;
		opacity: 0.3;
		animation: water-left 30s infinite linear;
	}

	.water-group .water3 {
		top: 44px;
		left: -100%;
		animation: water-right 40s infinite linear;
	}

	@keyframes water-right {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1)
		}

		50% {
			transform: translateX(25%) translateZ(0) scaleY(0.85)
		}

		100% {
			transform: translateX(50%) translateZ(0) scaleY(1)
		}
	}

	@keyframes water-left {
		from {
			transform: translate(0%, 0px);
		}

		to {
			transform: translate(-50%, 0px);
		}
	}
</style>
