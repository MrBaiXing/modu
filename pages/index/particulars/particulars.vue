<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="fachead">
			<u-icon @click="fanhui" name="arrow-left" color="#fff" size="24" style="margin-left: 10rpx;"></u-icon>
			<u-search shape="round" color="#fff" :clearabled="true" :showAction="false" bgColor="#152a69"
				placeholder-color="#fff" search-icon-color="#fff" placeholder="请输入设备名称/编号" @search="search"
				style="margin-left: 100rpx;"></u-search>
			<view class="" style="display: inline-block; margin: 10rpx 50rpx 0 60rpx;">
				<u-image width="50rpx" height="50rpx" :src="src.fac_erweima"></u-image>
			</view>
		</view>
		<view class="facxiala">
			<dropdown-screen @finish="customClick" :itemArr='itemArr' :listArr='listArr' :linkageArr='linkageArr'></dropdown-screen>
		</view>
		<view style="margin-top: 200rpx;">

		</view>
		<view class="fac_body" v-for="(v,i) in faclist" :key="i">
			<view class="fac_body_top">
				<view class="fac_body_top_left">
					<u-image width="200rpx" height="160rpx" :src="src.fac_caigou"></u-image>
					<view
						style="background-color: #000;opacity: 0.5;position: relative;top: -40rpx;z-index: 5;width: 200rpx;height: 40rpx;">

					</view>
					<view class="fac_body_top_left_text">
						<text class="text" v-if="v.status"></text>
						<text class="texts" v-else></text>
						<text style="color: #fff; line-height: 40rpx;" v-if="v.status">在线</text>
						<text style="color: #fff; line-height: 40rpx;" v-else>不在线</text>
					</view>
				</view>
				<view class="fac_body_top_conter">
					<text>{{v.title}}</text>
					<view></view>
					<text class="font_x">{{v.mag}}</text>
					<view class="dis_f" style="margin: 10rpx 0;">
						<u-image width="30rpx" height="30rpx" style="margin-right:20rpx" :src="src.fac_quanbu">
						</u-image>
						<text class="font_x">{{v.dizhi}}--</text>
					</view>
					<view class="dis_f">
						<u-image width="30rpx" height="30rpx" style="margin-right:20rpx" :src="src.fac_dingwei">
						</u-image>
						<text class="font_x">{{v.weizhi}}</text>
					</view>
				</view>
				<view class="fac_body_top_right">
					<u-icon name="star" size="24" v-if="imgstatus"></u-icon>
					<u-icon name="star-fill" v-else color="#ffba0b" size="28"></u-icon>
					<u-icon name="arrow-right" style="margin: 30rpx 0 0 15rpx;" color="#949494" size="24"></u-icon>
				</view>
			</view>
			<view class="fac_body_btn" v-if="v.status">
				<u-image class="u-image" width="50rpx" height="50rpx" :src="src.fac_baojing"></u-image>
				<text>存在设备报警</text>
			</view>
			<u-gap height="10" bgColor="#bbb" style="margin: 20rpx 0;"></u-gap>
		</view>
	</view>
</template>
<script>
	import dropdownScreen from '@/components/dropdown-screen/dropdown-screen'

	export default {
		components: {
			dropdownScreen
		},
		data() {
			return {
				imgstatus: false,
				src: {
					fac_erweima: "../../../static/erweima.png",
					fac_baojing: "../../../static/facbaojing.png",
					fac_dingwei: "../../../static/facdingwei.png",
					fac_quanbu: "../../../static/facquanbu.png",
					fac_caigou: "../../../static/caigou.png",

				},
				linkageArr: [],
				listArr: ['设备分类', '所属区域', '在线状态', '报警状态'],
				itemArr: [
					[{
						text: '加冰',
						value: 1
					}],
					[{
						text: '233',
						value: 3
					}],
					[{
						text: '不限',
						value: 7
					}, {
						text: '在线',
						value: 8
					}, {
						text: '不在线',
						value: 9
					}, {
						text: '未连接',
						value: 10
					}],
					[{
						text: '全部',
						value: 11
					}, {
						text: '有活跃报警',
						value: 12
					}]
				],
				faclist: [{
					title: 'JZZDH_007',
					mag: 'JZZDH_007',
					dizhi: '',
					weizhi: '降至',
					status: true,

				}, {
					title: 'JZZDH_007',
					mag: 'JZZDH_007',
					dizhi: '',
					weizhi: '降至',
					status: false,

				}]
			}
		},
		 onLoad: function (options) {
		        setTimeout(function () {
		            console.log('start pulldown');
		        }, 1000);
		        uni.startPullDownRefresh();
		    },
		    onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    },
		methods: {
			fanhui() {
				uni.navigateBack({
					delta: 1
				});
			
			},
			search(e) {
				console.log(123, e)
			},
			customClick(val) {
				console.log(val);
			},
			
		}
	}
</script>

<style lang="scss">
	.fac_body {
		border: 1px solid #f00;
		width: 750rpx;

		.fac_body_top {
			padding: 0rpx 20rpx 0;
			display: flex;

			.fac_body_top_left {
				border: 1rpx solid #f88;
				width: 200rpx;
				height: 160rpx;

				.fac_body_top_left_text {
					width: 200rpx;
					height: 40rpx;
					position: relative;
					top: -80rpx;
					z-index: 6;
					display: flex;
					justify-content: center;

					.text {
						width: 20rpx;
						margin: 12rpx;
						height: 20rpx;
						border-radius: 100%;
						box-shadow: 0 0 15rpx #4CD964;
						background-color: #4CD964;
					}

					.texts {
						width: 20rpx;
						margin: 12rpx;
						height: 20rpx;
						border-radius: 100%;
						box-shadow: 0 0 15rpx #d6d900;
						background-color: #d6d900;
					}
				}
			}

			.fac_body_top_conter {
				border: 1rpx solid #b00;
				width: 420rpx;
				margin-left: 30rpx;

				.dis_f {
					display: flex;
				}

				.font_x {
					font-size: 26rpx;
					color: #999;
					line-height: 30rpx;
				}
			}

			.fac_body_top_right {
				width: 50rpx;
				height: 160rpx;
				border: 1rpx solid #f00;
			}

		}

		.fac_body_btn {
			display: flex;
			padding: 0rpx 20rpx 0;
			border-top: #999 solid 1px;

			text {
				// height: 80rpx;
				// line-height: 60rpx;
				margin-top: 20rpx;
				border: #111111 solid 1px;
				color: #f00;
			}

			.u-image {
				margin: 10rpx 20rpx 0rpx 0;

			}
		}
	}











	.facxiala {
		border: 1px solid #f00;
		width: 100%;
		height: var(--status-bar-height);
		position: fixed;
		top: 180rpx;
		z-index: 999;
	}








	.fachead {
		text-align: center;
		padding: 20rpx;
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #00194f;
		top: 70rpx;
		z-index: 999;
		display: flex;
		// justify-content: center;

	}

	.u_input {
		display: inline-block;
		background-color: #007AFF;
		height: 70rpx;
		width: 500rpx;
		// padding: 50rpx;
		// margin: 10rpx;
		margin-left: 50rpx;
		padding-left: 30rpx;
		line-height: 70rpx;
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

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

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
