<template>
	<view class="content">
		<u-sticky offset-top="22rpx">
			<view class="status_bar">
				<view class="top_view"></view>
				<view
					style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; display: flex; height: 100rx; background: #fff;">
					<u-icon @click="fanhui" name="arrow-left" color="#888888" size="24"></u-icon>
					<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
						<h3>监控数据</h3>
					</view>
					<view style="color: #fff;line-height: 75rpx;">

					</view>
				</view>
			</view>
		</u-sticky>
		<view class="grzl_box">
			<view v-for="(v,i) in xinxilist" :key="i"
				style="display: flex; justify-content: space-between border-bottom: #999 1px solid; line-height: 80rpx;padding-bottom: 20rpx; border-bottom: 1px solid #999;"
				@click='gto(v)'>
				<view>
					{{v.title}}
					<view style="width: 650rpx; line-height: 50rpx;">
						<text style="color: #999;font-size: 28rpx;">
							{{valuess}}
						</text>
					</view>
				</view>

				<u-icon name="arrow-right" color="#999" size="18"></u-icon>
			</view>
			<view
				style="display: flex; justify-content: space-between; height: 100rpx; border-bottom: #999 1px solid; line-height: 100rpx;">
				开始时间
				<view style="display: flex;">
					<text @click="openDatetimePicker">{{values||'点击选择开始时间'}}</text>
					<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit" />
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			<view
				style="display: flex; justify-content: space-between; height: 100rpx; border-bottom: #999 1px solid; line-height: 100rpx; ">
				结束时间
				<view style="display: flex;">
					<text @click="openDatetimePickers">{{values1||'点击选择结束时间'}}</text>
					<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit" />
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			<button type="default" style="background-color: #0062CC; color: #fff; margin: 30rpx 0;"
				@click="clisk">显示</button>
		</view>
		<view style="margin-top: 20rpx; padding: 0 30rpx 0;height: 100rpx; background-color: #fff; line-height: 100rpx;"
			v-if="stus">
			{{values||'选择的开始时间'}}-{{values1||'选择的结束时间'}}
		</view>
		<u-empty v-if="stusr" mode="search" icon="http://cdn.uviewui.com/uview/empty/car.png"></u-empty>



