<template>
	<view class="">

		<!-- #ifdef MP -->
		
		<van-cell-group>
			请描述您的理想型
			<!-- <van-field required label="姓名" :value="name" placeholder="请输入姓名" @change="changeName" border="false"></van-field> -->
			<van-field required label="身高" :value="height" placeholder="请选择身高" @focus="showPopup1"></van-field>
			<van-popup :show="isShow1" custom-style="height: 40%" closeable close-icon="close" position="bottom" @close="onClose1">
				<van-picker show-toolbar title="身高" :columns="hts" @cancel="onClose1" @confirm="changeHeight"></van-picker>
			</van-popup>
			<van-field required label="体重" :value="weight" placeholder="请选择体重" @focus="showPopup2"></van-field>
			<van-popup :show="isShow2" custom-style="height: 40%" closeable close-icon="close" position="bottom" @close="onClose2">
				<van-picker show-toolbar title="体重" :columns="wts" @cancel="onClose2" @confirm="changeWeight"></van-picker>
			</van-popup>
			<van-field required label="位置" :value="pos" placeholder="请选择位置" @focus="showPopup3"></van-field>
			<van-popup :show="isShow3" custom-style="height: 40%" closeable close-icon="close" position="bottom" @close="onClose3">
				<van-picker show-toolbar title="位置" :columns="positions" @cancel="onClose3" @confirm="changePos"></van-picker>
			</van-popup>
			<van-popup :show="isIncomplete" @close="invClose">请输入完整信息</van-popup>
			<van-popup :show="notFound" @close="invClose">未找到匹配项</van-popup>
		</van-cell-group>
		<van-cell></van-cell>
		<van-button type="danger" size="large" @click="matchBaller">即刻安排</van-button>
		<!-- #endif -->
		<yangr-msg v-if="isMatched" title="找到球人啦" type="success" :info="info" btn="安排" @yangrMsgEvent="closeYangrMsg"></yangr-msg>
		</view>
</template>

<script>
	import yangrMsg from "@/components/yangr-msg/yangr-msg.vue"
	export default {
		components: {yangrMsg},	
		data() {
			return {
				height: '',
				weight: '',
				upper_height: '',
				lower_height: '',
				upper_weight: '',
				lower_weight: '',
				pos: '',
				notFound: false,
				isIncomplete: false,
				isShow1: false,
				isShow2: false,
				isShow3: false,
				isMatched: false,
				hts: ['小于190','190~210','大于210'],
				wts: ['小于90','90~100','大于100'],
				lower_hts: [150,190,211],
				upper_hts: [189,210,250],
				lower_wts: [50.0,90.0,100.1],
				upper_wts: [89.9,100.0,160.0],
				positions: ['G','F','C'],
				
				nickName: uni.getStorageSync('nickName'),
				openid: '',
				session_key: '',
				
				info: '',
			}
		},
		
		
		methods: {
		closeYangrMsg(){
			this.isMatched = false;
			this.arrange();
		},
		arrange() {
			var me = this;
			const db = wx.cloud.database();
			db.collection('baller_games').add({
				data:{
					user: me.nickName,
					baller: me.info
				},
				success: function(res) {
				// res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
				console.log(res)
				}
			})
		},
		changeHeight:function(event){
			this.height = event.detail.value;
			this.upper_height = this.upper_hts[event.detail.index];
			this.lower_height = this.lower_hts[event.detail.index];
			console.log(event);
			console.log(this.height);
			console.log(this.upper_height);
			console.log(this.lower_height);
			// console.log(this.height);
			this.isShow1 = false;
		},
		changeWeight:function(event){
			this.weight = event.detail.value;
			this.upper_weight = this.upper_wts[event.detail.index];
			this.lower_weight = this.lower_wts[event.detail.index];
			console.log(event);
			// console.log(this.weight);
			this.isShow2 = false;
		},
		changePos:function(event){
			this.pos = event.detail.value;
			console.log(event);
			console.log(this.pos);
			this.isShow3 = false;
			// console.log(this.weight);
		},
		
		
		showPopup1:function() {
			this.isShow1 = true;
			console.log(this.isShow);
		},
		onClose1:function() {
			this.isShow1 = false;
			console.log(this.isShow);
		},
		showPopup2:function() {
			this.isShow2 = true;
			console.log(this.isShow);
		},
		onClose2:function() {
			this.isShow2 = false;
			console.log(this.isShow);
		},
		showPopup3:function() {
			this.isShow3 = true;
			console.log(this.isShow);
		},
		onClose3:function() {
			this.isShow3 = false;
			console.log(this.isShow);
		},
		invClose:function() {
			this.notFound = false;
			this.isIncomplete = false;
		},
		
		matchBaller:function() {
			var me = this;
			if(me.height=='' || me.weight=='' || me.pos=='') {
				me.isIncomplete = true;
				return 0;
			}
			const db = wx.cloud.database();
			const _ = db.command;
			
			db.collection('players').where({
				height: _.gte(me.lower_height).and(_.lte(me.upper_height)),
				weight: _.gte(me.lower_weight).and(_.lte(me.upper_weight)),
				pos: me.pos
			}).get({
				success: function(res) {
					// console.log(res);
					if(res.data.length==0) {
						me.notFound = true;
					}
					else {
						me.isMatched = true;
						console.log(res.data);
						me.info = res.data[0].name;
					}
				    
				},
				fail: function() {
					me.notFound = true;
				}
			})
		
		
		}
	},
	}
</script>

<style>

</style>
