<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- 头 -->
		<u-sticky offset-top="22">
			<!-- <text>塞下秋来风景异，衡阳雁去无留意</text> -->
			<view class="box_head">
				<view class="head_img">
					<u-image width="50rpx" height="50rpx" :src="src.logo" shape="circle"></u-image>
				</view>
				<view class="click_erweima">
					<u-input placeholder="搜索设备编号 名称" prefixIcon="search"
						prefixIconStyle="font-size: 22px;color: #909399;" clearable v-model="devname" @confirm="confirms" @change="changesss" @clear="clear">

					</u-input>
				</view>
				<view class="" style="margin: 15rpx 0 0 10rpx;">
					<u-image width="50rpx" height="50rpx" :src="src.erweima" @click="codeCli"></u-image>
				</view>
				<view class="head_img" style="margin-top: 15rpx;">
					<u-image width="40rpx" height="50rpx" :src="src.xinxi" @click="xiaoxiurl"></u-image>
				</view>
				<!-- <u-badge :isDot="true" :show="xiaoxistatus" type="error"> -->
				<u-badge :isDot="true" type="error " :show="xiaoxistatus"
					style="position: relative;left: -40rpx;height: 14rpx;width: 20rpx; top: 8rpx;"></u-badge>
			</view>
		</u-sticky>
		<view class="" style=" background-color: #fff; border: 1px solid #fff;">


			<view class=" box1">

				<view class="head_text">
					<view class="head_text_box">
						<picker @change="bindPickerChange" :range="columns" :range-key="'proname'" @cancel="cancels">
							<label class=""
								style="font-size: 40rpx; margin-right: 10rpx;">{{columns[indexs].proname}}</label>
							<u-icon name="../../static/IMG/index/qiehuan@2x.png" color="#fff" width="15" height="10"
								v-if="icon" @click="cliicon"
								style="float: right; display: inline-block;margin-top: 6rpx;"></u-icon>
							<u-icon name="../../static/IMG/index/shouqi2.png" color="#fff" width="15" height="10"
								v-if="!icon" @click="cliicon"
								style="float: right; display: inline-block;margin-top: 6rpx;"></u-icon>
						</picker>
					</view>

				</view>
				<view style="display: flex;justify-content: center;margin-top: 20rpx;">
					共{{total.totaldevice}}个设备
				</view>
				<view style="margin: 60rpx 30rpx 30rpx; display: flex;justify-content: space-between;">
					<view style="text-align: center; width: 100rpx;">
						<view style="font-size: 40rpx;">
							{{total.zaixiandevice}}
						</view>
						<view style="font-size: 26rpx;opacity: 0.7;">
							在线
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<u-line direction="col" color="#fff" length="60% " style="opacity: 0.5;"></u-line>
					</view>
					<view style="text-align: center; width: 100rpx; ">
						<view style="font-size: 40rpx;">
							{{total.lixiandevice}}
						</view>
						<view style="font-size: 26rpx;opacity: 0.7;">
							离线
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<u-line direction="col" color="#fff" length="60% " style="opacity: 0.5;"></u-line>
					</view>
					<view style="text-align: center;  width: 100rpx;">
						<view style="font-size: 40rpx;">
							{{total.guzhangdevice}}
						</view>
						<view style="font-size: 26rpx;opacity: 0.7;">
							故障
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<u-line direction="col" color="#fff" length="60% " style="opacity: 0.5;"></u-line>
					</view>
					<view style="text-align: center; width: 100rpx;">
						<view style="font-size: 40rpx;">
							{{total.baojingdevice}}
						</view>
						<view style="font-size: 26rpx;opacity: 0.7;">
							报警
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: left;">
			<u-tabs :list="list1" @click="click" style="background-color: #fff;">

			</u-tabs>
			<u-sticky offset-top="67rpx">
				<dropdown-screen @finish="customClick" :itemArr='itemArr' :listArr='listArr'
					@customClick="customClicks">
				</dropdown-screen>

			</u-sticky>
			<view>
				<u-empty v-if="datalist.length == 0" mode="data" icon="http://cdn.uviewui.com/uview/empty/car.png">
				</u-empty>
				<!-- 关注设备 -->
				<view class="myattention" v-for="(v,i) in datalist" :key='i'>
					<view class="myattention_box">
						<view style="border-radius: 20rpx; width: 180rpx; height: 180rpx;">
							<u-image width="180rpx" height="180rpx" shape="square" radius="20rpx" v-if="v.devpic"
								@click="addover(v)" :src="url + v.devpic"></u-image>
							<u-image width="180rpx" height="180rpx" shape="square" radius="20rpx" v-else
								@click="addover(v)" :src="src.logo"></u-image>
							<view style="position: relative; float: right; top: -40rpx;">
								<!-- <u-image width="40rpx" height="40rpx" :src="src.yiguanzhu"></u-image> -->
								<u-image width="40rpx" height="40rpx" v-if="v.guanzhu == 1" :src="src.yiguanzhu"
									@click="guanzhu(v,0)"></u-image>
								<u-image width="40rpx" height="40rpx" v-if="v.guanzhu == 0" :src="src.jiaguanzhu"
									@click="guanzhu(v,1)"></u-image>
							</view>
						</view>

						<view class="myattention_list_b">

							<view style="display: flex;justify-content: space-between;" @click="addover(v)">
								<text style="font-weight:bold">{{v.devno}}</text>
								<text class="style" style="background-color:#d8e2fd;color: #3a6df3;"
									v-if="v.guzhangtype == 1 && v.baojing == 0">忙碌</text>
								<text class="style" style="background-color:#fdedd9;color: #f4ad56;"
									v-if="v.guzhangtype == 2 && v.baojing == 0">故障</text>
								<text class="style" style="background-color:#e1f3d8;color: #6cc442;"
									v-if="v.guzhangtype == 0 && v.baojing == 0">空闲</text>
								<text class="style" style="background-color:#fcd4d2;color: #f0382e;"
									v-if="v.baojing == 1">报警</text>
							</view>
							<view class="fff" style="line-height: 50rpx;" v-if="v.zaixiantype == 1" @click="addover(v)">
								在线</view>
							<view class="black" style="line-height: 50rpx;" v-if="v.zaixiantype == 0"
								@click="addover(v)">离线</view>
							<view class="font_s" @click="addover(v)"><text class="mag_rig">设备名称 :
								</text><text>{{v.devname}}</text></view>
							<view class="font_s"><text class="mag_rig">位置信息 :</text>
								<text @click="boolrens(i)" style="color: #007AFF;"
									v-if="v.status == 0">{{v.provice}}-{{v.city}}-{{v.area}}</text>
								<text @click="boolrens(i)" style="color: #007AFF;"
									v-if="v.status == 1">{{v.coordinate}}</text>
							</view>
						</view>

					</view>

				</view>
			</view>
		</view>
		<u-modal :show="show8" :title="title" :content='content' @confirm="confirmerweima"></u-modal>
	</view>