<u-loading-icon :show="donghua"></u-loading-icon>










		<view style=" background-color: #fff; float: none; padding: 0rpx 30rpx;" v-if="stus">
			<view v-for="(item,index) in list1" :key="index" style="margin-top: 30rpx; padding-top: 20rpx;">
				<h3 style='margin-top: 40rpx;'>{{item.name}}</h3>

				<!-- 工作状态 -->
				<view v-if="item.id == 'D6'">
					<view
						style="width: 420rpx; padding: 20rpx; opacity: 0.6; background-color: #000; font-size: 30rpx; margin-bottom: -150rpx; border-radius: 20rpx; position: relative;left: 250rpx; top: -130rpx;"
						v-if="show">
						<!-- 阴影框 -->
						<view style="z-index: 999; color: #fff;">
							起始 : {{suastime}}
						</view>
						<view style="z-index: 999;color: #fff;">
							停止 : {{suastimes}}
						</view>
						<view style="z-index: 999;color: #fff;">
							状态 : {{suasname}}
						</view>
					</view>
					<view
						style="display: flex;height: 30rpx;margin: 30rpx 30rpx 50rpx; justify-content: space-between;border-radius: 10rpx;">
						<view v-for="(v,i) in item.list" :key='i'
							:class="v == 1 ? 'one' : (v == 0 ? 'two' : (v == 2 ? 'three' : ''))"
							style="width: 690rpx; height: 30rpx;" @tap="clicktap(v,index,i)">
						</view>
					</view>
					<view
						style="display: flex; justify-content: space-between; padding-bottom: 30rpx; border-bottom: 1px solid #eee;">
						<view style="display: flex;">
							<view
								style="width: 40rpx; height: 40rpx;border-radius: 5rpx;background-color: #4885f7; margin-right: 30rpx;margin-top: 5rpx;">
							</view>
							忙碌
						</view>
						<view style="display: flex;">
							<view
								style="width: 40rpx; height: 40rpx;border-radius: 5rpx;background-color: #81d459; margin-right: 30rpx;margin-top: 5rpx;">
							</view>
							空闲
						</view>
						<view style="display: flex;">
							<view
								style="width: 40rpx; height: 40rpx;border-radius: 5rpx;background-color: #eb6b2c; margin-right: 30rpx;margin-top: 5rpx;">
							</view>
							故障
						</view>
					</view>
				</view>
				<!-- 在线状态 -->
				<view v-if="item.id == 'D2'||item.id == 'D3'||item.id == 'D4'||item.id == 'D5'||item.id == 'D1'"
					style=" border-bottom: 1px solid #eee;">

					<view class="yinying" v-if="show1 && item.id == 'D2'">
						<!-- 阴影框 -->
						<view style="z-index: 999; color: #fff;">
							起始 : {{suastime}}
						</view>
						<view style="z-index: 999;color: #fff;">
							停止 : {{suastimes}}
						</view>
						<view style="z-index: 999;color: #fff;">
							状态 : {{suasname}}
						</view>
					</view>
					<view class="yinying" v-if="show2 && item.id == 'D3'">
						<!-- 阴影框 -->
						<view style="z-index: 999; color: #fff;">
							起始 : {{suastime}}
						</view>
						<view style="z-index: 999;color: #fff;">
							停止 : {{suastimes}}
						</view>
						<view style="z-index: 999;color: #fff;">
							状态 : {{suasname}}
						</view>
					</view>
					<view class="yinying" v-if="show3 && item.id == 'D4'">
						<!-- 阴影框 -->
						<view style="z-index: 999; color: #fff;">
							起始 : {{suastime}}
						</view>
						<view style="z-index: 999;color: #fff;">
							停止 : {{suastimes}}
						</view>
						<view style="z-index: 999;color: #fff;">
							状态 : {{suasname}}
						</view>
					</view>
					<view class="yinying" v-if="show4 && item.id == 'D5'">
						<!-- 阴影框 -->
						<view style="z-index: 999; color: #fff;">
							起始 : {{suastime}}
						</view>
						<view style="z-index: 999;color: #fff;">
							停止 : {{suastimes}}
						</view>
						<view style="z-index: 999;color: #fff;">
							状态 : {{suasname}}
						</view>
					</view>
					<view class="yinying" v-if="show5 && item.id == 'D1'">
						<!-- 阴影框 -->
						<view style="z-index: 999; color: #fff;">
							起始 : {{suastime}}
						</view>
						<view style="z-index: 999;color: #fff;">
							停止 : {{suastimes}}
						</view>
						<view style="z-index: 999;color: #fff;">
							状态 : {{suasname}}
						</view>
					</view>
					<view style="display: flex; padding: 30rpx; 0">
						<view style="display: flex;  margin-right: 30rpx;">
							<view
								style="width: 40rpx; height: 40rpx;border-radius: 5rpx;background-color: #81d459; margin-right: 30rpx;margin-top: 5rpx;">
							</view>
							在线
						</view>
						<view style="display: flex;">
							<view
								style="width: 40rpx; height: 40rpx;border-radius: 5rpx;background-color: #eee; margin-right: 30rpx;margin-top: 5rpx;">
							</view>
							离线
						</view>
					</view>
					<view
						style="display: flex; height: 30rpx;margin: 30rpx 30rpx 50rpx; justify-content: space-between;border-radius: 10rpx;">
						<view style="width: 690rpx; height: 30rpx;" v-for="(val,inx) in item.list"
							:class="val==1?'two':val==0?'eee':''" @tap="clicktaps(val,index,inx ,item.id)">
						</view>
					</view>
				</view>
				<!-- 曲线图 -->
				<view
					v-if="item.id != 'D2'&&item.id != 'D3'&&item.id != 'D4'&&item.id != 'D5' &&item.id != 'D6'&&item.id != 'D1'">
					<view>
						<view style="display: flex; padding: 30rpx; 0">
							<view style="display: flex;  margin-right: 30rpx;">
								<view
									style="width: 40rpx; height: 40rpx;border-radius: 5rpx;background-color: #708dff; margin-right: 30rpx;margin-top: 5rpx;">
								</view>
								<text v-if="item.id == 'D16'">
									
								实时称重(千克)
								</text>
								<text v-if="item.id != 'D16'">实时位移(厘米)</text>
							</view>
						</view>
						<view style="width: 690rpx; height: 500rpx;">
							<qiun-data-charts type="area"
								:opts="{yAxis:{data:[{min:0}]},extra:{area:{type:'curve',addLine:true,gradient:true}}}"
								:chartData="item.chartsDataLine" :echartsH5="true" :echartsApp="true" />
						</view>
					</view>

				</view>

			</view>
			<!-- <u-modal :show="show8" :title="title" :content='content' @confirm="confirmerweima"></u-modal> -->
		</view>
	</view>
</template>

