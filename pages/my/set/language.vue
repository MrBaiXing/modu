<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#9e9e9e" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>消息设置</h3>
				</view>
				<view style="margin: 15rpx 30rpx 0 0; color: #007AFF;" @click="edit">
					保存
				</view>
			</view>
			<view class="grzl_box">
				
				<view class="grzl_box_list" v-for="(v,i) in list" :key="i" >
					<h4>{{v.title}}</h4>
					<u-switch v-model="v.status" size="20" @change="change"></u-switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{title:"短信通知",status:true},
					{title:"邮箱通知",status:true},
					{title:"APP通知",status:true},
				]
			}
		},
		onLoad: function(options) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			edit(){
				
			},
			change(e) {
				console.log('change', e);
			},

			accomplish() {
				this.fanhui()
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				});

			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f4;
	}

	.mag {
		margin: 0 0;
	}
.grzl_box {
		// border: 1px solid #f00;
		background-color: #fff;
		margin: 30rpx 0rpx 0rpx 0;

		.grzl_box_list {
			margin: 0 30rpx;
			padding: 30rpx 0;
			// border: 1rpx solid #000;
			border-bottom: 1rpx solid #f5f5f5;
			display: flex;
			justify-content: space-between;
			.my_qiye_text {
				line-height: 50rpx;
				font-size: 30rpx;
			}
		}
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;

		view {}
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #fff;
		top: 0;
		z-index: 999;
	}
</style>
