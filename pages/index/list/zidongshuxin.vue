<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; display: flex; height: 100rx; background: #fff;">
				<u-icon @click="fanhui" name="arrow-left" color="fff#878787" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
					<h3>自动刷新</h3>
				</view>
				<view style="color: #fff;line-height: 75rpx;">
				</view>
			</view>
			<view class="grzl_box">
				<view class="cladd">
					<h4 style="width: 150rpx;">自动刷新</h4>
					<u-switch v-model="value" @change="change" size="22" style="margin-top: 25rpx;"></u-switch>
				</view>
				<view class="cladd">
					<h4 style="width: 150rpx;">刷新频率</h4>
					<picker mode="selector" :range="columns" @change="picker1" :value="index"  :range-key="'name'">
						<view style="display: flex;">{{name || '选择刷新频率'}}
						
						<u-icon name="arrow-right" color="#969696" size="22"></u-icon>
						</view>
					</picker>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		GetDict00ByType
	} from '@/api/user.js'
	export default {
		data() {
			return {
				show: false,
				index: 0,
				logo: [],
				editlogo: [],
				time: '',
				value: false,
				columns: [],
				name:''

			}
		},

		onLoad: function(e) {
			this.name = uni.getStorageSync('time')
			this.value = uni.getStorageSync('timesuatus')
			this.GetDict00ByTypewsl()
			console.log(this.time, this.value)
		},

		methods: {
			GetDict00ByTypewsl() {
				var that = this
				var data = 'type=dt0010A&isAll=1'
				GetDict00ByType(data).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.code == 0) {
						that.columns = res.data.list
						// if(res.data.list.length == 0 ){
						// 	that.stus = true
						// }
					} else {}
				})
			},
			picker1(e) {
				this.name = this.columns[e.detail.value].name
				uni.setStorageSync('time', this.name)
			},
			change(e) {
				this.name = ''
				console.log('change', e);
				uni.setStorageSync('timesuatus', e)
				if (e) {
					uni.removeStorageSync('time')
					uni.removeStorageSync('timesuatus')
				}
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				})
				uni.$emit("handClickXXXlogo", {
					logo: this.logo
				});
			},
		}
	}
</script>

<style lang="scss">
	.u-page {
		&__upload-item {
			margin-top: 5px;
		}
	}

	.grzl_box {
		// height: 300rpx;
		background-color: #fff;
		// justify-content: ;
		margin-top: 30rpx;
		padding: 0rpx 30rpx;

		.cladd {
			display: flex;
			border-bottom: 1px solid #eee;
			justify-content: space-between;
			line-height: 100rpx;
			height: 100rpx;

			// margin: 80rpx auto;

		}
	}

	page {
		background-color: #eeeeee;
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
