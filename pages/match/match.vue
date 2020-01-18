<template>
	<view>
		<view>
			<van-button type="primary" color="linear-gradient(to right, #4bb0ff, #6149f6)" block @click="matchBaller">匹配球人</van-button>
			<van-button type="primary" block @click="matchWild">匹配野人</van-button>
			<van-button type="primary" block @click="rank">排行榜</van-button>
		</view>
		<yangr-msg v-if="Show1" :title="title" type="success" :info="info1" btn="安排" @yangrMsgEvent="closeYangrMsg"></yangr-msg>
		<yangr-msg v-if="Show2" :title="title" type="success" :info="info2" btn="安排" @yangrMsgEvent="closeYangrMsg"></yangr-msg>
	</view>
</template>

<script>
	import yangrMsg from "@/components/yangr-msg/yangr-msg.vue"
	export default {
		components: {yangrMsg},	
		data() {
			return {
				title: '匹配成功',
				info1: '',
				info2: '',
				Show1: false,
				Show2: false,
			}
		},
		methods: {
			closeYangrMsg(){
				this.Show1 = false;
				this.Show2 = false;
			},
			rank:function(event){
				uni.navigateTo({
					url: '../rank/rank'
				})
			},
			// #ifdef MP
			
			matchWild: function (event) {
				var me = this;
				const db = wx.cloud.database();
				const waitCollection = db.collection('wait');
				var total = 0;
				
				waitCollection.count({
					success: function(res) {
						console.log(res.total);
						total = res.total;
						var watcher;
						if(total == 0){
							waitCollection.add({data: {}})
							watcher = waitCollection.watch({
							  onChange: function(snapshot) {
							    console.log('snapshot1', snapshot)
								if(snapshot.docs.length == 2){
									console.log('1号的对手', snapshot.docs[1]._openid)
									var his_nickName = '';
									db.collection('login_users').where({
										_openid: snapshot.docs[1]._openid
									}).get().then(get_res => {
									  console.log('->', get_res.data[0].nickName)
									  his_nickName = get_res.data[0].nickName;
										me.info1 = '对手: '+his_nickName;
										me.Show1 = true;
										// #ifdef MP-WEIXIN
											wx.cloud.callFunction({
												name: 'deleteData',
												env: 'liaohch3-j5hup',
												data: {}
											})
										// #endif
										
									})
								}
							  },
							  onError: function(err) {
							    console.error('the watch closed because of error', err)
							  }
							})
						}else if(total == 1){
							
							waitCollection.get() 
							.then(res => {
								var his_nickName = '';
								db.collection('login_users').where({
									_openid: res.data[0]._openid
								}).get().then(get_res => {
								  console.log('->', get_res.data[0].nickName)
								  his_nickName = get_res.data[0].nickName;
									me.info2 = '对手: '+his_nickName;
									me.Show2 = true;
								})
							})
							
							waitCollection.add({data: {}})
							watcher.close()
							// #ifdef MP-WEIXIN
								wx.cloud.callFunction({
									name: 'deleteData',
									env: 'liaohch3-j5hup',
									data: {}
								})
							// #endif
						}
					},
					fail: console.error
				})
				
			},
			// #endif
			
			// #ifdef MP
			matchBaller: function () {
				uni.navigateTo({
					url: '../me/me'
				});
			}
			// #endif
		}
	}
</script>

<style>

</style>
