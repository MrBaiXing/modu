<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx;">
				<u-icon @click="fanhui" name="arrow-left" color="#a2a2a2" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>编辑资料</h3>
				</view>
				<view class="" style="margin-top: 15rpx; color: #007AFF;" @click="edit">
					保存
				</view>
			</view>
			<view class="grzl_box">
				<view class="grzl_box_list">
					<view class="my_qiye_text">
						<h3>头像</h3>
					</view>
					<view class="my_qiye">
						<u--image :showLoading="true" :src="src" width="160rpx" height="160rpx" shape="circle"
							@click="editimg"></u--image>
					</view>

				</view>
				<view class="grzl_box_lists">
					<view class="my_qiye_text">
						<h3>昵称</h3>
					</view>
					<view>
						<input class="input" placeholder="请在这里输入昵称" v-model="value.nickname"></input>
					</view>

				</view>
				<view class="grzl_box_lists">
					<view class="my_qiye_text">
						<h3>电话</h3>
					</view>
					<view>
						<input class="input" placeholder="请在这里输入电话" v-model="value.telphone"></input>
					</view>

				</view>
				<view class="grzl_box_lists">
					<view class="my_qiye_text">
						<h3>邮箱</h3>
					</view>
					<view>
						<input class="input" placeholder="请在这里输入邮箱" v-model="value.email"></input>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		appUpdateUserInfo,
		appChangePersonTX,
		GetUserByID
	} from '@/api/user.js'
	import until from '@/api/util.js';
	export default {
		components: {
			until
		},
		data() {
			return {
				value: {},
				src: ''
			}
		},
		onLoad: function(options) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
			this.GetUserByIDwsl()
			// this.value = uni.getStorageSync('lists')[0]
			// this.src = getApp().globalData.url+this.value.touxiang
		},
		onPullDownRefresh() {
			this.GetUserByIDwsl()
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			editimg() {
				var that = this
				uni.chooseImage({
					count: 1, //默认9
					success: function(res) {
						// that.src = res.tempFilePaths[0]
						var img = res.tempFilePaths
						uni.uploadFile({
							header: {
								Authorization: uni.getStorageSync('token'),
								'Content-Type': 'application/json'
							},
							url: getApp().globalData.url +
								"/API/DataAPI.ashx?action=appFileUpload&type=touxiang",
							filePath: img[0],
							name: 'file',
							formData: {
								'type': 'touxiang'
							},
							success: (red) => {
								that.appChangePersonTXs(JSON.parse(red.data).msg)
							}
						})
					}
				});
			},
			appChangePersonTXs(val) {
				var data = 'touxiang=' + val
				this.src = getApp().globalData.url + val
				appChangePersonTX(data).then(res => {
					console.log('获取数据', data)
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
			GetUserByIDwsl() {
				var that = this
				var data = ''
				GetUserByID(data).then(res => {
					console.log('获取数据', res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.value = res.data.list[0]
						if (res.data.list[0].touxiang) {
							that.src = getApp().globalData.url + res.data.list[0].touxiang
						} else {
							that.src = "../../static/IMG/logo-5.png"
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
			appUpdateUserInfowsl() {
				var data = 'nickname=' + this.value.nickname + '&telphone=' + this.value.telphone + '&email=' + this.value
					.email
				appUpdateUserInfo(data).then(res => {
					console.log(res)
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
			edit() {
				if (this.value.telphone) {
					if (!until.checkMobile(this.value.telphone)) {
						uni.showToast({
							title: '手机号格式错误',
							icon: 'none'
						});
						return;
					}
					this.appUpdateUserInfowsl()
				} else if (this.value.email) {
					console.log(this.value.email)
					if (!until.checkEmail(this.value.email)) {
						uni.showToast({
							title: '邮箱格式错误',
							icon: 'none'
						});
						return;
					}
					this.appUpdateUserInfowsl()
				}


			},
			accomplish() {
				this.fanhui()
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
	.aqqy {
		width: 140rpx;
		height: 60rpx;
		background-color: #fdbd00;
		position: relative;
		border-radius: 0 30rpx 30rpx 0;
		line-height: 60rpx;
		font-size: 26rpx;
		text-align: center;
		top: -200rpx;
		left: 28rpx;
		color: #fff;
	}

	.grzl_box {
		background-color: #fff;
		margin: 30rpx 0rpx 0rpx;

		.grzl_box_list {
			border-bottom: 1rpx solid #f5f5f5;
			margin: 0 30rpx;
			display: flex;

			.my_qiye {
				width: 160rpx;
				margin: 30rpx 0;
				height: 160rpx;
			}

			.my_qiye_text {
				margin-right: 70rpx;
				font-size: 30rpx;
				line-height: 220rpx;
			}
		}

		.grzl_box_lists {
			border-bottom: 1rpx solid #f5f5f5;
			height: 100rpx;
			margin: 0 30rpx;
			display: flex;

			text {
				color: #999;
				line-height: 100rpx;
			}

			.my_qiye_text {
				width: 200rpx;
				font-size: 30rpx;
				line-height: 100rpx;

			}

			input {
				height: 100rpx;
				color: #999;
			}

		}
	}

	view {
		background-color: #FFFFFF;
	}

	page {
		background-color: #eeeeee;
	}

	.content {
		background-color: #fff;
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