<script>
	import {
		GetDeviceYCHistroyDataBydevno
	} from '@/api/user.js'
	// import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import SimpleDateTimePicker from "@/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";
	export default {
		components: {
			// ruiDatePicker
			SimpleDateTimePicker
		},
		data() {
			return {
				percentage1: 10, // 工作时间进度
				percentage2: 20, // 工作时间进度
				percentage3: 30, // 工作时间进度
				value: '',
				value1: '',
				xinxilist: [{
						title: "监控属性",
						value: "",
						url: './jiankongshuju'
					}

				],
				src: '../../../static/IMG/qipao@2x.png',
				3: '132kg',
				value2: false,

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
				devno: '',
				valuess: "",
				values: '',
				values1: '',
				status: '',
				idname: '',
				list: [],
				stus: false,
				list1: [],
				statusshunxu: [],
				statusshunxu1: [],
				list99: [],
				show8: false,
				title: "",
				content: '',
				chartsDataLine3: {},
				time: [],
				show: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				suastime: '',
				suastimes: '',
				suasname: "",
				startime: '',
				endtime: '',
				stusr: false,
				donghua:false
			}
		},

		onLoad: function(options) {
			console.log(options)
			this.devno = options
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
		onShow() {
			var that = this
			var a = ''
			uni.$on('updateData', function(data) {
				console.log(data.length)
				if (data) {
					if (data.length > 2) {
						that.a = data[0].name + ',' + data[1].name + ',' + data[2].name
						that.idname = data[0].id + ',' + data[1].id + ',' + data[2].id

					} else if (data.length == 2) {
						that.idname = data[0].id + ',' + data[1].id
						that.a = data[0].name + ',' + data[1].name
					} else {
						that.idname = data[0].id
						that.a = data[0].name
					}
					// that.a = data[0].name + data[1].name|| '' + data[2].name || ''
					that.list99 = data
				} else {
					that.list99 = []
				}

			})
			that.valuess = that.a
		},
		onReady() {
			//模拟从服务器获取数据
			this.getServerData()
		},
		methods: {
			clicktap(val, inx, index) {
				var that = this
				var sumber = 0
				for (var i = index; i < this.list1[inx].list.length; i++) {
					if (this.list1[inx].list[i] == val && sumber == 0) {
						that.suastime = that.time[i]
						sumber += 1
					} else if (sumber == 1) {
						that.suastimes = that.time[i] || that.time[i]
						sumber += 1
					}
				}
				this.suasname = val == 0 ? '空闲' : val == 1 ? "忙碌" : '故障'
				this.show = true
				this.show1 = false
				this.show2 = false
				this.show3 = false
				this.show4 = false
				this.show5 = false
			},
			clicktaps(val, inx, index, id) {
				var that = this
				this.show = false
				var sumber = 0
				for (var i = index; i < this.list1[inx].list.length; i++) {
					if (this.list1[inx].list[i] == val && sumber == 0) {
						that.suastime = that.time[i]
						sumber += 1
					} else if (sumber == 1) {
						that.suastimes = that.time[i] || that.time[i]
						sumber += 1
					}
				}

				this.suasname = val == 0 ? '离线' : "在线"
				// console.log(this.time[index])
				if (id == "D2") {
					that.show1 = true
					that.show2 = false
					that.show3 = false
					that.show4 = false
					that.show5 = false
				} else if (id == 'D3') {
					that.show2 = true
					that.show1 = false
					that.show3 = false
					that.show4 = false
					that.show5 = false
				} else if (id == 'D4') {
					that.show3 = true
					that.show2 = false
					that.show1 = false
					that.show1 = false
					that.show4 = false
				} else if (id == 'D5') {
					that.show4 = true
					that.show1 = false
					that.show3 = false
					that.show5 = false
					that.show2 = false
				} else if (id == 'D1') {
					that.show5 = true
					that.show1 = false
					that.show3 = false
					that.show4 = false
					that.show2 = false
				}
			},
			confirmerweima() {
				this.show8 = false
				this.show8 = false
			},
			clisk() {
				// 时间间隔三天
				console.log(this.value,this.value1)
				if (this.value != '' && this.value1 != '') {
					this.donghua = true
					this.GetDeviceYCHistroyDataBydevnowsl()
				} else {
					uni.showToast({
						title: '请选择时间范围',
						duration: 2000,
						icon: 'none'
					});
				}
			},
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
					this.startime = e
					this.values = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`;
					this.value = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`
				} else {
					this.endtime = e
					this.values1 = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`;
					this.value1 = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:00`
					if (this.value1 > this.value && this.startime.year * 1 <= this.endtime.year * 1 && this.startime
						.month * 1 <= this.endtime.month * 1 && this.endtime.day * 1 - this.startime.day * 1 <= 3) {
						console.log(this.startime, this.endtime)
					} else {
						this.value1 = ''
						this.values1 = ''
						uni.showToast({
							title: '最大选择范围为三天,请重选时段',
							duration: 2000,
							icon: 'none'
						});
					}
				}
			},
			change() { // 自动刷新跳转
				if (this.value2) {
					uni.navigateTo({
						url: "./zidongshuxin"
					})
				}
			},
			GetDeviceYCHistroyDataBydevnowsl() {
				var that = this
				// var data = 'devno=2021010001&starttime=2020-12-04 12:37:00&endtime=2021-12-21 18:37:00&jksx=' + this.idname
					var data = 'devno='+this.devno.devno + '&starttime=' + this.value + '&endtime=' + this.value1 + '&jksx=' + this.idname
				GetDeviceYCHistroyDataBydevno(data).then(res => {
					console.log(res.data.list)
					
					if (res.statusCode == 200 && res.data.code == 0) {
						this.donghua = false
						that.stus = true
						if (res.data.list.length >= 1) {
							that.stusr = false
							that.stus = true
							that.time = []
							var num = that.idname.split(',')
							that.list1 = that.list99
							var arr = []
							var a = [],
								b = [],
								c = [],
								d = [];
							res.data.list.forEach((item, index) => {
								for (var key in item) {
									arr.push(item[key])
								}
							})
							var pop = arr.pop()
							var aaa = 0
							var bbb = num.length
							for (let j = 0; j < arr.length; j += num.length + 1) {
								var ccc = arr.slice(aaa, bbb);
								var ddd = arr.slice(aaa - 1, bbb - 1);
								aaa += num.length + 1
								bbb += num.length + 1
								a.push(ccc[0]) //1
								b.push(ccc[1]) //2
								c.push(ccc[2]) // 3
								d.push(ddd[0]) // 3
							}
							d.push(pop)
							d.shift()
							that.time = d
							console.log(a)
							
							that.list1[0].list = a;
							for (var i = 0; i < 4; i++) {
								that.list1[0].chartsDataLine = {
									categories: d,
									series: [{
										name: that.list1[0].name,
										smooth: true,
										data: that.list1[0].list
									}]
								}
							
							}
							that.list1[1].list = b;
							for (var i = 0; i < 4; i++) {
								that.list1[1].chartsDataLine = {
									categories: d,
									series: [{
										name: that.list1[1].name,
										smooth: true,
										data: that.list1[1].list
									}]
								}
							
							}
							that.list1[2].list = c;
							for (var i = 0; i < 4; i++) {
								that.list1[2].chartsDataLine = {
									categories: d,
									series: [{
										name: that.list1[2].name,
										smooth: true,
										data: that.list1[2].list
									}]
								}
							
							}
							console.log(that.time,a,b,c)
							console.log(that.list1.length)
							console.log(that.list1)
						} else {
							console.log(123)
							that.list1 = []
							that.stusr = true
						}



					} else {

					}
				})
			},
			getServerData() {
				this.chartsDataGauge2 = JSON.parse(JSON.stringify(this.Gauge))
				// console.log(JSON.parse(JSON.stringify(this.Gauge)))
			},

			bindChange(e) {
				this.value = e
			},
			bindCancel() {},
			bindChange1(e) {
				this.value1 = e
			},
			bindCancel1() {},
			gto(val) {
				console.log(val)
				uni.navigateTo({
					url: val.url + '?devno=' + this.devno.devno
				})
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
	.u-page {
		&__upload-item {
			margin-top: 5px;
		}
	}

	.yinying {
		width: 380rpx;
		padding: 20rpx;
		opacity: 0.6;
		background-color: #000;
		font-size: 30rpx;
		margin-bottom: -150rpx;
		border-radius: 20rpx;
		position: relative;
		left: 320rpx;
		top: -30rpx;
	}

	.one {
		background-color: #4885f7;
	}

	.two {
		background-color: #81d459;
	}

	.three {
		background-color: #eb6b2c;
	}

	.fore {
		background-color: #ea4338;
	}

	page {
		background-color: #eeeeee;
	}

	.eee {
		background-color: #eeeeee;
	}

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

	.charts-box {
		width: 100%;
		height: 300px;
	}

	.background_img {
		width: 120rpx;
		height: 70rpx;
		background-image: url(../../../static/IMG/qipao@2x.png);
		background-position: 50%;
		background-size: contain;
		text-align: center;
		line-height: 88rpx;
	}

	.back {
		// background-color: #0062CC;
		margin: 50rpx 30rpx 0;
	}

	.head {
		margin: -120rpx 30rpx 0;
		padding: 30rpx;
		height: 230rpx;
		z-index: 666;
		border-radius: 20rpx;
		background-color: #fff;
		// box-shadow:0 0 30rpx 2rpx #d4d5f9
		box-shadow: 0rpx 4rpx 5rpx 3rpx #eaeaea
	}

	.u-percentage-slot {
		padding: 1px 5px;
		background-color: $u-warning;
		color: #fff;
		border-radius: 100px;
		font-size: 10px;
		margin-right: -5px;
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

	.grzl_box {
		background-color: #fff;
		margin-top: 30rpx;
		padding: 20rpx 30rpx 0;
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
