<template>
	<view class="content">
		<u-sticky offset-top="22rpx">
			<view class="status_bar">
				<view class="top_view"></view>
				<view
					style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
					<u-icon @click="fanhui" name="arrow-left" color="#949494" size="24"></u-icon>
					<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
						<h3>报警信息</h3>
					</view>
					<view style="color: #fff;line-height: 75rpx;">
					</view>
				</view>
			</view>
		</u-sticky>
		<u-gap height="30rpx" bgColor="#eee"></u-gap>
		<view class="grzl_box">
			<view class=""
				style="display: flex; justify-content: space-between; height: 100rpx; border-bottom: #999 1px solid; line-height: 100rpx;">
				开始时间
				<view class="" style="display: flex;">
					<text @click="openDatetimePicker">{{values||'点击选择开始时间'}}</text>
					<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit" />
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			<view class=""
				style="display: flex; justify-content: space-between; height: 100rpx; border-bottom: #999 1px solid; line-height: 100rpx; ">
				结束时间
				<view class="" style="display: flex;">
					<text @click="openDatetimePickers">{{values1||'点击选择结束时间'}}</text>
					</ruiDatePicker>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			<view class="" style="margin: 0 -30rpx;">
				<u-sticky offset-top="67rpx">
					<dropdown-screen @finish="customClick" :itemArr='itemArr' :listArr='listArr'>
					</dropdown-screen>
				</u-sticky>
			</view>
		</view>
		<u-gap height="30rpx" bgColor="#eee"></u-gap>
		<view class="grzl_box">
			<u-empty v-if="list.length == 0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
			<view class="" style="border-bottom: 1rpx solid #eee; color: #999;" v-for="(v,i) in list" :key="i">
				<h4 style="margin: 30rpx 0; color: #000;">报警内容</h4>
				<view class="">
					<text style="margin-right: 20rpx; margin-left: 35rpx;">严重性</text>
					<text style="color: #f00;" v-if="v.bjyzx == 0">警告</text>
					<text style="color: #f00;" v-if="v.bjyzx == 1">一般</text>
					<text style="color: #f00;" v-if="v.bjyzx == 2">重要</text>
					<text style="color: #f00;" v-if="v.bjyzx == 3">紧急</text>
					<text style="color: #f00;" v-if="v.bjyzx == 4">不确定</text>
				</view>
				<view class="" style="margin: 20rpx 0;">
					<text style="margin-right: 20rpx;">报警状态</text>
					<text style="color: #0000ff;" v-if="v.bjopen == 0">开启</text>
					<text style="color: #0000ff;" v-if="v.bjopen == 1">关闭</text>
				</view>
				<view class="">
					<text style="margin-right: 20rpx;">报警时间</text>
					<text>{{v.bjtime}}</text>
				</view>
				<view class="" style="margin: 20rpx 0;">
					<text style="margin-right: 20rpx;">报警类型</text>
					<text style="color: #f00;" v-if="v.bjtype == 0">超速</text>
					<text style="color: #f00;" v-if="v.bjtype == 1">限位</text>
					<text style="color: #f00;" v-if="v.bjtype == 2">超载</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import SimpleDateTimePicker from "@/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";
	import {
		GetXiaoXiData,
		GetDict00ByType,
	} from '@/api/user.js'
	export default {
		components: {
			// ruiDatePicker,
			SimpleDateTimePicker
		},
		data() {
			return {
				birthday: "",
				listArr: ['严重性', '报警类别', '报警状态'],
				itemArr: [
					[],
					[],
					[]
				],
				value: '',
				value1: '',
				values: '',
				values1: '',
				list: [],
				bjtype: '',
				bjopen: '',
				bjyzx: '',
				status: ''

			}
		},
		onLoad: function(options) {
			this.GetXiaoXiDatawsl()
			this.GetDict00ByTypes('dt0007A', 0)
			this.GetDict00ByTypes('dt0008A', 1)
			this.GetDict00ByTypes('dt0005A', 2)
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
				this.$refs.myPicker.show();
			},
			openDatetimePickers() {
				this.status = false
				this.$refs.myPicker.show();
			},
			// 关闭picker
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},

			handleSubmit(e) {
				if (this.status) {
					this.values = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`;
					this.value = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`
					if (this.values != '' && this.values1 != '' && this.values <= this.values1) {
						this.GetXiaoXiDatawsl()
					} else {}
				} else {
					this.values1 = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`;
					this.value1 = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`
					if (this.values != '' && this.values1 != '' && this.values <= this.values1) {
						this.GetXiaoXiDatawsl()
					} else {
						uni.showToast({
							title: '结束时间要大于开始时间',
							duration: 2000,
							icon: 'none'
						});
					}
				}
			},
			GetDict00ByTypes(val, inx) {
				var that = this;
				var data = 'type=' + val;
				GetDict00ByType(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						if (inx == 0) {
							res.data.list.forEach(item => {
								that.itemArr[inx].push({})
							})
						}
						that.itemArr[inx] = res.data.list

					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})

			},
			customClick(val) {
				console.log(val.$value, val.$index)
				if (val.$value == 1) { // 在线状态
					this.bjtype = this.itemArr[val.$value][val.$index].id
					this.GetXiaoXiDatawsl()
				} else if (val.$value == 2) {
					this.bjopen = this.itemArr[val.$value][val.$index].id
					this.GetXiaoXiDatawsl()
				} else if (val.$value == 0) {
					this.bjyzx = this.itemArr[val.$value][val.$index].id
					this.GetXiaoXiDatawsl()
				}
			},
			bindChange(e) {
				this.value = e

			},
			bindCancel() {},
			bindChange1(e) {
				this.value1 = e

			},
			bindCancel1() {},
			GetXiaoXiDatawsl() {
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

				var data = 'type=0&starttime=' + this.value + '&endtime=' + this.value1 + '&bjyzx=' + this.bjyzx +
					'&bjtype=' + this.bjtype + '&bjopen=' + this.bjopen;
				GetXiaoXiData(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						that.list = res.data.list
						that.list.forEach(item => {
							var aa = Date.parse(new Date(item.bjtime))
							item.bjtime = format(aa)
						})
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
		// border: 1px solid #f00;
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
