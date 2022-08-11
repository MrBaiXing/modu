<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; color: #fff;display: flex; height: 100rx; background: #00194f;">
				<u-icon @click="fanhui" name="arrow-left" color="#fff" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<text>设备报警通知</text>
				</view>
				<view style="color: #fff;line-height: 75rpx;" @click="accomplish">
				</view>
			</view>
		</view>
		<view class="grzl_box">
			<view class="listbox" v-for="(v,i) in detailsList" :key="i" @click="datailsCli(v)">
				<view class="listbox_a">
					{{v.title}}
				</view>
				<view class="listbox_b">
					<view class="">
						{{v.text}}
					</view>
					<view class="">
						<u-icon name="arrow-right" color="#8f8f8f" size="20" style="margin-top: 38rpx;"></u-icon>
					</view>
				</view>
				<view class="listbox_c">
					{{v.time}}
				</view>
				<u-line length="750rpx" style="margin-left: -30rpx;"></u-line>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				detailsList: [{
					title: "设备报警 通知(JZZDH_007)",
					text: "您关注的设备--(JZZDH_007)-在2021-22-22 19:22:21--发生报警: 小车1在线,报警ID: 54644444454545554545444545,严重性:警告",
					time: "2021-22-22 15:12:31",
					url: '../../index/warning/call'
				},{
					title: "设备报警 通知(JZZDH_007)",
					text: "您关注的设备--(JZZDH_007)-在2021-22-22 19:22:21--发生报警: 小车1在线,报警ID: 54644444454545554545444545,严重性:警告",
					time: "2021-22-22 15:12:31",
					url: ''
				},{
					title: "设备报警 通知(JZZDH_007)",
					text: "您关注的设备--(JZZDH_007)-在2021-22-22 19:22:21--发生报警: 小车1在线,报警ID: 54644444454545554545444545,严重性:警告",
					time: "2021-22-22 15:12:31",
					url: ''
				}]
			}
		},
		onLoad: function(e) {},
		methods: {
			datailsCli(val){
				console.log(1111)
				uni.navigateTo({
					url:val.url
				})
			},
			accomplish() {
				this.value
				this.fanhui()
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
	.grzl_box {
		border: 1px solid #f00;
		.listbox{
			border: 1px solid #000;
			margin: 0rpx 30rpx;
			.listbox_a{
				margin: 30rpx 0 30rpx 0;
			}
			.listbox_b{
				border: 1px solid #FF8095;
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				color: #484848;
			}
			.listbox_c{
				margin: 30rpx 0;
				font-size: 26rpx;
			}
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #00194f;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #00194f;
		top: 0;
		z-index: 999;
	}
</style>
