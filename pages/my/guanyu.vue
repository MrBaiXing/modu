<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#9e9e9e" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>关于我们</h3>
				</view>

			</view>
			<u-gap height="10" bgColor="#eee"></u-gap>
			<view class="gy_box">
				<view class="gy">
					<u--image :showLoading="true" :src="src" width="107px" height="90px"></u--image>
				</view>
				<view class="" style="margin: 30rpx 0 0rpx;">
					<h4>巨量智能科技</h4>
				</view>
				<view class="" style="color: #999;">
					<text>{{list}}</text>
				</view>
			</view>
			<view class="">
				<view class="grzl_box">
					
				</view>
			</view>
			<view class="gy_btn">
				<view class="">
					河南巨量智能科技有限公司 <text style="margin-left: 10rpx;">版权所有</text>
				</view>
				<view class="">
					Henan Juliang Intelligent Technology Co. LTD
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				src: '../../static/IMG/logo/logo.png'
			}
		},
		onLoad: function(options) {
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				this.list = wgtinfo.version
			})
			console.log(this.list)
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
		background-color: #fff;
	}
	.gy_btn{
		// margin-top: 800rpx;
		position: relative;
		// button:200rpx
		top: 1000%;
		color: #999999;
		text-align: center;
		font-size: 28rpx;
	}
.grzl_box {

		.grzl_box_list {
			margin: 0 30rpx;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #f1f1f1;
			display: flex;
			justify-content: space-between;
			text{
				color: #999;
			}
		}
	}

	.gy_box {
		// border: 1px solid #f00;
		background-color: #fff;
		height: 350rpx;
		text-align: center;
		.gy {
			// border: 1px solid #000;
			// margin: 0 30rpx;
			margin-top: 200rpx;
			display: flex;
			justify-content: center;

		}
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;

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
