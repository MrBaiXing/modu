<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#9c9c9c" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>个人资料</h3>
				</view>
				<view class="" style="margin-top: 15rpx; color: #007AFF;" @click="edit">
					保存
				</view>
			</view>
			<view class="grzl_box">
				<view class="grzl_box_lists" @click="show = true">
					<view class="my_qiye_text">
						<h3>性别</h3>
					</view>
					<view>
						<u-picker :show="show" :columns="columns" @confirm="confirm" @cancel='cancel'> </u-picker>
						<text class="input" @click="show = true">{{list.sex||'请选择性别'}}</text>
					</view>

				</view>
				<view class="grzl_box_lists" @click="show1 = true">
					<view class="my_qiye_text">
						<h3>生日</h3>
					</view>

					<view>
						<u-datetime-picker :show="show1" v-model="value1" :minDate="timsr" :maxDate="tims" mode="date"
							@confirm="confirm1" @cancel='cancel'></u-datetime-picker>
						<!-- 	<u-datetime-picker :show="show1" v-model="value1" mode="date" @confirm="confirm1"
							@cancel='cancel'>
						</u-datetime-picker> -->
						<text class="input" @click="show1 = true">{{list.brithday||'请选择生日'}}</text>
					</view>

				</view>
				<view class="grzl_box_lists">
					<view class="my_qiye_text">
						<h3>地域</h3>
					</view>
					<view style="display: flex;">
						<pca-picker-cc v-on:getAddressResultObj="getAddressResultObj" :addressList.sync="addressList">
							<view class="uni-input" style="line-height: 100rpx; color: #999;">
								{{ addressList[0]+'-'+addressList[1]+'-'+addressList[2]}}
							</view>
						</pca-picker-cc>
					</view>
				</view>
				<view class="grzl_box_lists">
					<view class="my_qiye_text">
						<h3>地址</h3>
					</view>

					<view>
						<input class="input" placeholder="请输入地址" v-model="list.address" @focus="focus"></input>
					</view>
				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		GetUserByID,
		UpdateUserByID,
	} from '@/api/user.js'
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions,
		},
		data() {
			return {
				tims: (new Date()).getTime(),
				timsr: (new Date()).getTime() - 30 * 12 * 30 * 24 * 6000 * 1000,
				addressList: [],

				list: {},
				time: '',
				value1: Number(new Date()),
				title: '',
				show1: false,
				show: false,
				columns: [
					['男', '女']
				],
				region: [],
				provice: [],
			}
		},
		onLoad() {
			// console.log(uni.getStorageSync('token'))
			console.log(this.tims)
			this.GetUserByIDwsl()
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.GetUserByIDwsl()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getAddressResultObj(e) {
				this.addressList[e[0].name, e[1].name, e[2].name]
				this.provice = e
			},

			cancel() {

				this.show1 = false
				this.show = false
			},
			confirm(e) {
				this.list.sex = e.value[0]
				this.show = false
			},
			confirm1(e) {
				this.show1 = false
				this.result(e.value, e.mode)
			},
			result(time, mode) {
				var that = this
				const timeFormat = uni.$u.timeFormat,
					toast = uni.$u.toast
				switch (mode) {
					case 'datetime':
						return that.list.brithday = timeFormat(time, 'yyyy-mm-dd hh:MM')
					case 'date':
						return that.list.brithday = timeFormat(time, 'yyyy-mm-dd')
					case 'year-month':
						return that.list.brithday = timeFormat(time, 'yyyy-mm')
					case 'time':
						return that.list.brithday = time
					default:
						return ''
				}
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
			},
			focus() {
				console.log(123)
			},
			edit() {
				var that = this
				console.log(this.provincename)
				var datas = {};
				datas.provice = this.provice[0].name;
				datas.provicevalue = this.provice[0].code;
				datas.city = this.provice[1].name;
				datas.cityvalue = this.provice[1].code;
				datas.area = this.provice[2].name;
				datas.areavalue = this.provice[2].code;
				datas.sex = this.list.sex;
				datas.address = this.list.address;
				datas.brithday = this.list.brithday;
				var data = JSON.stringify(datas)
				data = 'jsonform=' + data
				UpdateUserByID(data).then(res => {
					console.log(data, res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.tishi(res)
					} else {
						that.tishi(res)
					}
				})
			},
			tishi(res) {
				uni.showToast({
					title: res.data.msg,
					duration: 2000,
					icon: 'none'
				});
			},
			cliadd(int) {
				console.log(int)
				uni.navigateTo({
					url: int.url
				});
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				})
			},
			GetUserByIDwsl() {
				var that = this
				var data = ''
				GetUserByID(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						that.list = res.data.list[0]
						var a = that.list.brithday.split(' ')
						var b = a[0].split('/')
						if (b[2]) {
							that.list.brithday = b[0] + '-' + b[1] + '-' + b[2]
						} else {
							that.list.brithday = ''
						}
						if (res.data.list[0].area) {
							that.addressList = [res.data.list[0].provice, res.data.list[0].city, res.data.list[0]
								.area
							]
						} else {
							that.addressList = ["北京市", "市辖区", "东城区"]
						}
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.grzl_box {
		background-color: #fff;
		margin: 30rpx 0rpx 0rpx;

		.grzl_box_lists {
			border-bottom: 1rpx solid #f5f5f5;
			height: 100rpx;
			margin: 0 30rpx;
			display: flex;

			text {
				color: #999;
				line-height: 100rpx;
			}

			.my_qiye_text {
				width: 120rpx;
				font-size: 30rpx;
				line-height: 100rpx;
			}

			input {
				height: 100rpx;
				color: #999;
				width: 520rpx;
			}

		}
	}

	page {
		background: #eeeeee;
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
