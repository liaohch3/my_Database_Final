<template>
	
	<view class="">
		<!-- #ifdef MP -->
		<view>
			<van-button type="primary" block @click="addData1">郭艾伦</van-button>
		</view>
		<view>
			<van-button type="primary" block @click="addData2">姚明</van-button>
		</view>
		<view>
			<van-button type="primary" block @click="addData3">易建联</van-button>
		</view>
		<!-- #endif -->
	</view> 
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			// #ifdef MP
			addData1: function (event) {
				const db = wx.cloud.database();
				const projectCollection = db.collection('DBproject');
				projectCollection.add({
					data: {
						name: "郭艾伦",
						position: "Center"
					}
				});
				success:res => {
					console.log(res);
				}
			},
			addData2: function (event) {
				const db = wx.cloud.database();
				const projectCollection = db.collection('DBproject');
				projectCollection.add({
					data: {
						name: "姚明",
						position: "Center"
					}
				});
				success:res => {
					console.log(res);
				}
			},
			
			addData3: function (event) {
				const db = wx.cloud.database();
				const projectCollection = db.collection('DBproject');
				projectCollection.add({
					data: {
						name: "易建联",
						position: "Center"
					}
				});
				success:res => {
					console.log(res);
					
					
					
				}
			}
			// #endif
		},
		
	}
</script>

<style>

</style>
