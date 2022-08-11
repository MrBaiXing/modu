<template>
	<view class="content">
		<u-picker :show="show1" :columns="columns" title="选择操作" @confirm="accomplishacc" keyName="label"
			closeOnClickOverlay @cancel="cancel"></u-picker>
		<u-sticky offset-top="22rpx">
			<view class="status_bar">
				<view class="top_view"></view>
				<view
					style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
					<u-icon @click="fanhui" name="arrow-left" color="#8f8f8f" size="24"></u-icon>
					<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
						<h3>设备概况</h3>
					</view>
					<view style="color: #fff;line-height: 75rpx;">

						<u--image :showLoading="true" src="../../static/equipmentStatus/gengduo@2x.png" width="40rpx"
							height="10rpx" style="margin-top: 30rpx;" @click="accomplish"></u--image>

					</view>
				</view>
			</view>
		</u-sticky>
		<view class="grzl_box" v-if="list1.length>0">
			<u-swiper :list="list1" circular indicator height="470rpx" :keyName="'devpic'"></u-swiper>
		</view>
		<view class="grzl_box" v-else style=" display: flex;justify-content: center;">
			<button type="default"
				style=" font-size: 32rpx;width: 200rpx;height: 50rpx;margin-top: 210rpx;line-height: 50rpx;"
				@click="addimgs()">上传图片</button>

		</view>
		<view class="" style=" margin: 30rpx; padding-bottom: 30rpx; border-bottom: 1px solid #f1f1f1;">
			<view class="">
				<h3 style="color: #19BE6B;" v-if="xinxiObj.zaixiantype == 1">在线</h3>
				<h3 style="color: #999;" v-if="xinxiObj.zaixiantype == 0">离线</h3>
			</view>
			<view class="" style="display: flex;justify-content: space-between; margin: 20rpx 0;">
				<h3>{{xinxiObj.devname}}</h3>
				<checkbox-group>
					<label>
						<checkbox value="cb" :checked="xinxiObj.guanzhu == 1" @click="click(xinxiObj.guanzhu)" />
					</label>
				</checkbox-group>
			</view>
			<view class="">
				<text class="style" style="background-color:#d8e2fd;color: #3a6df3;"
					v-if="xinxiObj.guzhangtype == 1 && xinxiObj.baojing == 0">忙碌</text>
				<text class="style" style="background-color:#fdedd9;color: #f4ad56;"
					v-if="xinxiObj.guzhangtype == 2 && xinxiObj.baojing == 0">故障</text>
				<text class="style" style="background-color:#e1f3d8;color: #6cc442;"
					v-if="xinxiObj.guzhangtype == 0 && xinxiObj.baojing == 0">空闲</text>
				<text class="style" style="background-color:#fcd4d2;color: #f0382e;"
					v-if="xinxiObj.baojing == 1">报警</text>
			</view>
			<view class="" style="margin: 12rpx 0;">
				<text style="color: 666;">设备名称 : </text><text>{{xinxiObj.devtype}}</text>
			</view>
			<view class="">
				<text style="color: #666;">位置信息 :
				</text><text>{{xinxiObj.provice+'-'+xinxiObj.city+'-'+xinxiObj.area}}</text>
			</view>
		</view>
		<!-- <view class="addimg">
				:showLoading="true" src="../../static/jiugongge.png" width="40rpx" height="40rpx"
					style="margin-top: 10rpx;" @click="addimgs">
			</view> -->
		<view class="gl_logos">
			<view class="gl_logofor">
				<view v-for="(v,i) in logo" :key="i" style="text-align: center;" @click="clilogo(v)">
					<u--image :showLoading="true" :src="v.img" width="70rpx" height="70rpx"
						style="margin: 0rpx 20rpx 20rpx;" @click="clilogo(v)"></u--image>
					{{v.title}}
				</view>
			</view>
		</view>
		<view class="" style="margin: 25rpx;">
			<view class="">
				<h3>

					位置管理
				</h3>
			</view>
			<view class="" style="margin: 30rpx 0;">
				<text style="color: #666;">设备位置:
				</text><text>{{xinxiObj.provice+'-'+xinxiObj.city+'-'+xinxiObj.area}}</text>
			</view>
			<map v-if="status" :latitude="latitude" :longitude="longitude" :markers="markers" :scale="scale"
				@controltap="controltap" style="width: 700rpx;height:330rpx;">
			</map>
		</view>
		<view style="margin: 30rpx;">
			<view class="" style="color: #15c1ff;">
				<h3>
					基本信息
				</h3>
			</view>
			<view class="ucolllist" v-for="(v,i) in xinxilist" :key="i">
				<text>{{v.title}}</text>
				<view>
					<text v-if="v.title == '所属公司'">{{xinxiObj.gsname}}</text>
					<text v-if="v.title == '设备编号'">{{xinxiObj.devno}}</text>
					<text v-if="v.title == '设备名称'">{{xinxiObj.devname}}</text>
					<text v-if="v.title == '年检时间'">{{xinxiObj.devicedate}}</text>
					<text v-if="v.title == '下次年检时间'">{{xinxiObj.nextdevicedate}}</text>
					<text v-if="v.title == '设备类型'">{{xinxiObj.devtype}}</text>
					<text v-if="v.title == '品牌'">{{xinxiObj.company}}</text>
					<text v-if="v.title == '型号'">{{xinxiObj.devxinghao}}</text>
					<text v-if="v.title == '安装时间'">{{xinxiObj.Created}}</text>
					<text v-if="v.title == '项目名称'">{{xinxiObj.proname}}</text>
					<text v-if="v.title == '项目负责人'">{{xinxiObj.xmfuzeren}}</text>
				</view>
			</view>
		</view>
		<itmister-address-picker ref="addressEl" @confirmChange="confirmChange"></itmister-address-picker>

	</view>
