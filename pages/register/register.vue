<template>
	<view class="content">
		<view class="u-page__item">
			登录
		</view>
		<view class="reg_logo">
			<view class="" style="display: flex;justify-content: center;">

				<u-image width="200rpx" height="165rpx" src="../../static/IMG/logo/logo.png" :showLoading="true">
				</u-image>
			</view>
			<view class="" style="margin-top: 50rpx;">
				<text>巨量智能科技</text>
				<view class="" style="color: #999; font-size: 26rpx;">
					JULIANGZHINENGKEJI
				</view>
			</view>
		</view>
		<view class="reg_box">
			<u--input placeholder="请输入手机号" prefixIcon="account" border="bottom" maxlength="11" clearable
				v-model="phone">
			</u--input>
			<u--input placeholder="请输入密码" prefixIcon="lock-open" :password='true' clearable v-model="pass"
				border="bottom" style="margin-top: 50rpx;">
			</u--input>

		</view>
		<view>
			<u-button text="登录" size="normal" type="primary" style="margin: 0 50rpx; background-color: #457ff6;"
				@click="regter"></u-button>
		</view>
		<view class="reg_ter">
			<view style="font-size: 28rpx; display: flex;justify-content: center;">
				<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
					<u-checkbox shape="circle" v-for="(item, index) in checkboxList1" :key="index" :label="item.name"
						:name="item.name"></u-checkbox>
				</u-checkbox-group>
				<navigator url="./reg_yemian/yinsi" hover-class="navigator-hover">隐私政策</navigator>
				和
				<navigator url="./reg_yemian/xieyi" hover-class="navigator-hover">用户协议</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetUserLogin
	} from '@/api/user.js'
	var that = this
	export default {
		data() {
			return {
				checked: true,
				pass: '123',
				phone: 'admin',
				showPassword: true,
				checkboxValue1: [],
				// 基本案列数据
				checkboxList1: [{
						name: '登录即代表同意',
						disabled: false
					}

				],
			}
		},
		onLoad() {
			var that = this;
			uni.getStorageInfo({
				success: function(res) {
					that.phone = uni.getStorageSync('phone')
					that.pass = uni.getStorageSync('pwds')
					that.checkboxValue1 = uni.getStorageSync('checked')
				}
			});
		},
		methods: {
			checkboxChange(n) {
				if (this.checkboxValue1[0]) {
					console.log(123)
				} else {
					console.log(456)
				}
			},
			regter() {
				var that = this;
				if (this.phone && this.pass && this.checkboxValue1[0]) {
					console.log(123)
					let data = "username=" + this.phone+"&pwd="+ this.pass;
					GetUserLogin(data).then(res => { // 请求
						console.log( res)
						if (res.statusCode == 200 && res.data.code == 0) {
							uni.setStorageSync('token', res.data.Token);
							uni.setStorageSync('lists', res.data.list)
							uni.setStorageSync('phone', that.phone);
							uni.setStorageSync('pwds', that.pass)
							uni.setStorageSync('checked', that.checkboxValue1)
							uni.switchTab({
								url: '../index/index',
							});
							// uni.getStorageInfo({
							// 	success: function(res) {
							// 		console.log(res);
									// console.log(uni.getStorageSync('lists'));
							// 	}
							// });
						} else {

							// uni.showToast({
							// 	title: res.data.msg,
							// 	duration: 2000,
							// 	icon: 'none'
							// });
						}
					})
				} else if (this.checkboxValue1[0] == null) {
					uni.showToast({
						title: '请同意用户协议',
						duration: 2000,
						icon: 'error'
					});
				} else {
					uni.showToast({
						title: '请输入账号密码',
						duration: 2000,
						icon: 'error'
					});
				}
			},
			formatter(phone) {
				// 让输入框只能输入数值，过滤其他字符
				return phone.replace(/[^0-9]/ig, "")
			},
			rightClick() {
				console.log('rightClick');
			},
			leftClick() {
				plus.runtime.quit();
			}
		}
	}
</script>

<style lang="scss">
	.reg_but {
		margin: 50rpx 0;
		text-align: center;
	}

	.reg_ter {
		margin: 50rpx 0 0;
		display: flex;
		justify-content: center;
	}

	.reg_box {
		margin: 100rpx 50rpx 50rpx;
	}

	navigator {
		display: inline-block;
		color: #457ff6;
		// font-size: 26rpx;
	}

	.reg_logo {
		margin-top: 150rpx;
		text-align: center;
	}

	.u-page__item {
		margin-top: 100rpx;
		text-align: center;
		font-size: 42rpx;
	}

	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}
		}
	}

	.u-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.5px;
		border-radius: 100px;
		border-color: $u-border-color;
		padding: 3px 7px;
		opacity: 0.8;
	}















	// .content {
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// 	justify-content: center;
	// }

	// .logo {
	// 	height: 200rpx;
	// 	width: 200rpx;
	// 	margin-top: 200rpx;
	// 	margin-left: auto;
	// 	margin-right: auto;
	// 	margin-bottom: 50rpx;
	// }

	// .text-area {
	// 	display: flex;
	// 	justify-content: center;
	// }

	// .title {
	// 	font-size: 36rpx;
	// 	color: #8f8f94;
	// }
</style>
