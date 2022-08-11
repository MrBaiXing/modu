<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#909090" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>编辑基本信息</h3>
				</view>
			</view>
			<view class="grzl_box">
				<view class="cladd" v-for="(item,index) in xinxilist">
					<h4 style="width: 180rpx;">{{item.title}}</h4>
					<text style="color: #9d9d9d; line-height: 100rpx;" v-if="index == 0">{{xinxiObj.devno}}</text>

					<u--input class="u_input" color="#9d9d9d" placeholder="请输入名称" inputAlign="center" border="none"
						clearable v-if="index == 1" v-model="xinxiObj.devname"></u--input>


					<picker :show="show2" :range="gslist" range-key="gsname" @change="bindPickerChange"><text
							class="u_input" style="color: #9d9d9d;" v-if="index == 2"
							@click="show2 = true">{{xinxiObj.gsname||indexs.gsname || '请选择公司'}}</text></picker>





					<text class="u_input" style="color: #9d9d9d;" v-if="index == 3"
						@click="show = true">{{xinxiObj.devicedate|| '请输入时间'}}</text>


					<text class="u_input" style="color: #9d9d9d;" v-if="index == 4"
						@click="show5 = true">{{xinxiObj.nextdevicedate|| '请输入时间'}}</text>


					<picker :show="show3" :range="list" range-key="name" @change="bindPickerChanges">
						<text class="u_input" style="color: #9d9d9d;" v-if="index == 5"
							@click="show3 = true">{{xinxiObj.devtype || '请选择类型'}}</text>
					</picker>


					<u--input class="u_input" color="#9d9d9d" placeholder="请输入名称" inputAlign="center" border="none"
						clearable v-if="index == 6" v-model="xinxiObj.company"></u--input>
					<u--input class="u_input" color="#9d9d9d" placeholder="请输入名称" inputAlign="center" border="none"
						clearable v-if="index == 7" v-model="xinxiObj.devxinghao"></u--input>
					<text class="u_input" style="color: #9d9d9d;" v-if="index == 8"
						@click="show1 = true">{{xinxiObj.Created || '请输入时间'}}</text>

				</view>
			</view>
			<u-datetime-picker :show="show" v-model="value" mode="date" closeOnClickOverlay @confirm="confirm"
				@cancel="cancel" @close="close"></u-datetime-picker>
			<u-datetime-picker :show="show1" v-model="value1" mode="date" closeOnClickOverlay @confirm="confirm"
				@cancel="cancel" @close="close"></u-datetime-picker>
			<u-datetime-picker :show="show5" v-model="value5" mode="date" closeOnClickOverlay @confirm="confirmr"
				@cancel="cancel" @close="close"></u-datetime-picker>
		</view>
		<button type="default"
			style=" position: absolute;bottom: 100rpx;margin: 0 30rpx;width: 680rpx; background-color: #0062CC; color: #fff;"
			@click="click">保存</button>
	</view>
</template>