</template>

<script>
	import itmisterAddressPicker from '@/components/itmister-address-picker/itmister-address-picker.nvue'

	import {
		UpdateDeviceInfoDataByID,
		GetDevicePhotoDataBydevno,
		GetDeviceListDataByID,

		UpdateDeviceGuanZhuData
	} from '@/api/user.js'
	export default {
		components: {
			itmisterAddressPicker
		},
		data() {
			return {
				status: true,
				checked: [],
				show: false,
				show1: false,
				latitude: '', //纬度
				longitude: '', //经度
				scale: 10, //缩放级别
				columns: [
					[{
						label: '添加图片',
						// 其他属性值
						url: './common/uploadingImg'
						// ...
					}, {
						label: '编辑基本信息',
						url: './common/addmokuai'
					}, {
						label: '设置数据自动刷新',
						url: './list/zidongshuxin'
					}]
				],
				markers: [],
				list1: [],
				xinxilist: [{
						title: "设备编号"
					},
					{
						title: "设备名称"
					},
					{
						title: "年检时间"
					},
					{
						title: "下次年检时间"
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
					{
						title: "所属公司"
					},
					{
						title: "项目名称"
					},
					{
						title: "项目负责人"
					},
				],
				logo: [{
						title: "实时数据",
						img: "../../static/equipmentStatus/shishi@2x.png",
						url: "./list/shishishuju"
					},
					{
						title: "监控数据",
						img: "../../static/equipmentStatus/jiankong@2x.png",
						url: "./list/monitoring"
					},
					{
						title: "报警信息",
						img: "../../static/equipmentStatus/bbaojing@2x.png",
						url: './list/baojingxinxi'
					},
					{
						title: "设备日志",
						img: "../../static/equipmentStatus/rizhi@2x.png",
						url: './list/shebeirizhi'
					},
					{
						title: "设备组态",
						img: "../../static/equipmentStatus/zutaai@2x.png"
					}
				],
				xinxiObj: {},
				id: '',
				devno: '',
				option: {},
				quanxian:[]
			}
		},
		onLoad: function(option) {
			this.quanxian = uni.getStorageSync('lists')
			var a = []
			if(this.quanxian[0].usertype == 1){
				a = this.xinxilist.splice(this.xinxilist.length-2);//清空数组 
			}else if(this.quanxian[0].usertype == 2){
				a = this.xinxilist.splice(this.xinxilist.length-3);//清空数组
				// this.xinxilist.splice(2,1)
			}
			console.log(this.xinxilist)
			this.option = option
			this.id = option.index
			this.devno = option.devno
			this.GetDeviceListDataByIDwsl(option.index)
			this.GetDevicePhotoDataBydevnowsl(option.devno)
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
			this.quanxian = uni.getStorageSync('lists')
			var a = []
			if(this.quanxian[0].usertype == 1){
				a = this.xinxilist.splice(this.xinxilist.length-2);//清空数组 
			}else if(this.quanxian[0].usertype == 2){
				a = this.xinxilist.splice(this.xinxilist.length-3);//清空数组
				// this.xinxilist.splice(2,1)
			}
			this.id = this.option.index
			this.devno = this.option.devno
			this.GetDeviceListDataByIDwsl(this.option.index)
			this.GetDevicePhotoDataBydevnowsl(this.option.devno)
		},
		methods: {
			GetDeviceListDataByIDwsl(id) {
				var data = 'devid=' + id
				GetDeviceListDataByID(data).then(res => {
					var b = '',
						c = '';
						console.log(res)
					if (res.statusCode == 200 && res.data.code == 0) {
						// that.itemArr[inx] = res.data.list
						this.xinxiObj = res.data.list[0]
						var s = this.xinxiObj.devicedate.split(' ')
						var n = this.xinxiObj.Created.split(' ')
						var m = this.xinxiObj.nextdevicedate.split(' ')
						this.xinxiObj.devicedate = s[0]
						this.xinxiObj.Created = n[0]
						this.xinxiObj.nextdevicedate = m[0]
						var a = res.data.list[0].coordinate.split(',')
						this.latitude = a[1]
						this.longitude = a[0]
						if (res.data.list[0].baojing == 1) {
							c = '../../static/IMG/overview/baojing@3x.png'
						} else {
							if (res.data.list[0].zaixiantype == 1) {
								c = '../../static/IMG/overview/zaixian@3x.png'
							} else if (res.data.list[0].zaixiantype == 0) {
								c = '../../static/IMG/overview/lixian@3x.png'
							}
						}
						this.markers[0] = {
							id: res.data.list[0].ID,
							latitude: a[1],
							longitude: a[0],
							iconPath: c,
							rotate: 0, // 旋转度数
							width: 10, //宽
							height: 20, //高
							title: res.data.list[0].devaddress, //标注点名
							alpha: 0.5, //透明度
							devno: res.data.list[0].devno,
							zaixiantype: res.data.list[0].zaixiantype,
							baojing: res.data.list[0].baojing
						}
						// that.GetDeviceListDatas(this.indexs)
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			GetDevicePhotoDataBydevnowsl(devno) {
				var that = this
				var data = 'devno=' + devno
				GetDevicePhotoDataBydevno(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						that.list1 = res.data.list
						for (let i = 0; i < that.list1.length; i++) {
							that.list1[i].devpic = getApp().globalData.url + that.list1[i].devpic
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
			UpdateDeviceGuanZhuDatawsl(id) {
				var that = this
				if (id == 1) {
					id = 0
				} else if (id == 0) {
					id = 1
				}
				var data = 'devid=' + this.id + '&type=' + id
				UpdateDeviceGuanZhuData(data).then(res => {
					console.log(data, res)
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
			checkboxChange(n) {
				console.log('change', n);
			},
			clilogo(val) {
				if (val.title === '实时数据') {
					uni.navigateTo({
						url: val.url + '?name=' + this.xinxiObj.devname + '&guzhangtype=' + this.xinxiObj
							.guzhangtype + '&baojing=' + this.xinxiObj.baojing + '&time=' + this.xinxiObj.Created +
							'&dizhi=' + this.xinxiObj.provice + '-' + this.xinxiObj.city + '-' + this.xinxiObj
							.area + '&devno=' + this.devno
					})
				} else {

					uni.navigateTo({
						url: val.url + '?devno=' + this.devno + '&id=' + this.id + '&name=' + this.xinxiObj.devname
					})
				}
			},
			controltap(e) {
				console.log(e)
			},
			markertap(e) {
				uni.setStorageSync('devname', this.markers[0].devno);
				uni.switchTab({
					url: '/pages/overview/overview'
				});
			},
			// 确认选中
			confirmChange(address) {
				this.xinxilist[2].value = address.province + '-' + address.city + '-' + address.area;
				this.show = false
			},
			selectAddress(inx) {
				this.$refs.addressEl.show();
			},
			addimgs() {
				let a = {
					list: this.list1
				}

				let items = JSON.stringify(a.list)
				uni.navigateTo({
					url: './uploadingImg?devno=' + this.devno
				})
			},
			click(e) {
				this.UpdateDeviceGuanZhuDatawsl(e)
				console.log('click', e);
			},
			accomplishacc(e) {
				this.show1 = false
				this.status = true
				uni.navigateTo({
					url: e.value[0].url + '?devno=' + this.devno + '&id=' + this.id
				})
			},
			cancel() {
				this.show1 = false
				this.status = true
			},
			accomplish() {
				this.status = false
				this.show1 = true
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
	.style {
		// display: inline-block;
		padding: 6rpx 20rpx;
		border-radius: 5rpx;
		font-size: 30rpx;
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

	.gl_logofor {
		// width: 150rpx;
		// height: 150rpx;
		// border: 1px solid #f00;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.gl_logos {
		font-size: 28rpx;
		// border: 1px solid #000;
		margin: 20rpx 30rpx;

	}

	.uni-margin-wrap {

		height: 100%;
		margin: 0 0upx;
	}

	.addimg {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		background-color: #999;
		display: flex;
		justify-content: center;
		position: absolute;
		right: 20rpx;
		top: 170rpx;
		opacity: 0.8;
		z-index: 9999;
	}

	.grzl_box {
		height: 470rpx;
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
