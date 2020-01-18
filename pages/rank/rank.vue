<template>
	<view class="list_box">
		<view class="left">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
				<view class="item" 
					v-for="(item,index) in leftArray"
					:key="index" 
					:class="{ 'active':index==leftIndex }" 
					:data-index="index"
					@tap="leftTap"
				>{{item}}</view>
            </scroll-view>
		</view>
		<view class="main">
			<scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
				<view class="item" v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
					<view class="title">
						<view>{{item.title}}</view>
					</view>
					<view class="goods" v-for="(item2,index2) in item.list" :key="index2">
						<image :src="item2.photo" mode=""></image>
						<view>
							<view>{{item2.name}}</view>
							<view class="describe">{{item2.desc1}}</view>
							<view class="money">{{item2.desc2}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight:'500px',
				leftArray:[],
				mainArray:[],
				topArr:[],
				leftIndex:0,
				scrollInto:''
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res)=>{
					/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
					this.scrollHeight=`${res.windowHeight}px`;
				}
			});
		},
		mounted(){
			this.getListData();
		},
		methods: {
			/* 获取列表数据 */
			getListData(){
				// /* 因无真实数据，当前方法模拟数据 */
				
				const db = wx.cloud.database();
				let [left,main]=[[],[]];
				let list=[];
				
				left.push(`得分榜`);
				let list1=[];
				db.collection('players').orderBy('pts', 'desc').limit(8).get().then(res => {
					var temp = res.data;
					for (var i = 0; i < temp.length; i++) {
						var player = temp[i];
						temp[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
						temp[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
						temp[i].desc3 = "投篮命中率: " + player.shooting + "%";
						temp[i].desc4 = "三分命中率: " + player.threepts + "%";
						temp[i].desc5 = "罚球命中率: " + player.freethrows + "%";
						list1.push({
							name: player.name,
							photo: player.photo,
							desc1: player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分",
							desc2: "身高: " + player.height + "cm 体重: " + player.weight + "kg"
						}) ;
					}
					// var list = list1;
					main.push({
						title:`得分榜`,
						list: list1
					})
				})
				// list.splice(0,list.length);  
				// console.log('list1', list);
				
				left.push(`身高榜`);
				let list2=[];
				db.collection('players').orderBy('height', 'desc').limit(8).get().then(res => {
					var temp = res.data;
					// console.log('temp', temp);
					for (var i = 0; i < temp.length; i++) {
						var player = temp[i];
						temp[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
						temp[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
						temp[i].desc3 = "投篮命中率: " + player.shooting + "%";
						temp[i].desc4 = "三分命中率: " + player.threepts + "%";
						temp[i].desc5 = "罚球命中率: " + player.freethrows + "%";
						list2.push({
							name: player.name,
							photo: player.photo,
							desc1: player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分",
							desc2: "身高: " + player.height + "cm 体重: " + player.weight + "kg"
						}) ;
					}
					// console.log('list2', list);
					main.push({
						title:`身高榜`,
						list: list2
					})
				}) 
				
				left.push(`体重榜`);
				let list3=[];
				db.collection('players').orderBy('weight', 'desc').limit(8).get().then(res => {
					var temp = res.data;
					for (var i = 0; i < temp.length; i++) {
						var player = temp[i];
						temp[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
						temp[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
						temp[i].desc3 = "投篮命中率: " + player.shooting + "%";
						temp[i].desc4 = "三分命中率: " + player.threepts + "%";
						temp[i].desc5 = "罚球命中率: " + player.freethrows + "%";
						list3.push({
							name: player.name,
							photo: player.photo,
							desc1: player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分",
							desc2: "身高: " + player.height + "cm 体重: " + player.weight + "kg"
						}) ;
					}
					main.push({
						title:`体重榜`,
						list: list3
					})
				}) 
				left.push(`罚球榜`);
				let list4=[];
				db.collection('players').orderBy('freethrows', 'desc').limit(8).get().then(res => {
					var temp = res.data;
					for (var i = 0; i < temp.length; i++) {
						var player = temp[i];
						temp[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
						temp[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
						temp[i].desc3 = "投篮命中率: " + player.shooting + "%";
						temp[i].desc4 = "三分命中率: " + player.threepts + "%";
						temp[i].desc5 = "罚球命中率: " + player.freethrows + "%";
						list4.push({
							name: player.name,
							photo: player.photo,
							desc1: player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分",
							desc2: "身高: " + player.height + "cm 体重: " + player.weight + "kg"
						}) ;
					}
					main.push({
						title:`罚球命中率榜`,
						list: list4
					})
				}) 
				left.push(`三分榜`);
				let list5=[];
				db.collection('players').orderBy('threepts', 'desc').limit(8).get().then(res => {
					var temp = res.data;
					for (var i = 0; i < temp.length; i++) {
						var player = temp[i];
						temp[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
						temp[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
						temp[i].desc3 = "投篮命中率: " + player.shooting + "%";
						temp[i].desc4 = "三分命中率: " + player.threepts + "%";
						temp[i].desc5 = "罚球命中率: " + player.freethrows + "%";
						list5.push({
							name: player.name,
							photo: player.photo,
							desc1: player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分",
							desc2: "身高: " + player.height + "cm 体重: " + player.weight + "kg"
						}) ;
					}
					main.push({
						title:`三分命中率榜`,
						list: list5
					})
				}) 
				left.push(`命中率榜`);
				let list6=[];
				db.collection('players').orderBy('shooting', 'desc').limit(8).get().then(res => {
					var temp = res.data;
					for (var i = 0; i < temp.length; i++) {
						var player = temp[i];
						temp[i].desc1 = player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分";
						temp[i].desc2 = "身高: " + player.height + "cm 体重: " + player.weight + "kg";
						temp[i].desc3 = "投篮命中率: " + player.shooting + "%";
						temp[i].desc4 = "三分命中率: " + player.threepts + "%";
						temp[i].desc5 = "罚球命中率: " + player.freethrows + "%";
						list6.push({
							name: player.name,
							photo: player.photo,
							desc1: player.num + "号 位置: " + player.pos + " 场均" + player.pts + "分",
							desc2: "身高: " + player.height + "cm 体重: " + player.weight + "kg"
						}) ;
					}
					main.push({
						title:`命中率榜`,
						list: list6
					})
				}) 
				this.leftArray=left;
				this.mainArray=main;
				
				this.$nextTick(()=>{
					this.getElementTop();
				});
			},
			/* 获取元素顶部信息 */
			getElementTop(){
				/* Promise 对象数组 */
				let p_arr=[];
				
				/* 新建 Promise 方法 */
				let new_p=(selector)=>{
					return new Promise((resolve,reject)=>{
						let view = uni.createSelectorQuery().select(selector);
						view.boundingClientRect(data => {
							resolve(data.top);
						}).exec();
					})
				}
				
				/* 遍历数据，创建相应的 Promise 数组数据 */
				this.mainArray.forEach((item,index)=>{
					p_arr.push(new_p(`#item-${index}`));
				});
				
				/* 所有节点信息返回后调用该方法 */
				Promise.all(p_arr).then((data)=>{
					this.topArr=data;					
				});
			},
			/* 主区域滚动监听 */
			mainScroll(e){
				let top =e.detail.scrollTop;
				let index=0;
				/* 查找当前滚动距离 */
				for(let i = (this.topArr.length-1);i>=0;i--){
					/* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
					if((top+2)>=this.topArr[i]){
						index = i;
						break;
					}
				}
				this.leftIndex=(index < 0 ? 0: index);
			},
			/* 左侧导航点击 */
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.scrollInto=`item-${index}`;
			}
		}
	}
</script>

<style lang="scss">
	/*
	 *  uni-app 全局样式表
	 *  作者:helang
	 *  邮箱:helang.love@qq.com
	*/
	
	/* 根元素样式 设置页面背景、字体大小、字体颜色，字符间距、长单词换行 */
	page {
	  background-color: #f3f3f3;
	  font-size: 28rpx;
	  box-sizing: border-box;
	  color: #333;
	  letter-spacing: 0;
	  word-wrap: break-word;
	}
	
	/* 设置常用元素尺寸规则 */
	view,textarea,input,label,form,button,image{box-sizing: border-box;}
	/* 按钮样式处理 */
	button{font-size: 28rpx;}
	/* 取消按钮默认的边框线效果 */
	button:after{border:none;}
	/* 设置图片默认样式，取消默认尺寸 */
	image{display: block;height: auto;width: auto;}
	/* 输入框默认字体大小 */
	textarea,input{font-size: 28rpx;};
	
	/* 列式弹性盒子 */
	.flex_col {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: center;
	  align-content: center;
	}
	/* 行式弹性盒子 */
	.flex_row {
	  display: flex;
	  flex-direction: column;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: flex-start;
	  align-content: flex-start;
	}
	 
	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow{width:0;flex-grow: 1;}
	.flex_row .flex_grow{flex-grow: 1;}
	 
	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap{flex-wrap: wrap;}
	 
	/* 弹性盒子居中对齐 */
	.flex_col.flex_center,.flex_row.flex_center{justify-content: center;}
	 
	/* 列式弹性盒子两端对齐 */
	.flex_col.flex_space{justify-content: space-between;}
	
	/* 弹性盒子快速分栏 ,这里非常郁闷 uniapp 居然不支持 * 选择器 */
	.flex_col.flex_col_2>view{width: 50%;}
	.flex_col.flex_col_3>view{width: 33.33333%;}
	.flex_col.flex_col_4>view{width: 25%;}
	.flex_col.flex_col_5>view{width: 20%;}
	.flex_col.flex_col_6>view{width: 16.66666%;}
	
	/* 字体颜色 */
	.color_333 {color: #333;}
	.color_666 {color: #666;}
	.color_999 {color: #999;}
	.color_ccc {color: #ccc;}
	.color_fff {color: #fff;}
	.color_6dc{color: #6dca6d;}
	.color_d51{color: #d51917;}
	.color_09f{color: #0099ff;}
	 
	/* 背景色*/
	.bg_fff{background-color: #ffffff;}
	 
	/* 字体大小 */
	.size_10 {font-size: 20rpx;}
	.size_12 {font-size: 24rpx;}
	.size_14 {font-size: 28rpx;}
	.size_16 {font-size: 32rpx;}
	.size_18 {font-size: 36rpx;}
	.size_20 {font-size: 40rpx;}
	 
	/* 字体加粗 */
	.font_b{font-weight: bold;}
	 
	/* 对齐方式 */
	.align_c{text-align: center;}
	.align_l{text-align: left;}
	.align_r{text-align: right;}
	 
	/* 遮罩 */
	.shade{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  background-color: rgba(0,0,0,0.8);
	  z-index: 100;
	}
	 
	/* 弹窗 */
	.shade_box{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  margin: auto;
	  z-index: 101;
	  min-width: 200rpx;
	  min-height: 200rpx;
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		
		.item{
			padding-left: 20rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active{
				color: #42b983;
				background-color: #fff;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		
		
		.title{
			line-height: 64rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #666;
			background-color: #fff;
			position: sticky;
			top: 0;
			z-index: 19;
		}
		
		.item{
			padding-bottom: 10rpx;
			border-bottom: #eee solid 1px;
		}
		
		.goods{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;
			
			&>image{
				width: 66upx;
				height: 90upx;
				margin-right: 16rpx;
			}
			
			.describe{
				font-size: 24rpx;
				color: #999;
			}
			
			.money{
				font-size: 24rpx;
				color: #efba21;
			}
		}
	}
}
</style>
