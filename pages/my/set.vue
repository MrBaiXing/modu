<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx;display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="#9e9e9e" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>设置</h3>
				</view>
			</view>
			<view class="grzl_box">
				<view class="grzl_box_list" v-for="(v,i) in list" :key="i" @click="urllist(v)">
					<h4>{{v.title}}</h4>
					<u-icon name="arrow-right" color="#999" size="22"></u-icon>
				</view>
			</view>
			<u-button style=" margin-top: 30rpx; width: 750rpx; background-color: #fff; color: #f00;" text="退出账号" size="large"
				 @click="open"></u-button>
			<u-modal :show="show" showCancelButton :title="title" @confirm="confirm" :content="content" @cancel="cancel" :closeOnClickOverlay="true" @close="close"></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"温馨提示",
				show: false,
				content: '退出当前账号',
				list:[
					{title:"消息设置",url:"./set/language"},
					{title:"修改密码",url:"./set/editcode"},
					{title:"用户协议",url:"../register/reg_yemian/xieyi"},
					{title:"隐私政策",url:"../register/reg_yemian/yinsi"},
				]
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
		methods: {
			open(){
				this.show = true
			},
			urllist(val) {
				console.log(123)
				uni.navigateTo({
					url: val.url
				});
			},
			confirm() {
				this.show = false
				console.log('confirm');
				var a = uni.getStorageSync('phone')
				var b = uni.getStorageSync('checked')
				uni.clearStorage();
				uni.setStorageSync('phone', a);
				uni.setStorageSync('checked', b)
				var v = uni.getStorageSync('phone')
				var b = uni.getStorageSync('checked')
				console.log(v,b)
					uni.navigateTo({
						url: '../register/register'
					});
			},
			cancel() {
				this.show = false
				console.log('cancel');
			},
			close() {
				this.show = false
				console.log('close');
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
		background-color: #f6f6f4;
	}

	.mag {
		margin: 0 0;
	}

	.grzl_box {
		// border: 1px solid #f00;
		background-color: #fff;
		margin: 30rpx 0rpx 0rpx 0;

		.grzl_box_list {
			margin: 0 30rpx;
			padding: 30rpx 0;
			// border: 1rpx solid #000;
			border-bottom: 1rpx solid #f5f5f5;
			display: flex;
			justify-content: space-between;
			.my_qiye_text {
				line-height: 50rpx;
				font-size: 30rpx;
			}
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
