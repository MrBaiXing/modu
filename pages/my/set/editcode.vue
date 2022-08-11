<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#a1a1a1" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>修改密码</h3>
				</view>
				<view style="margin: 15rpx 30rpx 0 0; color: #007AFF;" @click="edit">
					保存
				</view>
			</view>
			<!-- <view class="edit_inputs"> -->
			<view class="grzl_box">
				
				<view class="grzl_box_list">
					<u--input placeholder="请输入旧密码" v-model="title" border="none" type='number' @change="changeinput"></u--input>
				</view>
				<view class="grzl_box_list">
					<u--input placeholder="请输入新密码" v-model="title1" border="none" type='number' @change="changeinput"></u--input>
				</view>
				<view class="grzl_box_list">
					<u--input placeholder="请确认新密码" v-model="title2" border="none" type='number' @change="changeinput"></u--input>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetChangePwd
	} from '@/api/user.js'
	export default {
		data() {
			return {
				title:"",
				title1:"",
				title2:"",
				show: false,
				value: '',
				type: 'number',
				value1: '',
				value2: '',

			}
		},
		onLoad: function(options) {
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
		computed: {
			getIcon() {
				return path => {
					return 'https://cdn.uviewui.com/uview/example/' + path + '.png';
				}
			},
		},
		methods: {
			changeinput(e) {
				console.log('change', e);
			},
			change(e) {},
			edit() {
				var that = this
				var data = 'oldpwd=' + this.title + '&pwd1=' + this.title1 + '&pwd2=' + this.title2
				GetChangePwd(data).then(res => {
					console.log('获取数据', res)
					if (res.statusCode == 200 && res.data.code == 0) {
						// that.provice = res.data.list
						// console.log(that.province)
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: 'none'
						});
						// that.selfData = res.data.list
					} else {
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				})
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
	page {
		background-color: #eeeeee;
	}

	.grzl_box {
		background-color: #fff;
		margin: 30rpx 0rpx 0rpx 0;

		.grzl_box_list {
			margin: 0 30rpx;
			border-bottom: 1rpx solid #f5f5f5;
			display: flex;
			height: 100rpx;
			line-height: 100rpx;
			justify-content: space-between;

		}
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;

		view {}
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
