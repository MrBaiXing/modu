<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<u-sticky offset-top="22">
			<view
				style="width: 100%; margin: 0rpx 0rpx 0 ;padding: 0 20rpx; color: #fff;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#999" size="24" style="width: 100rpx;"></u-icon>
				<view
					style="line-height: 75rpx; text-align: center; width: 500rpx;display: flex; justify-content: center;">
					<!-- <u-tabs :list="list" @click="click" style="background-color: #fff;"></u-tabs> -->
					<view class="" style=" color: #000000; display: flex;" :class="status?'backgroundsty':''"
						@click="edittitle(1)">
						消息
					</view>
					<u-badge :type="type" max="99" :value="value"
						style="height: 27rpx; position: relative; left: -10rpx;"></u-badge>
					<u-badge :type="type" max="99" :value="value1"
						style="height: 27rpx; position: relative; left: 190rpx;"></u-badge>
					<view class="" style="color: #000000; display: flex; margin-left: 100rpx;"
						:class="!status?'backgroundsty':''" @click="edittitle(2)">
						公告
					</view>
				</view>
				<view class="" style="color: #000000; font-size: 30rpx; margin-top: 20rpx;" @click="yidu">
					全部已读
				</view>
			</view>
		</u-sticky>
		<u-empty v-if="status&&titlist.length == 0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
		</u-empty>
		<view class="grzl_box" v-if="status" v-for="(v,i) in titlist" :key="i" @click="editbadge(v,0)">

			<view style="display: flex;justify-content: space-between;">
				<view class="">
					{{'设备报警 通知(' + v.devno + ')'}}
				</view>
				<u-badge :isDot="true" :show="v.status == 0" type="error">
				</u-badge>
			</view>
			<view class="font-xiao">{{v.Created}}</view>
			<view class="font-color">{{'你关注的设备在' + v.bjtime + '发生报警'}}</view>
			<view class="font-color">{{'设备编号: '+ v.devno}}</view>
			<view class="font-color">{{'设备名称: ' + v.devname}}</view>
		</view>
		<u-empty v-if="!status&&titlists.length == 0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
		</u-empty>
		<view class="grzl_box" v-if="!status" v-for="(v,i) in titlists" :key="i" @click="editbadge(v,1)">
			<view style="display: flex;justify-content: space-between;">
				<view> {{v.title}}</view>
				<u-badge :isDot="true" :show="v.status == 0" type="error">
				</u-badge>
			</view>
			<view class="font-xiao">{{v.Created}} <text style="margin-left: 30rpx;">{{v.zuozhe}}</text></view>
			<view class="font-color">{{v.content}}</view>
		</view>

	</view>
</template>

<script>
	import {
		GetXiaoXiData,
		SetXiaoXiReadByUser
	} from '@/api/user.js'
	export default {
		data() {
			return {
				status: true,
				titlist: [{}],
				titlists: [{}],
				list: [{
					name: '消息',
				}, {
					name: '公告',
				}],
				type: "error",
				value: '',
				value1: '',
				val: ''
			}
		},
		onLoad: function(options) {
			this.GetXiaoXiDatas(0)
			this.GetXiaoXiDatass(1)
		},
		onPullDownRefresh() {
			this.GetXiaoXiDatas(0)
			this.GetXiaoXiDatass(1)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			yidu() {
				var arr = ''
				this.titlist.forEach(item => {
					if (item.status == 0) {
						arr += item.ID + ','
					}
				})
				var lastIndex = arr.lastIndexOf(',');
				if (lastIndex > -1) {
					arr = arr.substring(0, lastIndex) + arr.substring(lastIndex + 1, arr.length);
				}
				this.val = arr
				if (this.status && arr != '') {
					this.SetXiaoXiReadByUserwsl(0)
				} else if (arr != '') {
					this.SetXiaoXiReadByUserwsl(1)
				}
			},
			GetXiaoXiDatas(val) {
				var that = this
				var data = 'type=' + val + '&starttime=&endtime=&bjyzx=&bjtype=&bjopen=';
				GetXiaoXiData(data).then(res => { // 请求
					console.log(res)
					var arr1 = []
					var arr2 = []
					if (res.statusCode == 200 && res.data.code == 0) {
						that.titlist = res.data.list
						if (val == 0) {
							res.data.list.forEach(item => {
								if (item.status == 0) {
									arr1.push(item)

								}
							})
							that.value = arr1.length
						} else if (val == 1) {
							res.data.list.forEach(item => {
								if (item.status == 0) {
									arr2.push(item)

								}
							})
							that.value1 = arr2.length
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
			GetXiaoXiDatass(val) {
				var that = this
				var data = 'type=' + val + '&starttime=&endtime=&bjyzx=&bjtype=&bjopen=';
				GetXiaoXiData(data).then(res => { // 请求
					var arr2 = []
					console.log(res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.titlists = res.data.list
						res.data.list.forEach(item => {
							if (item.status == 0) {
								arr2.push(item)
							}
						})
						that.value1 = arr2.length

					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					}
				})

			},
			editbadge(val, inx) {
				if (val.status == 0) {
					this.val = val.ID
					this.SetXiaoXiReadByUserwsl(inx)
				} 
			},
			SetXiaoXiReadByUserwsl(inx) {
				var that = this
				var data = 'xxids=' + this.val + '&type=' + inx;
				SetXiaoXiReadByUser(data).then(res => { // 请求
					console.log(data)
					if (res.statusCode == 200 && res.data.code == 0) {
						if(inx == 0){
						this.GetXiaoXiDatas(inx)
						}else if(inx == 1){
							this.GetXiaoXiDatass(inx)
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
			edittitle(inx) {
				if (inx == 1) {
					this.status = true
					this.GetXiaoXiDatas(0)
				} else {
					this.status = false
					this.GetXiaoXiDatas(1)
				}
			},

			fanhui() {
				uni.navigateBack({
					delta: 1
				});

			},
		}
	}
</script>

<style lang="scss">
	.backgroundsty {
		border-bottom: 5rpx solid #007AFF;
	}

	.grzl_box {
		background-color: #fff;
		margin: 20rpx 30rpx 0rpx;
		border-radius: 20rpx;
		padding: 30rpx;

		.font-xiao {
			font-size: 28rpx;
			color: #999;
			margin: 20rpx 0 20rpx;
		}

		.font-color {
			color: #777;
			font-size: 30rpx;
			margin: 10rpx 0;
		}
	}

	page {
		background-color: #eeeeee;
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
		top: 0rpx;
		z-index: 999;
	}
</style>
