<template>
	<view class="content">
		<view class="status_bar">
			<view class="top_view"></view>
			<view
				style="width: 100%; margin: 75rpx 0rpx 0 ;padding: 0 20rpx; color: #fff;display: flex; height: 100rx; background: #00194f;">
				<u-icon @click="fanhui" name="arrow-left" color="#fff" size="24"></u-icon>
				<view style="line-height: 75rpx; text-align: center; width: 600rpx;">
				</view>
			</view>
			<view class="grzl_box">
				<view class="imglists" v-for="(v,i) in lists" :key="i">
					<u--image :showLoading="true" :src="v" width="220rpx" height="220rpx" @click="previewImg(i)">
					</u--image>
					<view class=""
						style="position: relative;width: 58rpx; height: 58rpx; border-radius: 100%; background-color: #f5f5f5;top: -210rpx;left: 150rpx; opacity: 0.7;">
						<u-icon name="close" color="#98908c" size="28" @tap="removeImage(i)"></u-icon>
					</view>
				</view>
				<view class="imglists sty" @click="upload" v-if="lists.length<6">
					<u-icon name="plus" color="#999" size="50"></u-icon>
				</view>

			</view>
			<view class="">
				<u-button type="primary" text="保存"
					style="margin: 25rpx;width: 700rpx; position: absolute; bottom: 1rpx;"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [],
			}
		},

		onLoad: function(e) {
			let obj = e.list.replace("\"([^\"]*)\"", "$1");
			// console.log(obj)
			let b = JSON.parse(e.list)
			this.lists = b
		},

		methods: {
			upload() {
				var that = this
				uni.chooseImage({
					count: 6-this.lists.length,
					success: function(res) {
						if (res.tempFilePaths.length == 6) {
							that.lists = res.tempFilePaths
						} else if (res.tempFilePaths.length < 6) {
							for (var i = 0; i < res.tempFilePaths.length; i++) {
								if(that.lists.length<6){
									that.lists.push(res.tempFilePaths[i])
								}else{
									return that.lists
								}
							}
						}
					}
				})
			},
			previewImg(current) {
				console.log(current)
				uni.previewImage({
					current,
					urls: this.lists
				})
			},
			removeImage(e) {
				console.log(this.lists)
				// var idx = e.currentTarget.dataset.idx;
				var photoFiles = this.lists;
				photoFiles.splice(e, 1);
				// this.setData({
				this.lists = photoFiles
				// })
			},
			accomplish() {
				this.fanhui()
			},
			cliadd(int) {
				int.sex = !int.sex
			},
			fanhui() {
				uni.navigateBack({
					delta: 1
				})
				uni.$emit("handClickXXX", {
					list: this.lists
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

	.sty {
		display: flex;
		justify-content: center;
		margin-top: 35rpx;
		background-color: #f5f5f5;
	}

	.imglists {
		border: 1px solid #f00;
		width: 220rpx;
		height: 220rpx;
		margin: 10rpx;
	}

	.addimg {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		background-color: #999;
		display: flex;
		justify-content: center;
		position: absolute;
		right: 20rpx;
		top: 170rpx;
		opacity: 0.8;
	}

	.grzl_box {
		border: 1px solid #f00;
		// height: 300rpx;
		display: flex;
		// justify-content: space-around;
		margin: 30rpx 15rpx 0;
		flex-wrap: wrap;
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
