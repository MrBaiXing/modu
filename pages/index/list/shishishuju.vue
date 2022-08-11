<template>
	<view class="content">
		<u-sticky offset-top="22rpx">
			<view class="status_bar">
				<view class="top_view"></view>
				<view
					style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; display: flex; height: 100rx; background: #fff;">
					<u-icon @click="fanhui" name="arrow-left" color="#909090" size="24"></u-icon>
					<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
						<h3>实时数据</h3>
					</view>
					<view style="color: #3a4eff;line-height: 75rpx; width: 100rpx;" @click="accomplish">
						<!-- 	<picker class="pingtai" :range="columns">

						</picker> -->
						<picker @change="bindPickerChange($event,columns)" :value="index" :range="columns"
							:range-key="'name'">
							<view class="uni-input">切换</view>
						</picker>
					</view>
				</view>
			</view>
		</u-sticky>
		<view class="grzl_box" style="padding-top: 30rpx; text-align: center;">
			<h3 style="color: #fff;">{{devno}}</h3>
		</view>
		<view class=" head" style="">
			<view style="display: flex;">
				<h4 class="head_text">设备名称</h4><text>{{name}}</text>
			</view>
			<!-- <view style="margin: 20rpx 0;display: flex;">
				<h4 class="head_text">工作状态</h4>
				<text v-if="status == 1 && baojing == 0" style="color: #4783f7;">忙碌</text>
				<text v-if="status == 0 && baojing == 0" style="color: #81d459;">空闲</text>
				<text v-if="status == 2 && baojing == 0" style="color: #eb6b2c;">故障</text>
				<text v-if="baojing == 1" style="color: #ea4338;">报警</text>
			</view> -->
			<view style="display: flex;margin: 20rpx 0;">
				<h4 class="head_text">添加时间</h4><text>{{time}}</text>
			</view>
			<view style="display: flex;">
				<h4 class="head_text">位置信息</h4><text>{{dizhi}}</text>
			</view>
		</view>
		<view style=" margin: 0rpx 30rpx;">
			<view v-for="(item,index) in list1" :key="index"
				style="display: flex; justify-content: space-between; flex-wrap: wrap; line-height: 100rpx; border-bottom: 1px solid #eee; padding: 0 20rpx;">
				<view>
					<text >{{item.YCName}}</text>

				</view>
				<view v-if="pickerData == 0" style="color: #797979;">
					<text
						v-if="item.Val == 1 && item.yccol == 'D1'||item.Val == 1 && item.yccol == 'D2'||item.Val == 1 && item.yccol == 'D3'||item.Val == 1 && item.yccol == 'D4'||item.Val == 1 && item.yccol == 'D5'">在线</text>
					<text
						v-if="item.Val == 0 && item.yccol == 'D1'||item.Val == 0 && item.yccol == 'D2'||item.Val == 0 && item.yccol == 'D3'||item.Val == 0 && item.yccol == 'D4'||item.Val == 0&& item.yccol == 'D5'">离线</text>
					<text v-if="item.Val == 0 && item.yccol == 'D6'">空闲</text>
					<text v-if="item.Val == 1 && item.yccol == 'D6'">忙碌</text>
					<text v-if="item.Val == 2 && item.yccol == 'D6'">报警</text>
					<text
						v-if="item.yccol !='D1'&&item.yccol !='D2'&&item.yccol !='D3'&&item.yccol !='D4'&&item.yccol !='D5'&&item.yccol !='D6'">{{item.Val + item.DW}}</text>
				</view>
				<view v-if="pickerData == 1 || pickerData == 2">
					<view
						style="width: 30rpx; height: 30rpx; background-color: #1aff01; border-radius: 15rpx; margin-top: 35rpx;"
						v-if="item.Val == 1 && item.yccol == 'D1'||item.Val == 1 && item.yccol == 'D2'||item.Val == 1 && item.yccol == 'D3'||item.Val == 1 && item.yccol == 'D4'||item.Val == 1 && item.yccol == 'D5'">
					</view>
					<view
						style="width: 30rpx; height: 30rpx; background-color: #999; border-radius: 15rpx;margin-top: 35rpx;"
						v-if="item.Val == 0 && item.yccol == 'D1'||item.Val == 0 && item.yccol == 'D2'||item.Val == 0 && item.yccol == 'D3'||item.Val == 0 && item.yccol == 'D4'||item.Val == 0 && item.yccol == 'D5'">
					</view>
					<view
						style="width: 30rpx; height: 30rpx; background-color: #1aaaa1; border-radius: 15rpx;margin-top: 35rpx;"
						v-if="item.yccol == 'D6' && item.Val == 0 "></view>
					<view
						style="width: 30rpx; height: 30rpx; background-color: #ffc12e; border-radius: 15rpx;margin-top: 35rpx;"
						v-if="item.yccol == 'D6' && item.Val == 1 "></view>
					<view
						style="width: 30rpx; height: 30rpx; background-color: #f00; border-radius: 15rpx;margin-top: 35rpx;"
						v-if="item.yccol == 'D6' && item.Val == 2 "></view>
					<view v-if="pickerData == 1">
						<view style="display: flex; width: 690rpx; line-height: 60rpx;color: #797979;"
							v-if="item.yccol == 'D13'|| item.yccol == 'D14' || item.yccol == 'D15' || item.yccol == 'D16'">
							<view
								style="width: 30rpx; height: 30rpx;border-radius: 5rpx;background-color: #4885f7; margin-right: 30rpx;margin-top: 16rpx;">
							</view>
							<text v-if="item.yccol != 'D16'">实时位移({{item.DW}})</text>
							<text v-else>当前重量({{item.DW}})</text>
						</view>
						<view style="padding-bottom: 10rpx;margin-left: 30rpx; padding-top: 20rpx;"
							v-if="item.yccol == 'D13'|| item.yccol == 'D14' || item.yccol == 'D15' || item.yccol == 'D16'">

							<view class="background_img" style="line-height: 55rpx; color: #4885f7;"
								:style="{marginLeft: item.Val/560 * item.downxian -30  +'rpx'}">
								{{item.Val}}
							</view>
						</view>
						<view
							style="display: flex; width: 690rpx; line-height: 60rpx; color: #4885f7;  margin-left: 60rpx;"
							v-if="item.yccol == 'D13'|| item.yccol == 'D14' || item.yccol == 'D15' || item.yccol == 'D16'">
							<view
								style="width: 540rpx; height: 30rpx;border-radius: 5rpx;background-color: #eee; margin-right: 10rpx;">
								<view
									style="height: 30rpx;background-color: #4885f7;width: 200rpx; border-radius: 6rpx;"
									:style="{width: item.Val/460 * item.downxian+'rpx'}">
								</view>
							</view>
							<!-- {{item.downxian}}{{item.DW}} -->
						</view>
						<view
							style="display: flex; width: 690rpx; line-height: 60rpx; justify-content: center; margin: 30rpx 0;color: #797979;"
							v-if="item.yccol == 'D13'|| item.yccol == 'D14' || item.yccol == 'D15' || item.yccol == 'D16'">
							<view
								style="width: 30rpx; height: 30rpx;border-radius: 5rpx;background-color: #eee; margin-right: 30rpx;margin-top: 16rpx;">
							</view>
							<text v-if="item.yccol != 'D16'" style="color: #999;">位移上限:
								<text style="color: #000;">
									{{item.downxian}}{{item.DW}}

								</text>
								</text>
							<text v-else style="color: #999;">称重上限:<text style="color: #000;">
									{{item.downxian}}{{item.DW}}

								</text></text>
						</view>
					</view>
					<view v-if="pickerData == 2">
						<view class="" v-if="item.yccol == 'D13' " style="height: 200rpx;width: 600rpx;">
							<qiun-data-charts type="arcbar"
								:opts="{title:{name:item.Val,color:'#1890ff',fontSize:20},subtitle:{},extra:{arcbar:{type:'circle',startAngle:0.5,endAngle:0.5}}}"
								:chartData="chartsDataArcbar2" />
						</view>
						<view class="" v-if="item.yccol == 'D14'" style="height: 200rpx;width: 600rpx;">
							<qiun-data-charts type="arcbar"
								:opts="{title:{name:item.Val,color:'#1890ff',fontSize:20},subtitle:{},extra:{arcbar:{type:'circle',startAngle:0.5,endAngle:0.5}}}"
								:chartData="chartsDataArcbar3" />
						</view>
						<view class="" v-if="item.yccol == 'D15'" style="height: 200rpx;width: 600rpx;">
							<qiun-data-charts type="arcbar"
								:opts="{title:{name:item.Val,color:'#1890ff',fontSize:20},subtitle:{},extra:{arcbar:{type:'circle',startAngle:0.5,endAngle:0.5}}}"
								:chartData="chartsDataArcbar4" />
						</view>
						<view class="" v-if="item.yccol == 'D16'" style="height: 200rpx;width: 600rpx;">
							<qiun-data-charts type="arcbar"
								:opts="{title:{name:item.Val,color:'#1890ff',fontSize:20},subtitle:{},extra:{arcbar:{type:'circle',startAngle:0.5,endAngle:0.5}}}"
								:chartData="chartsDataArcbar5" />
						</view>
						<view v-if="item.yccol == 'D13' || item.yccol == 'D14' || item.yccol == 'D15'"
							style="display: flex; justify-content: space-between; padding-bottom: 30rpx; color: #999;">
							<view style="display: flex; font-size: 30rpx;">
								<view
									style="width: 30rpx; height: 30rpx;border-radius: 5rpx;background-color: #1890ff; margin-right: 30rpx;margin-top: 35rpx;">
								</view>
								实时位移({{item.DW}})
							</view>
							<view style="display: flex;font-size: 30rpx;">
								<view
									style="width: 30rpx; height: 30rpx;border-radius: 5rpx;background-color: #eee; margin-right: 30rpx;margin-top: 35rpx;">
								</view>
								位移上限({{item.downxian}}{{item.DW}})
							</view>
						</view>
						<view v-if="item.yccol == 'D16'"
							style="display: flex; justify-content: space-between; padding-bottom: 30rpx; color: #999;">
							<view style="display: flex; font-size: 30rpx;">
								<view
									style="width: 30rpx; height: 30rpx;border-radius: 5rpx;background-color: #1890ff; margin-right: 30rpx;margin-top: 35rpx;">
								</view>
								实时重量({{item.DW}})
							</view>
							<view style="display: flex;font-size: 30rpx;">
								<view
									style="width: 30rpx; height: 30rpx;border-radius: 5rpx;background-color: #eee; margin-right: 30rpx;margin-top: 35rpx;">
								</view>
								称重上限({{item.downxian}}{{item.DW}})
							</view>
						</view>
					</view>
					<view
						v-if="item.yccol !='D1'&&item.yccol !='D2'&&item.yccol !='D3'&&item.yccol !='D4'&&item.yccol !='D5'&&item.yccol !='D6'&&item.yccol !='D13'&&item.yccol !='D14'&&item.yccol !='D15'&&item.yccol !='D16'">

						<text>{{item.Val}}{{item.DW}}</text>
					</view>
				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		GetDeviceYCDataBydevno,
		GetDict00ByType
	} from '@/api/user.js'
	export default {
		data() {
			return {
				data: '132kg',
				value1: false,

				chartsDataGauge2: {},
				Gauge: {
					"categories": [{
						"value": 0.2,
						"color": "#1890ff"
					}, {
						"value": 0.8,
						"color": "#2fc25b"
					}, {
						"value": 1,
						"color": "#f04864"
					}],
					"series": [{
						"name": "当前重量",
						"data": 0.96
					}]
				},
				name: '',
				status: '',
				baojing: '',
				time: '',
				dizhi: '',
				devno: '',
				list1: [], // 列表
				list: [], // 列表
				// list1:[]
				refreshtime: 0,
				setTimeout: null,
				show1: false,
				columns: [],
				index: 0,
				pickerData: 0,
				chartsDataArcbar2: {},
				chartsDataArcbar3: {},
				chartsDataArcbar4: {},
				chartsDataArcbar5: {},
			}
		},

		onLoad: function(options) {
			var refresh = uni.getStorageSync("time").split('秒')
			var suts = uni.getStorageSync("timesuatus")
			this.devno = options.devno
			this.GetDeviceYCDataBydevnowsl()
			this.GetDict00ByTypewsl('dt0009A')
			this.name = options.name
			this.status = options.guzhangtype
			this.baojing = options.baojing
			this.dizhi = options.dizhi
			this.time = options.time
			console.log(refresh, suts)
			if (refresh[0]>0) {
				this.refreshtime = refresh[0] * 1000
				this.refreshfun()
			} else {
				this.refreshtime = 3000
				this.refreshfun()
				// clearInterval(this.setTimeout)
				// this.setTimeout = null
			}
		},
		onReady() {
			//模拟从服务器获取数据
			this.getServerData()
		},
		onUnload() {
			if (this.setTimeout) {
				clearInterval(this.setTimeout);
				this.setTimeout = null;
			}
		},
		methods: {
			bindPickerChange: function(e, storage) {
				console.log(e)
				this.index = e.target.value
				this.pickerData = storage[this.index].id // 这里就是选中的对象
				console.log(this.pickerData)
			},
			accomplish() {
				this.show1 = true
			},
			accomplishacc(e) {
				this.show1 = false
			},
			cancel() {
				this.show1 = false
			},
			refreshfun() {
				this.setTimeout = setInterval(() => {
					this.GetDeviceYCDataBydevnowsl()
				}, this.refreshtime)
			},
			timefun(atime, btime) {},
			GetDeviceYCDataBydevnowsl() {
				var that = this
				var data = 'devno=' + this.devno + '&ycname='
				GetDeviceYCDataBydevno(data).then(res => {
					console.log(res)
					var list = []
					var atime = '',
						btime = '';
					if (res.statusCode == 200 && res.data.code == 0) {
						this.list1 = res.data.list
						for (var i = 0; i < that.list1.length; i++) {
							if (that.list1[i].yccol == 'D13') {
								that.chartsDataArcbar2 = {
									series: [{
										data: that.list1[i].Val * 1 / that.list1[i].downxian * 1
									}]
								}
							}
							if (that.list1[i].yccol == 'D14') {
								that.chartsDataArcbar3 = {
									series: [{
										data: that.list1[i].Val * 1 / that.list1[i].downxian * 1
									}]
								}
							}
							if (that.list1[i].yccol == 'D15') {
								that.chartsDataArcbar4 = {
									series: [{
										data: that.list1[i].Val * 1 / that.list1[i].downxian * 1
									}]
								}
							}
							if (that.list1[i].yccol == 'D16') {
								that.chartsDataArcbar5 = {
									series: [{
										data: that.list1[i].Val * 1 / that.list1[i].downxian * 1
									}]
								}
							}
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
			GetDict00ByTypewsl(val) {
				var that = this
				var data = 'type=' + val + '&isAll=1'
				GetDict00ByType(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						this.columns = res.data.list
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			change() { // 自动刷新跳转
				if (this.value1) {
					uni.navigateTo({
						url: "./zidongshuxin"
					})
				}
			},
			getServerData() {
				// setTimeout(() => {
				this.chartsDataGauge2 = JSON.parse(JSON.stringify(this.Gauge))

				// }, 1500);
				// console.log(JSON.parse(JSON.stringify(this.Gauge)))
			},

			cliadd(int) {
				int.sex = !int.sex
			},
			fanhui() {
				clearInterval(this.setTimeout);
				this.setTimeout = null;
				console.log(this.setTimeout)
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.qipao {
		display: flex;
		margin-top: 30rpx;
		margin-left: 40rpx;
	}

	.font_text {
		color: #9b9b9b;
		font-size: 26rpx;
	}

	.benci {
		width: 30rpx;
		height: 30rpx;
		border-radius: 5rpx;
		margin-top: 10rpx;
		margin-right: 20rpx;
	}

	.head_text {
		color: #999;
		margin-right: 20rpx;
	}

	.charts-box {
		width: 100%;
		height: 500rpx;
		border: 1px solid #f00;
	}

	.background_img {
		width: 120rpx;
		height: 70rpx;
		background-image: url(../../../static/IMG/xiaqipao2.png);
		background-position: 50%;
		background-size: contain;
		text-align: center;
		line-height: 50rpx;
		color: #708dff;
	}

	.back {
		// background-color: #0062CC;
		margin: 50rpx 30rpx 0;
	}

	.head {
		margin: -120rpx 30rpx 0;
		padding: 30rpx;
		height: 160rpx;
		z-index: 666;
		border-radius: 20rpx;
		background-color: #f3f3fb;
	}

	.grzl_box {
		// border: 1px solid #f00;
		height: 200rpx;
		width: 750rpx;
		background-color: #4784f7;
		// padding: @at-root ;

		// float: left;
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
