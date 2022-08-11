<template>
	<view class="content">

		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="box_head">

			<view class="click_erweima">
				<u-input placeholder="搜索设备编号 名称" prefixIcon="search" clearable prefixIconStyle="font-size: 22px;color: #909399;"
					v-model='value' @confirm='confirmvalue'>
				</u-input>
			</view>
			<view class="head_img">
				<u-image width="50rpx" height="50rpx" :src="src.erweima" @click="codeCli"></u-image>
			</view>

		</view>
		<view style=" display: flex;justify-content: center;">
			<map :latitude="latitude" :longitude="longitude" :markers="markers" :scale="scale" @controltap="controltap"
				@markertap="markertap" :controls="controls" @tap="top" style="width: 750rpx;height:1420rpx;">

			</map>
		</view>
	</view>
</template>

<script>
	import {
		GetDeviceListData,
		GetCompanyListDataByProject,
	} from '@/api/user.js'
	export default {
		data() {
			return {
				value: '',
				status: false,
				examinationTypeArray: [
					[]
				],
				examinationTypeIndex: 0,
				src: {
					erweima: '../../static/IMG/overview/saoma@2x.png',
				},
				// goods: [] // 数据列表
				controls: [{
					//在地图上显示控件，控件不随着地图移动
					id: 1, //控件id
					iconPath: '../../static/IMG/overview/shuaxin@2x.png', //显示的图标
					position: { //控件在地图的位置
						left: 30,
						top: 30,
						width: 40,
						height: 40
					},
				}],
				latitude: '', //纬度
				longitude: '', //经度
				scale: 12, //缩放级别

				markers: [],
				devno: "",
				devname: "",
				gsno: "",
				xmno: '',
				list: [],
				imglist: [],
				sta: false,
				childParams: '',
				title:''
			}
		},
		onLoad(options) {
			const vm = this;
			const subNVue = uni.getSubNVueById('nav');
			subNVue.hide();
			// 接收信息的页面(子窗体向父窗体传递参数)
			uni.$on('nav', (data) => {
				console.log(data)
				if (data.id) {

					uni.navigateTo({
						url: '../index/overview?index=' + data.id + '&devno=' + data.devno
					})
				}

			});
			this.devname = uni.getStorageSync('devname') || ''
			this.xmno = uni.getStorageSync('xmno')
			// this.GetCompanyListDataByProjects(this.xmno)
		},
		onShow(options) {
			this.devname = uni.getStorageSync('devname') || ''
			this.xmno = uni.getStorageSync('xmno')
			this.GetCompanyListDataByProjects(this.xmno)
			// this.GetDeviceListDatawsl('')
		},
		methods: {

			openWindows() {
				console.log(this.list)
				var arr = this.list
				const subNVue = uni.getSubNVueById('nav');
				uni.$emit('nav', {
					type: 'param',
					content: arr
				})
				// 1:子窗体从顶部进入（动画效果）, 2:显示原生子窗体的动画持续时间
				// subNVue.show('slide-out-top', 250);
			},

			top() {
				const subNVue = uni.getSubNVueById('nav');
				subNVue.hide(); 
			},

















			boolrens(inx) {
				console.log(123)
				this.list.status = !this.list.status
				// this.boolren = !this.boolren
			},
			GetDeviceListDatawsl() {
				var that = this
				var data = 'xmno=' + this.xmno + '&devname=' + this.devname + '&gsno=' + this.gsno +
					'&guanzhutype=&zaixiantype=&baojingtype=';
				GetDeviceListData(data).then(res => { // 请求
					if (res.statusCode == 200 && res.data.code == 0) {
						uni.removeStorageSync('devname')
						that.devname = ""
						that.gsno = ""
						that.list = res.data.list
						that.openWindows()
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			controltap(e) { // 刷新组件
				this.GetCompanyListDataByProjects(this.xmno)
				console.log(e)
			},
			confirmvalue() { // 搜索框
				this.devname = this.value
				this.GetDeviceListDatawsl()
			},
			markertap(e) { // 点击内容

				var clickmarkerId = e.detail.markerId
				var that = this
				for (let i = 0; i < this.markers.length; i++) {
					if (this.markers[i].id == clickmarkerId) {
						that.gsno = that.markers[i].id
						that.GetDeviceListDatawsl()
					} else {
					}
				}
				// this.status = true
			},
			GetCompanyListDataByProjects(val) {
				var that = this
				var data = 'xmno=' + val + '&isAll=1';
				GetCompanyListDataByProject(data).then(res => { // 请求
					console.log(res)
					var a = {}
					var b = ''
					var arr = []
					if (res.statusCode == 200 && res.data.code == 0) {
						that.markers = []
						for (let i = 0; i < res.data.list.length; i++) {
							b = res.data.list[i].coordinate.split(',')
							arr.push({
								id: res.data.list[i].gsno,
								latitude: b[1],
								longitude: b[0],
								iconPath: '../../static/IMG/overview/zaixian@3x.png',
								width: 10, //宽
								height: 20, //高
								title: res.data.list[i].address, //标注点名
								title: res.data.list[i].address, //标注点名
								label: { //为标记点旁边增加标签   //因背景颜色H5不支持
									content: res.data.list[i].gsname, //文本
									color: 'red', //文本颜色
									fontSize: 24, //文字大小
									x: 5, //label的坐标，原点是 marker 对应的经纬度
									y: 1, //label的坐标，原点是 marker 对应的经纬度 
									borderWidth: 12, //边框宽度
									borderColor: 'pink', //边框颜色    
									borderRadius: 20, //边框圆角                        
									bgColor: 'black', //背景色
									padding: 5, //文本边缘留白
									textAlign: 'right' //文本对齐方式。
								},
								callout: { //自定义标记点上方的气泡窗口 点击有效  
									content: res.data.list[i].provice + res.data.list[i].city + res.data.list[i].area, //文本
									color: '#000', //文字颜色
									fontSize: 14, //文本大小
									borderRadius: 2, //边框圆角
									bgColor: '#00c16f', //背景颜色
									display: 'ALWAYS', //常显
								},
							})
						}
							that.markers = arr
						that.markers.forEach(item => that.imglist.push(item.iconPath))
						that.latitude = that.markers[0].latitude * 1
						that.longitude = that.markers[0].longitude * 1
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})
			},
			examinationType(e) {
				this.examinationTypeIndex = e.target.value;
				this.gsno = this.examinationTypeArray[e.target.value].gsno
				this.GetDeviceListDatawsl('')
			},
			codeCli() {
				var that = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						that.value = res.result
					}
				});
			},
			search(e) {
				console.log(123, e)
			},
			getSearch() {
				console.log(123)

			},

		},

	}
</script>

<style lang="scss">
	.click_erweima {}

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

	.font_s {
		text {
			font-size: 26rpx;
		}
	}


	.box1 {
		color: #999;
		height: 80rpx;
		display: flex;
		justify-content: center;

		.head_text_box {
			height: 80rpx;
			line-height: 80rpx;
		}
	}

	.box_head {
		width: 100%;
		display: flex;
		// border: 1px solid #FF0000;
		justify-content: space-between;

		.click_erweima {
			// border: 1px #fff solid;
			margin: 0rpx 10rpx 0 30rpx;
			float: right;
			display: block;
		}

		.head_img {
			margin: 15rpx 30rpx 0;
		}

	}

	.fachead {
		text-align: center;
		padding: 20rpx;
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #fff;
		top: 70rpx;
		z-index: 999;
		display: flex;
		// justify-content: center;

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