</template>

<script>
	import dropdownScreen from '@/components/dropdown-screen/dropdown-screen'
	import tab from '@/components/lipan-tabs/lipan-tabs.vue';
	import tabPane from '@/components/lipan-tabs/lipan-tab-pane.vue';
	import {
		GetDeviceTongJi,
		GetDict00ByType,
		GetDeviceListData,
		GetCompanyListDataByProject,
		GetProJectListDataByUser,
		UpdateDeviceGuanZhuData,
		GetXiaoXiData,
	} from '@/api/user.js'
	export default {
		components: {
			dropdownScreen,
			tab,
			tabPane
		},
		data() {
			return {
				boolren: true,
				url: '',
				indexs: 0,
				status: true,
				show: false, // 头部下拉列表
				index: '', // 头部文字
				src: {
					erweima: '../../static/IMG/index/saoma@2x.png',
					logo: '../../static/IMG/logo/logo.png',
					xinxi: '../../static/IMG/index/xiaoxi@2x.png',
					wu: '../../static/wu.png',
					jingshi: '../../static/jingshi.png',
					jinggao: '../../static/jinggao.png',
					cpu: '../../static/CPU.png',
					tishi: '../../static/tishi.png',
					danxuan: '../../static/danxuan.png',
					yiguanzhu: '../../static/IMG/index/yiguanz@2x.png',
					jiaguanzhu: '../../static/IMG/equipment/jiaguanzhu@2x.png',
				},
				columns: [
					[]
				],
				listArr: ['所在公司', '在线状态', '报警状态'],
				itemArr: [
					[{}, {}, {}],
					[],
					[]
				],
				list1: [{
					name: '关注设备',
				}, {
					name: '全部设备',
				}],
				total: {},
				sum: 'dt0004A',
				xialabiao: 1,
				datalist: [],
				devno: "",
				devname: "",
				guanzhutype: 1,
				gsno: "",
				guzhangtype: '',
				zaixiantype: '',
				baojingtype: '',
				xmno: '',
				icon: true,
				show8: false,
				title: '',
				content: '',
				xiaoxistatus: false
			}
		},
		onLoad: function(options) {
			console.log(456)
			this.url = getApp().globalData.url
			this.index = uni.getStorageSync('lists')[0].username
			this.xmno = uni.getStorageSync('lists')[0].xmno.split(',')
			this.device(this.xmno[0])
			this.GetProJectListDataByUsers()
			this.GetDict00ByTypes('dt0004A', 1)
			this.GetDict00ByTypes('dt0005A', 2)
			this.GetDeviceListDatas(0)
			this.GetXiaoXiDatas(0)
			this.GetXiaoXiDatas(1)
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onShow() {
			this.url = getApp().globalData.url
			this.index = uni.getStorageSync('lists')[0].username
			this.xmno = uni.getStorageSync('lists')[0].xmno.split(',')
			this.device(this.xmno[this.indexs])
			this.GetProJectListDataByUsers()
			this.GetDict00ByTypes('dt0004A', 1)
			this.GetDict00ByTypes('dt0005A', 2)
			this.GetDeviceListDatas(this.indexs)
			this.GetXiaoXiDatas(0)
			this.GetXiaoXiDatas(1)
		},
		onPullDownRefresh() {
			this.device(this.xmno[this.indexs])
			this.GetProJectListDataByUsers()
			this.GetDict00ByTypes('dt0004A', 1)
			this.GetDict00ByTypes('dt0005A', 2)
			this.GetDeviceListDatas(this.indexs)
			this.GetXiaoXiDatas(0)
			this.GetXiaoXiDatas(1)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			changesss(e){
				console.log(e)
				if(e){
					
				}else{
					
				this.GetDeviceListDatas(0)
				}
			},
			clear(){
				console.log(123)
			},
			GetXiaoXiDatas(val) {
				var that = this
				var data = 'type=' + val + '&starttime=&endtime=&bjyzx=&bjtype=&bjopen=';
				GetXiaoXiData(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						res.data.list.forEach(item => {
							if (item.status == 0) {
								that.xiaoxistatus = true
							} else {
								that.xiaoxistatus = false
							}
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
			boolrens(inx) {
				this.datalist[inx].status = !this.datalist[inx].status
			},
			cliicon() {
				this.icon = false
			},
			//下拉框
			bindPickerChange(e) { //改变的事件名
				this.icon = true
				this.indexs = e.target.value
				this.GetDeviceListDatas(this.indexs)
				uni.setStorageSync('xmno',this.columns[e.target.value].xmno);
				
				this.GetCompanyListDataByProjects(this.indexs)
			},
			cancels() {
				this.icon = true
			},
			confirms() {
				this.GetDeviceListDatas(this.indexs)
			},
			guanzhu(val, inx) {
				var that = this
				if (inx == 1) {
					var data = 'devid=' + val.ID + '&type=1'
					UpdateDeviceGuanZhuData(data).then(res => {
						if (res.statusCode == 200 && res.data.code == 0) {
							that.GetDeviceListDatas(this.indexs)
						} else {
							// uni.showToast({
							// 	title: res.data.msg,
							// 	duration: 2000,
							// 	icon: 'none'
							// });
						}
					})
				} else if (inx == 0) {
					var data = 'devid=' + val.ID + '&type=0 '
					UpdateDeviceGuanZhuData(data).then(res => {
						if (res.statusCode == 200 && res.data.code == 0) {
							that.GetDeviceListDatas(this.indexs)
						} else {
							// uni.showToast({
							// 	title: res.data.msg,
							// 	duration: 2000,
							// 	icon: 'none'
							// });
						}
					})
				}
			},
			xiaoxiurl() {
				uni.navigateTo({
					url: '../my/news/message'
				})
			},
			GetDict00ByTypes(val, inx) {
				var that = this;
				var data = 'type=' + val;
				GetDict00ByType(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
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
			GetDeviceListDatas(inx) {
				var that = this
				var data = 'xmno=' + this.xmno[inx] + '&devno=' + this.devno + '&devname=' + this
					.devname + '&gsno=' + this.gsno + '&guanzhutype=' + this.guanzhutype + '&zaixiantype=' + this
					.zaixiantype + '&baojingtype=' + this.baojingtype;
				GetDeviceListData(data).then(res => { // 请求
					this.device(this.xmno[inx])
					// console.log(res.data.list)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.datalist = res.data.list
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			device(inx) {
				var that = this;
				var data = 'xmno=' + inx;
				GetDeviceTongJi(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						that.total = res.data.list
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})

			},
			click(item) {
				if (item.index == 0) {
					this.guanzhutype = 1
					this.GetDeviceListDatas(this.indexs)
				} else if (item.index == 1) {
					this.guanzhutype = ''
					this.GetDeviceListDatas(this.indexs)
				}
			},
			customClicks(val) {

			},
			customClick(val) {
				if (val.$value == 1) { // 在线状态
					this.zaixiantype = this.itemArr[1][val.$index].id
					this.GetDeviceListDatas(this.indexs)
				} else if (val.$value == 2) {
					this.baojingtype = this.itemArr[2][val.$index].id
					this.GetDeviceListDatas(this.indexs)
				} else if (val.$value == 0) {
					this.gsno = this.itemArr[0][val.$index].gsno
					this.GetDeviceListDatas(this.indexs)
				}
			},
			codeCli() {
				var that = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						that.devname = res.result
					}
				});
			},
			confirmerweima() {
				this.show8 = false
			},
			addover(val) {
				uni.navigateTo({
					url: './overview?index=' + val.ID + '&devno=' + val.devno
				})
			},
			change(e) {},
			close() {
				this.show = false
			},
			confirm(e) {
				this.index = e.value[0].proname
				this.show = false
			},
			cancel() {
				this.show = false
			},
			GetProJectListDataByUsers() {
				var that = this
				var data = ''
				GetProJectListDataByUser(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						that.columns = res.data.list
						that.GetCompanyListDataByProjects(this.indexs)
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			GetCompanyListDataByProjects(inx) {
				var that = this
				var data = 'xmno=' + this.columns[inx].xmno;
				uni.setStorageSync('xmno', this.columns[inx].xmno)
				GetCompanyListDataByProject(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						that.itemArr[0] = res.data.list

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
	@import "uview-ui/index.scss";

	.font_s {
		text {
			font-size: 26rpx;
		}
	}

	.content {
		background-color: #d2d2d2;

		background-image: -webkit-gradient(linear, 0 0, 0 1200rpx, from(#fff), to(#eeeeee));

		background-image: -moz-linear-gradient(#fff, #eeeeee);

		background-image: -o-linear-gradient(#fff, #eeeeee);

		background-image: linear-gradient(#fff, #eeeeee);
	}

	.style {
		display: inline-block;
		padding: 6rpx 20rpx;
		border-radius: 5rpx;
		font-size: 30rpx;
	}

	.black {
		color: #999;
	}

	.fff {
		color: #68c23d;
	}

	.box1 {
		// border: 1px solid #f00;

		margin: 30rpx;
		height: 330rpx;
		border-radius: 20rpx;
		background-color: #447ef6;
		color: #fff;

		.head_text {
			// border: 1px solid #f00;
			// margin: 50rpx 30rpx;
			// width: 700rpx;
			display: flex;
			justify-content: center;

			.head_text_box {
				display: flex;
				justify-content: center;
				// border: 1px #000 solid;
				// margin-left: 50rpx;
				margin-top: 30rpx;

				text {
					font-size: 30rpx;
					line-height: 50rpx;
				}
			}

		}

		.text {
			display: inline-block;
			height: 80rpx;
			border-left: 1rpx solid #fff;
			margin-top: 25rpx;
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #F8F8F8;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #ffffff;
		top: 0rpx;
		z-index: 999;
	}

	// 我的关注
	.myattention {
		// width: 100%;
		// border: 1px solid #ff0004;
		margin: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;

		.myattention_box {
			// border: 1px solid #000;
			// margin: 0 30rpx;
			padding: 30rpx;
			display: flex;

			.myattention_list_b {
				width: 570rpx;
				margin-left: 30rpx;

				.font_s {
					font-size: 28rpx;
				}

				.mag_rig {
					color: #999;
				}


			}
		}
	}

	// 头
	.box_head {
		width: 100%;
		display: flex;
		// border: 1px solid #000;
		justify-content: space-between;
		background-color: #fff;
		padding: 10rpx 0;

		.click_erweima {
			// border: 1px #fff solid;
			margin: 0rpx 10rpx 0;
			float: right;
			display: block;
		}

		.head_img {
			margin: 20rpx 30rpx 0;
		}

	}

	page {
		background-color: #eeeeee;
	}
</style>
