<template>
	<view class="content">
		<u--image :showLoading="true" :src="list.pic" width="750rpx" height="1670rpx"></u--image>
		<view class="settime" @click="click">
			{{!list.timecnt?'跳过':list.timecnt+'s'}}
		</view>

	</view>
</template>

<script>
	import {
		GetQiDongLogo
	} from '@/api/user.js'
	export default {
		data() {
			return {
				sun: 10,
				list: {
					pic: '../static/IMG/guangao.png',
					timecnt: 5
				},

			}
		},
		onLoad() {
			this.GetQiDongLogowsl()
			this.dingshi()
			this.dingshis()
			// var 
		},
		methods: {
			GetQiDongLogowsl() {
				var data = ''
				GetQiDongLogo(data).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.code == 0) {
						if (res.data.list.pic) {
							this.list = res.data.list
							this.list.pic = getApp().globalData.url + res.data.list.pic
						} else {
							this.list = this.list
						}

					}
				})
			},
			click() {
				if (this.list.timecnt == 0) {
					uni.navigateTo({
						url: 'register/register'
					})
				}
			},
			dingshi() {
				let timer = setInterval(() => {
					this.list.timecnt--;
					if (this.list.timecnt < 1) {
						clearInterval(timer);
						this.list.timecnt = 0
					}
				}, 1000)
			},
			dingshis() {
				let timer = setInterval(() => {
					this.sun--;
					if (this.sun < 1) {
						clearInterval(timer);
						this.sun = 0
						uni.navigateTo({
							url: 'register/register'
						})
					}
				}, 1000)
			},
		},
	}
</script>

<style lang="scss">
	.settime {
		background-color: #000;
		width: 120rpx;
		height: 70rpx;
		border-radius: 50rpx;
		opacity: 0.6;
		text-align: center;
		line-height: 70rpx;
		position: absolute;
		top: 80rpx;
		right: 20rpx;
		color: #fff;
		// left: 500rpx;
	}
</style>
