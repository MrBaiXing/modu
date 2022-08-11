<template>
	<view class="content">
		<u-sticky offset-top="22rpx">
			<view class="status_bar">
				<view class="top_view"></view>
				<view
					style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
					<u-icon @click="fanhui" name="arrow-left" color="#949494" size="24"></u-icon>
					<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
						<h3>设备日志</h3>
					</view>
					<view style="color: #fff;line-height: 75rpx;">
					</view>
				</view>
			</view>
		</u-sticky>
		<u-gap height="30rpx" bgColor="#eee"></u-gap>
		<view class="grzl_box">
			<!-- <view class="" style="margin-top: 0rpx; display: flex;justify-content: center;"> -->
			<view class=""
				style="display: flex; justify-content: space-between; height: 100rpx; border-bottom: #999 1px solid; line-height: 100rpx;">
				开始时间
				<view class="" style="display: flex;">
					<text @click="openDatetimePicker">{{values||'点击选择开始时间'}}</text>
					<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit" />
					<!-- <ruiDatePicker style="  color: #999;width: 320rpx; margin-top: 15rpx; border: 1px solid #fff;"
						fields="second" start="2010-00-00 00:00:00" end="2030-12-30 23:59:59" :value="value||'点击选择开始时间'"
						@change="bindChange" @cancel="bindCancel">
					</ruiDatePicker> -->
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			<view class=""
				style="display: flex; justify-content: space-between; height: 100rpx; border-bottom: #999 1px solid; line-height: 100rpx; ">
				结束时间
				<view class="" style="display: flex;">
					<text @click="openDatetimePickers">{{values1||'点击选择结束时间'}}</text>
					<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit" />
					<!-- <ruiDatePicker style=" color: #999; width: 320rpx; margin-top: 15rpx; border: 1px solid #fff;"
						fields="second" start="2010-00-00 00:00:00" end="2030-12-30 23:59:59" :value="value1||'点击选择结束时间'"
						@change="bindChange1" @cancel="bindCancel1">
					</ruiDatePicker> -->
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			<button type="default" style="background-color: #0062CC; color: #fff; margin: 30rpx 0;"
				@click="clisk">显示</button>

			<!-- </view> -->
		</view>
		<u-gap height="30rpx" bgColor="#eee"></u-gap>
		<view class="grzl_box">
			<u-empty v-if="stus" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
			<view class="" style="border-bottom: 1rpx solid #eee; color: #999;" v-for="(v,i) in list" :key="i">
				<h4 style="margin: 30rpx 0 20rpx;color: #000;">{{v.title}}</h4>
				<view class="" style="margin: 0rpx 0 20rpx;">
					<text style="color: #666; font-size: 34rpx;">{{v.content}}</text>
				</view>
				<view class="">
					<text style="margin-right:20rpx">日志时间</text>
					<text>{{v.Created}}</text>
				</view>
				<view class="" style="margin: 20rpx 0;">
					<text style="margin-right:20rpx">设备编号</text>
					<text>{{devno}}</text>
				</view>
				<view class="" style="margin: 20rpx 0;">
					<text style="margin-right:20rpx">设备名称</text>
					<text>{{name}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		GetDeviceLogListData
	} from '@/api/user.js'
	import SimpleDateTimePicker from "@/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";
	// import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		components: {
			// ruiDatePicker
			SimpleDateTimePicker
		},
		data() {
			return {
				value: '',
				value1: '',
				values: '',
				values1: '',
				list: [],
				stus: false,
				devno: '',
				status: '',
				name: ''
			}
		},
		onLoad: function(options) {
			this.devno = options.devno
			this.name = options.name
			console.log(options)
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
			openDatetimePicker() {
				this.status = true
				console.log(this.status)
				this.$refs.myPicker.show();
			},
			openDatetimePickers() {
				this.status = false
				console.log(this.status)
				this.$refs.myPicker.show();
			},
			// 关闭picker
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},

			handleSubmit(e) {
				console.log(e.day)
				if (this.status) {
					this.values = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`;
					this.value = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`

				} else {
					this.values1 = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`;
					this.value1 = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`
				}
			},
			clisk() {
				if (this.values != '' && this.values1 != '' && this.values <= this.values1) {
					// this.GetXiaoXiDatawsl()
					this.GetDeviceLogListDatawsl()
				}else{
					uni.showToast({
						title: '结束时间要大于开始时间',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			bindChange(e) {
				console.log(e)
				this.value = e
			},
			bindCancel() {},
			bindChange1(e) {
				console.log(e)
				this.value1 = e
			},
			bindCancel1() {},
			gto(val) {
				uni.navigateTo({
					url: val.url
				})
			},

			GetDeviceLogListDatawsl() {
				var that = this
				function add0(m) {
					return m < 10 ? '0' + m : m
				}
				function format(shijianchuo)
				{
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
				}
				var data = 'starttime=' + this.value + '&endtime=' + this.value1 + '&devno=' + this.devno
				GetDeviceLogListData(data).then(res => {
					console.log(data,res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.list = res.data.list
						that.list.forEach(item => {
							var aa = Date.parse(new Date(item.Created))
							item.Created = format(aa)
						})
						if (res.data.list.length <= 0) {
							that.stus = true
						} else {
							that.stus = false
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
		// margin: 30rpx 0rpx 0;
		padding: 0 30rpx;
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
