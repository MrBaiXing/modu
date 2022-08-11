<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#a1a1a1" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>上传图片</h3>
				</view>
				<view style="color: #3a4eff;line-height: 75rpx;">

				</view>
			</view>
			<view class="" style=" color: #999;padding: 10rpx 30rpx">
				上传设备图片({{logo.length+'/6'}})
			</view>
			<view class="grzl_box">
				<view class="imglists" v-for="(v,i) in logo" :key="i" @click="delelogo(v)">
					<u--image :showLoading="true" :src="v.devpic" width="213rpx" radius="20rpx" height="213rpx"
						@click="previewImage(v)"></u--image>
					<view class=""
						style="position: relative; left: 165rpx; top: -213rpx; opacity: 0.6; background-color: #000; width: 50rpx; height: 50rpx; border-top-right-radius: 20rpx;border-bottom-left-radius: 20rpx;">

					</view>
					<u-icon name="close" color="#fff" size="15" style="position: relative; left: 175rpx; top: -256rpx;">
					</u-icon>
				</view>
				<view class="imglists" style="background-color: #eeeeee; border-radius: 20rpx;" @click="upload"
					v-if="status">
					<u-icon name="plus" color="#999" size="30" style="margin: 70rpx 76rpx 0; "></u-icon>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		GetDevicePhotoDataBydevno,
		DeleteDevicePhotoDataByID,
		// UpdateDeviceInfoDataByID,
		// appMultiFileUpload,
		appChangeDevicePhoto
	} from '@/api/user.js'
	export default {
		data() {
			return {
				logo: [],
				editlogo: [],
				index: '',
				list: [],
				devno: '',
				status: false
			}
		},

		onLoad: function(options) {
			this.index = options.id
			this.devno = options.devno
			this.GetDevicePhotoDataBydevnowsl(options.devno)
		},

		methods: {
			GetDevicePhotoDataBydevnowsl(devno) {
				var that = this
				var data = 'devno=' + devno
				GetDevicePhotoDataBydevno(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						that.logo = res.data.list
						for (let i = 0; i < that.logo.length; i++) {
							that.logo[i].devpic = getApp().globalData.url + that.logo[i].devpic
						}
						if (that.logo.length < 6) {
							that.status = true
						} else if (that.logo.length == 6) {
							that.status = false
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
			previewImage(val) {
				console.log(val)
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = val.devpic
				uni.previewImage({
				    current: 0,
				    urls: imgsArray
				});
			},
			delelogo(val) {
				console.log(val)
				var that = this
				var data = 'picid=' + val.ID + '&devno=' +this.devno
				DeleteDevicePhotoDataByID(data).then(res => {
					if (res.statusCode == 200 && res.data.code == 0) {
						that.logo = res.data.list
						this.GetDevicePhotoDataBydevnowsl(that.devno)
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

			upload() {
				var that = this
				if (that.logo.length <= 6) {
					uni.chooseImage({
						count: 6 - that.logo.length, //默认9
						success: function(res) {
							var img = res.tempFilePaths
							for (let i = 0; i < img.length; i++) {
								uni.uploadFile({
									header: {
										Authorization: uni.getStorageSync('token'),
										'Content-Type': 'application/json'
									},
									url: getApp().globalData.url +
										"/API/DataAPI.ashx?action=appFileUpload&",
									filePath: img[i],
									name: 'file',
									formData: {
										'type': 'lunbotu'
									},
									success: (red) => {
										var a = JSON.parse(red.data)
										that.accomplish(a.msg)
									},
									fail(ree) {
										console.log(ree)
									},
								})
							}
						}
					});
				} else {
					this.status = false
					// uni.showToast({
					// 	title: '最多上传六张图片',
					// 	duration: 2000,
					// 	icon: 'none'
					// });
				}
			},


			accomplish(val) {
				// this.fanhui()
				var that = this
				var data = 'devno=' + this.devno + '&touxiang=' + val
				appChangeDevicePhoto(data).then(res => {
					console.log(data, res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.GetDevicePhotoDataBydevnowsl(that.devno)

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
			cliadd(int) {
				int.sex = !int.sex
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				})
				uni.$emit("handClickXXXlogo", {
					logo: this.logo
				});
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

	page {
		background-color: #eeeeee;
	}

	// .text{
	// 	background-color: #F00;
	// 	width: 15rpx;
	// 	height: 15rpx;
	// }
	.sty {
		display: flex;
		justify-content: center;
		margin-top: 35rpx;
		background-color: #f5f5f5;
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
	}

	.grzl_box {
		// border: 1px solid #f00;
		// height: 300rpx;
		display: flex;
		background-color: #fff;
		justify-content: space-between;
		padding: 0rpx 30rpx 20rpx;
		flex-wrap: wrap;

		.imglists {
			// border: 1px solid #f00;
			width: 213rpx;
			text-align: center;
			height: 213rpx;
			margin-top: 20rpx;
			// margin: 10rpx 13rpx;
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
