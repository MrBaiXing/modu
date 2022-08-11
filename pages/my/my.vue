<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="myhead">
			我的
		</view>
		<!-- 信息 -->
		<view class="my_xinxi">
			<view class="my_touxiang">
				<u-image width="140rpx" height="140rpx" :src="src.myimg" shape="circle"
					style="border: 5rpx solid #0055ff;margin-bottom: 10rpx; border-radius: 100%;"></u-image>
				<view style="margin-left: 30rpx; padding: 10rpx 0 0 0; height: 140rpx;">

					<text style="font-size: 40rpx;">{{list.nickname}}</text>
					<view
						style=" margin-top: 20rpx; text-align: center;  padding: 5rpx 10rpx; width: 60rpx; border-radius: 5rpx; font-size: 26rpx; color: #007AFF; border: 1rpx solid #007AFF;"
						@click="bianji">
						编辑
					</view>
				</view>
			</view>
			<view class="my_ipone">
				<view style="margin-bottom: 30rpx;">
					<u-image width="40rpx" height="40rpx" :src="src.myshouji"></u-image>
					<text @click="bianji">{{list.telphone || '添加'}}</text>
				</view>
				<view>
					<u-image width="40rpx" height="40rpx" :src="src.myduanxin"></u-image>
					<text @click="bianji">{{list.email || '添加'}}</text>
				</view>
			</view>
		</view>
		<!-- 资料 -->
		<view class="my_ziliao">
			<view style="font-size: 40rpx; margin-bottom: 50rpx;">
				常用功能
			</view>
			<view class="my_ziliao_list">
				<view class=" listbox" style="margin-top: 10rpx;" v-for="(i,v) in my" :key="v" @click="skip(i)">
					<view style="display: flex; justify-content: center;" @click="skip(i)">
						<u-image width="40rpx" height="40rpx" :src="i.src" @click="skip(i)"></u-image>
					</view>
					<view style=" line-height: 40rpx;text-align: center; margin-top: 20rpx;" @click="skip(i)">
						{{i.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetUserByID
	} from '@/api/user.js'
	export default {
		data() {
			return {
				list: {},
				src: {
					myimg: "../../static/IMG/logo-5.png",
					myshouji: "../../static/IMG/my/dianhua@2x.png",
					myduanxin: "../../static/IMG/my/youxiang@2x.png",
				},
				my: [{
						src: "../../static/IMG/my/ziliao@2x.png",
						name: "个人资料",
						url: './myziliao'
					},
					{
						src: "../../static/IMG/my/kefu@2x.png",
						name: "联系客服",
						url: './news/lianxiwomen'
					},
					{
						src: "../../static/IMG/my/guanyu@2x.png",
						name: "关于我们",
						url: './guanyu'
					},
					{
						src: "../../static/IMG/my/shezhi@2x.png",
						name: "应用设置",
						url: './set'
					},
				],

			}
		},
		onShow() {
			this.GetUserByIDwsl()
		},
		onLoad: function(options) {
			this.GetUserByIDwsl()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			bianji() {
				uni.navigateTo({
					url: './enterprise'
				});
			},
			skip(int) {
					uni.navigateTo({
						url: int.url
					});

			},
			GetUserByIDwsl(){
				var that = this
				var data = ''
				GetUserByID(data).then(res => {
					console.log('获取数据', res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.list = res.data.list[0]
						if(res.data.list[0].touxiang){
						that.src.myimg = getApp().globalData.url +  res.data.list[0].touxiang
							
						}else{
							that.src.myimg = "../../static/IMG/logo-5.png"
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

		}
	}
</script>

<style lang="scss">
	.my_ziliao {
		width: 640rpx;
		margin: 20rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		background-color: #fff;

		.my_ziliao_list {
			display: flex;
			justify-content: space-between;
		}
	}

	page {
		background-color: #d2d2d2;
		background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#eeeeee));
		background-image: -moz-linear-gradient(#fff, #eeeeee);
		background-image: -o-linear-gradient(#fff, #eeeeee);
		background-image: linear-gradient(#fff, #eeeeee);
	}

	.my_xinxi {
		width: 700rpx;
		margin: 50rpx 30rpx 0rpx;

		.my_touxiang {
			display: flex;
		}

		.my_ipone {
			margin-top: 60rpx;
			height: 130rpx;
			font-size: 30rpx;

			text {
				display: inline-block;
				margin-left: 15rpx;
			}

			view {
				display: flex;
			}
		}
	}

	.myhead {
		margin-top: 30rpx;
		font-size: 40rpx;
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

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