<script>
	import {
		GetDeviceListDataByID,
		GetDict00ByType,
		GetCompanyListDataByProject,
		UpdateDeviceInfoDataByID
	} from '@/api/user.js'
	export default {
		data() {
			return {
				show: false,
				show2: false,
				show5: false,
				indexs: {},
				show3: false,
				value: Number(new Date()),
				show1: false,
				value1: Number(new Date()),
				value5: Number(new Date()),
				xinxiObj: {},
				xinxilist: [{
						title: "设备编号"
					},
					{
						title: "设备名称"
					},
					{
						title: "所属公司"
					},
					{
						title: "年检时间"
					},
					{
						title: "下次年检"
					},
					{
						title: "设备类型"
					},
					{
						title: "品牌"
					},
					{
						title: "型号"
					},
					{
						title: "安装时间"
					},
					// {
					// 	title: "项目名称"
					// },
					// {
					// 	title: "项目负责人"
					// },
				],
				id: '',
				list: [],
				gslist: []
			}
		},

		onLoad: function(options) {
			console.log(options)
			this.id = options.id
			this.GetDeviceListDataByIDwsl(options.id)
			this.GetDict00ByTypewsl()
			// this.GetCompanyListDataByProjectwsl(options.devno)
		},
		onShow() {
			this.GetDeviceListDataByIDwsl(this.id)
			this.GetDict00ByTypewsl()
		},
		methods: {
			close() {
				this.show = false
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.show5 = false
			},
			cancel() {
				this.show = false
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.show5 = false
			},
			confirm(e) {
				console.log(e)
				this.result(e.value, e.mode, this.show)

			},
			confirmr(e) {
				console.log(e)
				this.show5 = false
				this.results(e.value, e.mode, this.show)

			},
			confirms() {
				console.log(123)
				this.show2 = false
				this.show3 = false
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexs = this.gslist[e.target.value]
				console.log(this.indexs)
			},
			bindPickerChanges(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.xinxiObj.devtype = this.list[e.target.value].name
			},
			result(time, mode) {
				const timeFormat = uni.$u.timeFormat,
					toast = uni.$u.toast
				switch (mode) {
					case 'datetime':
					case 'date':
						if (this.show) {
							this.xinxiObj.devicedate = timeFormat(time, 'yyyy-mm-dd')
						} else {
							this.xinxiObj.Created = timeFormat(time, 'yyyy-mm-dd')
						}
						this.show = false
						this.show1 = false
					case 'year-month':
					case 'time':
					default:
						return ''
				}
			},
			results(time, mode) {
				const timeFormat = uni.$u.timeFormat,
					toast = uni.$u.toast
				switch (mode) {
					case 'datetime':
					case 'date':
						if (this.show) {
							this.xinxiObj.nextdevicedate = timeFormat(time, 'yyyy-mm-dd')
						} else {
							this.xinxiObj.nextdevicedate = timeFormat(time, 'yyyy-mm-dd')
						}
						case 'year-month':
						case 'time':
						default:
							return ''
				}
			},
			click(e) {
				this.UpdateDeviceInfoDataByIDwsl()
			},
			cliadd(int) {
				int.sex = !int.sex
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				})
			},
			UpdateDeviceInfoDataByIDwsl() {
				var that = this
				var obj = {
					devno: this.xinxiObj.devno,
					devname: this.xinxiObj.devname,
					gsno: this.indexs.gsno,
					devicedate: this.xinxiObj.devicedate,
					devtype: this.xinxiObj.devtype,
					company: this.xinxiObj.company,
					devxinghao: this.xinxiObj.devxinghao,
					Created: this.xinxiObj.Created,
					nextdevicedate: this.xinxiObj.nextdevicedate,
					// proname: this.xinxiObj.proname,
					// xmfuzeren: this.xinxiObj.xmfuzeren,
				}
				obj = JSON.stringify(obj)
				var data = 'devid=' + this.id + '&jsonform=' + obj
				UpdateDeviceInfoDataByID(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: 'none'
						});
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			GetDeviceListDataByIDwsl(id) {
				var data = 'devid=' + id
				GetDeviceListDataByID(data).then(res => {
					var b = '',
						c = '';
					if (res.statusCode == 200 && res.data.code == 0) {
						this.xinxiObj = res.data.list[0]
						var a = this.xinxiObj.devicedate.split(' ')
						var b = this.xinxiObj.Created.split(' ')
						this.xinxiObj.devicedate = a[0]
						this.xinxiObj.Created = b[0]
						this.GetCompanyListDataByProjectwsl()
						console.log(this.xinxiObj)
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			GetCompanyListDataByProjectwsl(val) {
				var data = 'xmno=' + this.xinxiObj.xmno
				GetCompanyListDataByProject(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						this.gslist = res.data.list
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			GetDict00ByTypewsl() {
				var data = 'type=dt0001A'
				GetDict00ByType(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						this.list = res.data.list
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
	page {
		background-color: #eeeeee;
	}

	.grzl_box {
		background-color: #fff;
		margin-top: 30rpx;
		padding: 0rpx 30rpx;

		.cladd {
			display: flex;
			line-height: 100rpx;
			height: 100rpx;
			border-bottom: 1px solid #eee;

			.u_input {
				height: 100rpx;
			}
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
