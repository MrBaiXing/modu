<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="myhead">
			消息
		<view class="head-nav">
			<view :class="navIndex==0?'activite':''" @click="checkIndex(0)"><text>消息</text></view>
			<view :class="navIndex==1?'activite':''" @click="checkIndex(1)"><text>公告</text></view>
		</view>
		</view>
		
		<!-- 内容切换 -->
			<view class="contents" v-if="navIndex==0">
				<view class="content_box">
					<u-image width="40rpx" height="40rpx" :src="src"></u-image>
					<text>设备报警通知</text>
				</view>
				
				
				<view class="content_boxs" v-for="(v,i) in news_list" :key="i" @click="newsDetails(v)">
					<view class="content_boxs_text">
						<text>{{v.title}}</text>
						<text>{{v.time}}</text>
					</view>
					<view class="content_boxs_texts"  v-html="v.info">
						
					</view>
				</view>
			</view>
			<view class="contents" v-if="navIndex==1">
				<text>暂无</text>
				<view v-if="list.length">
					<!-- ... -->
				</view>
				<!-- 空布局简单使用: 就这一行代码 -->
				<!-- <mescroll-empty v-else></mescroll-empty> -->
				<!-- 空布局完整配置 -->
				<!-- <mescroll-empty :option="emptyOption" @emptyclick="emptyClick"></mescroll-empty> -->
			</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				status:true,
				navIndex: 0,
				currentPage:1,
				totalPages:1,
				src:"../../static/news_tongzhi.png",
				list:[],
				news_list:[
					{
						title:"设备报警  通知(JZZDH_007)",
						time:"2021-11-12 21:32:13",
						info:"你关注的设备设备报警  通知(JZZDH_007)>2021-11-12 21:1222222222222222222222222222222232:13",
						url:'./newsDetails/newsDetails'
					}
				],
				emptyOption: {
					i18n: {
						zh: {
							icon: "https://www.mescroll.com/img/mescroll-empty.png", // 图标路径
							tip: '~ 暂无相关数据 ~', // 提示
							btnText: '去逛逛 >'// 按钮
						},
						en: {
							icon: "https://www.mescroll.com/img/mescroll-empty-en.png", // 图标路径
							tip: '~ empty ~',
							btnText: 'go shopping'
						}
					}
				}
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
			newsDetails(val){
				uni.navigateTo({
					url:val.url
				})
			},
			emptyClick(){
				uni.showToast({title: "点击了去逛逛"})
			},
			
			checkIndex(index) {
				console.log(index)
				this.navIndex = index;
			},
		}
	}
</script>

<style lang="scss">
	.contents {
		/* background: #008000; */
		width: 100%;
		height: 100%;
		margin-top: 190rpx;
		.content_box{
			border: 1px solid #f00;
			border-top: 1px solid #8f8787;
			border-bottom: 1px solid #8f8787;
			width: 100%;
			// height: 100rpx;
			display: flex;
			padding: 30rpx;
			text{
				margin-left: 30rpx;
			}
		}
		.content_boxs{
			border: 1px solid #f00;
			width: 690rpx;
			padding: 30rpx;
			.content_boxs_text{
				border: 1px solid #000;
				font-size: 30rpx;
				display: flex;
				justify-content: space-between;
				
			}
			.content_boxs_texts{
				font-size: 26rpx;
				overflow: hidden;
					border: 1px solid #000;
					width: 686rpx;
					margin-top: 15rpx;
					// font-weight: lighter;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
			}
		}
	}
	
	.myhead {
		background-color: #00194F;
		// height: 50rpx;
		color: #FFFFFF;
		width: 100%;
		text-align: center;
		padding: 20rpx 0 0;
		height: var(--status-bar-height);
		position: fixed;
		background-color: #00194f;
		top: 70rpx;
		z-index: 999;
		font-size: 36rpx;
	}

	.head-nav {
		margin: 20rpx auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #CCCCCC;
		width: 100%;
		border-bottom: 1px solid #f00;
		display: flex;
		justify-content: center;
		view{
			border: 1px solid #000;
			width: 50%;
			line-height: 100rpx;
			text-align: center;
			height: 100rpx;
		}
		text{
			display: inline-block;
			height: 105rpx;
		}
		.activite {
			color: #00008b;
			text{
				display: inline-block;
				height: 105rpx;
				border-bottom: 3rpx solid #2C405A;
			}
		}
	}



	.head-nav>view {
		padding-bottom: 1rpx;
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
	view{
		background-color: #fff;
	}
	page{
		background-color: #efefef;
	}
</style>
