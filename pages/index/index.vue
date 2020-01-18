<template>
	<view class="page">
		
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="(car, carIndex) in carouselList" :key="carIndex">
				<image :src="car.url" class="carousel"></image>
			</swiper-item>
		</swiper>
		
		<!-- 热门球队 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icon/remen.png" class="hot-icon"></image>
				<view class="hot-title">
					热门球队
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="(scr, scrIndex) in scrollList" :key="scrIndex">
				<view class="poster-wapper">
					<image :src="scr.url" class="poster"></image>
					<view class="team-name">
						{{scr.name}}
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 热门球员 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icon/remen.png" class="hot-icon"></image>
				<view class="hot-title">
					热门球员
				</view>
			</view>
		</view>
		
		<view v-for="(player, playerIndex) in playersList" :key="playerIndex">
			<view class="" v-if="playerIndex < 10">
				<van-card 
				  :desc1= "player.desc1"
				  :desc2= "player.desc2"
				  :desc3= "player.desc3"
				  :desc4= "player.desc4"
				  :desc5= "player.desc5"
				  :title="player.name"
				  :thumb="player.photo"
				/>
			</view>
		</view>
		
	</view>
</template>

<script>
	import common from "../../common/common.js";
	var serverUrl = common.serverUrl;
	
	export default {
		data() {
			return {
				carouselList: [],
				scrollList: [],
				playersList: [],
				imageUrl: "https://ws1.sinaimg.cn/large/007RvR0Hgy1ga934esikgj3046046dft.jpg",
				imageURL: "https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/c0389120-c415-11e9-9f1e-d39825801d33_0.png?v=1576513486"
			}
		},
		onLoad() {
			var me = this;
			
			const db = wx.cloud.database();
			db.collection('carouseImages').get().then(res => {
				  me.carouselList = res.data[0].data;
			}) 
			db.collection('scrollTeams').get().then(res => {
				  me.scrollList = res.data[0].data;
			}) 
			db.collection('players').get().then(res => {
				me.playersList = res.data;
				for (var i = 0; i < me.playersList.length; i++) {
					var player = me.playersList[i];
					me.playersList[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
					me.playersList[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
					me.playersList[i].desc3 = "投篮命中率: " + player.shooting + "%";
					me.playersList[i].desc4 = "三分命中率: " + player.threepts + "%";
					me.playersList[i].desc5 = "罚球命中率: " + player.freethrows + "%";
					
					//  + "投篮命中率: " + player.shooting + " 三分命中率: " + player.threepts + " 罚球命中率: " + player.freethrows
				}
			}) 
			
			
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("index.css");
	
	.desc-class {
		word-wrap:break-word 
	}
</style>
