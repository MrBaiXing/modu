<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; color: #fff;display: flex; height: 100rx; background: #00194f;">
				<u-icon @click="fanhui" name="arrow-left" color="#fff" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<text>报警详情</text>
				</view>
			</view>
			<view style="background-color: #fff;">
				<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
			</view>
			
			<u-gap height="10" bgColor="#f5f5f5"></u-gap>

			<view class="lists" v-if="TabCur == 0">
				<view class="lists_box" v-for="(v,i) in list" :key="i">
					<view>
						{{v.title}}
					</view>
					<view>
						{{v.value}}
					</view>
				</view>
			</view>
			<view class="lists" v-if="TabCur == 1">
				<view class="lists_box" >
					<view>
						设备在线
					</view>
					<view>
						37375
					</view>
				</view>
			</view>
			<view class="lists" v-if="TabCur == 2">
				<view class="lists_box"  style="padding: 30rpx 10rpx;" @click="click">
					<view class="" style="display: flex; font-weight: 500;">
						<u--image :showLoading="true" src="../../../static/text.png" width="40rpx" height="40rpx" style="margin-right: 20rpx;"></u--image>

						JZZDH+007
					</view>
					<view>
						<u-icon name="arrow-right" color="#999" size="22"></u-icon> 
					</view>
				</view>
				<view class="lists_box font_s" >
					<view style="width: 150rpx;">
						位置信息
					</view>
					<view style="width: 500rpx; white-space: nowrap; overflow: hidden;  text-overflow: ellipsis;">
						2311111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
					</view>
				</view>
				<view class="lists_box font_s" >
					<view>
						国家
					</view>
					<view>
						中国 
					</view>
				</view>
			</view>
			<view class=""  v-if="TabCur == 3">
				
			<view class="lists">
				<view class="lists_box" >
					<view>
						确认人
					</view>
					<view>
						梅黛洛斯
					</view>
				</view>
				<view class="lists_box" >
					<view>
						确认时间
					</view>
					<view>
						2021-31-32 14:25:56
					</view>
				</view>
			</view>
				<u-gap height="20" bgColor="#f5f5f5"></u-gap>
				<view class="lists_box"style="border-bottom: 1rpx solid #fff; margin: 0 30rpx;" >
					<view style="margin: 30rpx 0;">
						确认信息
					</view>
					<view>
						<u--textarea v-model="value" placeholder="请输入意见描述" :disabled="true"  style="background-color: #f5f5f5;"></u--textarea>
					</view>
				</view>
				<button :type="type"size="default"style="margin-top: 750rpx;" :disabled="true">确认报警</button>
			</view>
				
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';

	export default {
		components: {
			WucTab
		},
		data() {
			return {
				type:'default',
				value:'',
				TabCur: 0,
				tabList: [{
					name: '基本信息'
				}, {
					name: '关联属性'
				}, {
					name: '关注属性'
				}, {
					name: '确认信息'
				}],
				list:[{title:"报警ID",value:"1234568979"},
				{title:"报警主题",value:"小车2在线"},
				{title:"严重性",value:"警告"},
				{title:"报警类别",value:"在线"},
				{title:"故障代码",value:"20000"},
				{title:"故障描述",value:"按理说地方"},
				{title:"报警状态",value:"关闭"},
				{title:"关闭时间",value:"2021-22-23"}]
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
			click(){
				uni.navigateTo({
					url:'../overview'
				})
			},
			  swiperChange(e) {
				  console.log(e)
			            // let { current } = e.target;
			            // this.TabCur2 = current;
			        },
			tabChange(index) {
				console.log(index)
				this.TabCur = index;
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

	.font_s{
		font-size: 30rpx;
	}
.lists{
	border: 1px solid #f00;
	margin: 20rpx 30rpx;
	line-height: 50rpx;
	.lists_box{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #999;
		view{
			border: 1px solid #000;
		}
	}
	
}
	.mag {
		margin: 0 0;
	}

	.grzl_box {
		border: 1px solid #f00;
		background-color: #fff;
		margin: 20rpx 0rpx 0rpx 0;
		border-bottom: #f6f6f6 1rpx solid;

		.grzl_box_list {
			border: 1rpx solid #000;
			height: 50rpx;
			margin: 30rpx;
			display: flex;

			.my_qiye_text {
				line-height: 50rpx;
				font-size: 30rpx;
			}
		}
	}


	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #00194f;

		view {}
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
