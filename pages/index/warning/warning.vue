<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="fachead">
			<u-icon @click="fanhui" name="arrow-left" color="#fff" size="24" style="margin-left: 10rpx;"></u-icon>
			<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
				<text style="color: #fff;">报警列表</text>
			</view>
		</view>
		<view class="facxiala">
			<dropdown-screen @finish="customClick" :itemArr='itemArr' :listArr='listArr' :linkageArr='linkageArr' :status="status"></dropdown-screen>
		</view>
		<view style="margin-top: 200rpx;">

		</view>
		
		
		
		<view class="fac_body" v-for="(v,i) in faclist" :key="i" @click="opencall(v)">
			<view class="fac_body_top">
				<view class="fac_body_top_left">
					<u-image width="50rpx" height="50rpx" style="margin: 30rpx 20rpx 10rpx;" :src="src.fac_baojing"></u-image>
					警告
				</view>
				<view class="fac_body_top_conter">
					<text>{{v.title}}</text>
					<view class="dis_f" style="margin: 20rpx 0 0 0 ;">
						<text class="font_x">报警主题: {{v.dizhi}}</text>
					</view>
					<view class="dis_f" style="margin-top: 10rpx;">
						<text class="font_x"> 报警时间: {{v.weizhi}}</text>
					</view>
				</view>
				<view class="fac_body_top_right">
					<u-icon name="arrow-right"  color="#949494" size="24"></u-icon>
				</view>
			</view>
			<u-gap height="1" bgColor="#bbb" style="margin: 20rpx 30rpx;"></u-gap>
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
				status:false,
				src: {
					fac_baojing: "../../../static/facbaojing.png",
				},
				linkageArr: [],
				listArr: ['严重性', '报警类别', '报警状态'],
				itemArr: [
					[{text: '不限',value: 1},
						{text: '警告',value: 2},
						{text: '一般',value: 3},
						{text: '重要',value: 4},
						{text: '紧急',value: 5},
						{text: '不确定',value: 6},],
					[{text: '不限',value: 7},
						{text: '超速',value: 8},
						{text: '限位',value: 9},
						{text: '在线',value: 10},
						{text: '隐藏',value: 11},],
					[{text: '不限',value: 12}, 
					{text: '开启',value: 13},
					{text: '关闭',value: 14}]
				],
				faclist: [{
					title: 'JZZDH_007',
					dizhi: '小车2在线',
					weizhi: '降至',
					url:"./call"

				}, {
					title: 'JZZDH_007',
					dizhi: '小车2在线',
					weizhi: '降至',

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
			opencall(url){
				console.log(url)
				uni.navigateTo({
					url:url.url
				})
			},
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
			padding: 0rpx 20rpx 0 0;
			display: flex;

			.fac_body_top_left {
				border: 1rpx solid #f88;
				width: 100rpx;
				height: 160rpx;
				text-align:center;
				background-color: #fdf7d5;
				color: #F0AD4E;
				border-top-right-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
			}

			.fac_body_top_conter {
				border: 1rpx solid #b00;
				width: 550rpx;
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
				display: flex;
				flex-wrap: wrap;
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

</style>
