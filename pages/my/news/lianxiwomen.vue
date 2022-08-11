<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#8d8d8d" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>联系我们</h3>
				</view>
				<view style="color: #506aff;line-height: 75rpx;">

				</view>
			</view>
			<u-gap height="10" bgColor="#eee"></u-gap>
			<view class="grzl_box">
				<view class="">
					<h3 style="margin-bottom: 20rpx;">客服电话</h3>
					<text style="color: #999;">周一至周五 08:00-22:00</text>
					<view class=""
						style=" height: 120rpx;margin: 30rpx 0; background-color: #f9f9f9; border-radius: 20rpx;display: flex; line-height: 120rpx;">
						<u--image :showLoading="true" src="../../../static/IMG/phone@2x.png" width="50rpx"
							height="50rpx" @click="open" style="margin: 35rpx 40rpx;"></u--image>
						<view class="" style="width: 500rpx;">
							<h3>
								<a :href="'tel:'+ pass.gsdh" style="text-decoration:none;color: #000;">{{pass.gsdh}}</a>
								
							</h3>
						</view>
						<u-icon name="arrow-right" color="#999" size="24"></u-icon>
					</view>
				</view>
				<view class="">
					<h3>官方邮箱</h3>
					<view class=""
						style=" height: 120rpx;margin: 30rpx 0;background-color: #f9f9f9; border-radius: 20rpx;display: flex; line-height: 120rpx;">
						<u--image :showLoading="true" src="../../../static/IMG/meal@2x.png" width="60rpx" height="44rpx"
							@click="open" style="margin: 40rpx 40rpx;"></u--image>
						<view class="">
							<h3>
								{{pass.gsyx}}
							</h3>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetDeviceYCDataBydevno
	} from '@/api/user.js'
	export default {
		data() {
			return {
				pass:''
				// 
			}
		},

		onLoad: function(options) {
			this.pass = uni.getStorageSync('lists')[0]
			console.log(this.pass)
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
			click() {
				uni.makePhoneCall({
					phoneNumber: '400-3456-4562',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				})
				plus.device.dial('400-3456-4562', true);
			},
			open(inx) {


			},

			checkboxChange(detail) {

			},
			accomplish() {
				this.fanhui()
			},
			cliadd(int) {
				int.sex = !int.sex
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.grzl_box {
		// // height: 300rpx;
		// display: flex;
		// justify-content: space-around;
		margin: 20rpx 30rpx 0;
		// flex-wrap: wrap;
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
