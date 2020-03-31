<template>
	<view class="container">
		<view class="sub-container">
			<view class="left-item">
				<text class="left-icon iconfont" :class="iconClass"></text>
				<text class="text">{{itemName}}:</text>
			</view>
			<input 
					@blur="judementInputContent"
					maxlength="12"
					placeholder-class="placeholder-style"
					v-model="inputCentent"
					:type="inputType" 
					class="input-area" 
					:placeholder="placeHolder"/>
			<text class="must-fill iconfont icon-bitianxiang-" v-if="mustFill"></text>
		</view>
		<view class="tips-info tips-text" v-show="isTipShow">
			 <text class="iconfont icon-cry"></text>{{tips}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			iconClass: String,
			mustFill: Boolean,
			placeHolder: String,
			itemName: String,
			inputType: String
		},
		data() {
			return {
				isMustFill: this.mustFill,
				isTipShow: false,
				tips: '',
				inputCentent: ''
			}
		},
		methods: {
			judementInputContent() {
				if(this.inputCentent.length !== 0) {
					this.isTipShow = false
					this.$emit('getInputCentent', {type: this.itemName, content: this.inputCentent})
				}
				if(this.mustFill) {
					if(this.inputCentent.length === 0) {
						this.isTipShow = true
						this.tips = `${this.itemName}不可以为空`
						this.$emit('getInputCentent', {type: this.itemName, content: this.inputCentent})
					}
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
	}
	.sub-container {
		display: flex;
		width: 90%;
		margin: 0 auto;
		align-items: center;
		padding: 10rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.must-fill {
		font-size: 40rpx;
		color: #D23E3E;
	}
	.left-item .text {
		font-size: 32rpx;
		color: #666666;
		padding: 0 10rpx;
	}
	.input-area {
		text-align: center;
		flex: 4;
	}
	.must-fill {
		flex: 1;
	}
	.tips-info {
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #666666;
	}
	.tips-text {
		color: #FF0014;
	}
	.placeholder-style {
		color: #666666;
	}
</style>
