<template>
	<view class="content">
		<u-sticky offset-top="22rpx">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#8d8d8d" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>监控属性</h3>
				</view>
				<view style="color: #506aff;line-height: 75rpx;" @click="accomplish">
					完成
				</view>
			</view>
		</view>
		</u-sticky>
		<view class="" style="margin: 20rpx 30rpx;">
			<u--input placeholder="请搜索监控属性" prefixIcon="search" shape="circle" prefixIconStyle="font-size: 22px;color:"
				v-model="ycname"></u--input>
		</view>
		<view class="" style="margin: 0rpx 30rpx;">
			<view class="">
				已选({{checkboxValue.length || 0 +'/3'}})
			</view>
			<view class="" style="display: flex; flex-wrap: wrap;">
				<u-tag :text="item" plainFill plain size="large" shape="circle" closable @close="open(index)"
					v-for="(item,index) in checkboxValue" :key="index"></u-tag>
			</view>
		</view>
		<view class="grzl_box">
			<!-- <view class="" style="border: 1px solid #000; height: 100rpx; line-height: 100rpx;"> -->

			<!-- </view> -->
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkboxList" :key="item.YCName"
					style="display: flex;justify-content: space-between;line-height: 100rpx; height: 100rpx; border-bottom: 1px solid #999;">
					<view>{{item.YCName}}</view>
					<view>
						<checkbox :value="item.YCName" :checked="item.qiyong == '1'" :disabled="item.disabled" />
					</view>
				</label>
			</checkbox-group>
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
				logo: [],
				editlogo: [],
				value1: false,

				checkboxValue: [],
				checkboxList: [],
				devno: '',
				ycname: ''
			}
		},

		onLoad: function(options) {
			this.devno = options
			this.GetDeviceYCDataBydevnowsl()
			setTimeout(function() {}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.GetDeviceYCDataBydevnowsl()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			open(inx) {
				var list = this.checkboxList
				list.forEach(item => {
					if (item.YCName == this.checkboxValue[inx]) {
						item.qiyong = '1'
					}
				})
				this.checkboxList = list
				this.checkboxValue.splice(inx, 1)
				var aa = {
					detail: {
						value: this.checkboxValue
					}
				}
				this.checkboxChange(aa)
			},

			checkboxChange(detail) {
				var data = detail.detail.value
				var a = data[0]
				var b = data[1]
				var c = data[2]
				var arr = this.checkboxList
				if (data.length == 3) {
					this.checkboxValue = data
					arr.forEach(item => {
						if (item.YCName == a || item.YCName == b || item.YCName == c) {
							item.disabled = false
							item.qiyong = '1'
						} else {
							item.disabled = true
							item.qiyong = '0'
						}
					})
					this.checkboxList = arr
				} else if (data.length <= 3) {
					this.checkboxValue = data
					arr.forEach(item => {
						if (item.YCName == a || item.YCName == b || item.YCName == c) {
							item.disabled = false
							item.qiyong = '1'
						} else {
							item.disabled = false
							item.qiyong = '0'
						}
					})
					this.checkboxList = arr
				} else {
					arr.forEach(item => {
						if (item.YCName == a || item.YCName == b || item.YCName == c) {
							item.disabled = false
							item.qiyong = '0'
						} else {
							item.disabled = true
							item.qiyong = '1'
						}
					})
					this.checkboxList = arr
				}
			},
			GetDeviceYCDataBydevnowsl() {
				console.log(123)
				var that = this
				var data = 'devno=' + this.devno.devno + '&ycname=' + this.ycname
				GetDeviceYCDataBydevno(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						let arry = res.data.list
						let arryNew = []
						arry.map((item, index) => {
							arryNew.push(Object.assign({}, item, {
								disabled: false
							}))
						})
						uni.removeStorageSync('checkboxList');
						that.checkboxList = arryNew

					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			accomplish() {
				this.fanhui()
			},
			cliadd(int) {
				int.sex = !int.sex
			},
			fanhui() {
				var list = []
				this.checkboxList.forEach(item => {
					if (item.YCName == this.checkboxValue[0] || item.YCName == this.checkboxValue[1] || item
						.YCName == this.checkboxValue[2]) {
						list.push({
							name: item.YCName,
							id: item.yccol
						})
					} else {

					}
				})
				uni.$emit('updateData', list)
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.u-page {
		&__upload-item {
			margin-top: 5px;
		}
	}

	.ucolllist {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f5f5f5;
		height: 100rpx;
		line-height: 100rpx;

		// margin: 0 -30rpx;
		// border: 1px solid #f00;
		view {
			display: flex;
			line-height: 100rpx;
		}
	}

	.grzl_box {
		// // height: 300rpx;
		// display: flex;
		// justify-content: space-around;
		margin: 30rpx 30rpx 0;
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
