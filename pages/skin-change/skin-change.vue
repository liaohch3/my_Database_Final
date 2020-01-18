<template>
	<view>
		<view class="list-content">
			<radio-group @change="radioChange">
				<label class="list" v-for="(item, index) in items" :key="item.value">
					<view class="text">{{item.name}}</view>
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
				</label>
			</radio-group>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'radio',
				items: [{
						value: '#F0E68C',
						name: '卡其布'
					},
					{
						value: '#DA70D6',
						name: '紫罗兰'
					},
					{
						value: '#4191ea',
						name: '活力蓝',
						checked: 'true'
					},
					{
						value: '#2E8B57',
						name: '中大绿'
					}
				],
				current: 0,
				current_skin: '#4191ea',
			}
		},
		onLoad() {
			
			this.current = uni.getStorageSync('current');
			this.current_skin = uni.setStorageSync('current_skin', evt.target.value);
		},
		methods: {
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						uni.setStorageSync('current', i);
						uni.setStorageSync('current_skin', evt.target.value);
						break;
					}
				}
			}
		}
	}
</script>

<style>
	.list-content{
		padding: 20upx;
		font-size: 30upx;
	}
	.list{
		display:flex;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		border-bottom:1px solid rgb(243,243,243);
	}
	.text{
		flex:1 1 auto;
	}
	
</style>