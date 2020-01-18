<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		
		<view class="header">
			<image src="../../static/icon/wx.png"></image>
		</view>
 
		<view class="content">
			<view>申请获取以下权限</view>
			<text>获得你的公开信息(昵称，头像等)</text>
		</view>
 
		<!-- <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="bindGetUserInfo">
			授权登录
		</button> -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true">微信登陆</button>
		
		 
		<!-- #endif -->
	</view>
	
	
</template>
 
<script>
	export default {
		data() {
			return {
				// #ifdef MP-WEIXIN
				// canIUse: wx.canIUse('button.open-type.getUserInfo'),
				canIUse: true,
				isHide: false,
				nickName: '',
				openid: '',
				session_key: '',
				avatarUrl: '',
				// #endif
				
			}
		},
		methods: {
			getUserInfo:function(res){
				var me = this;
				console.log('res', res);
				
				var userInfo = res.detail.userInfo;
				var nickName = userInfo.nickName;
				var avatarUrl = userInfo.avatarUrl;
				var gender = userInfo.gender; //性别 0：未知、1：男、2：女
				var province = userInfo.province;
				var city = userInfo.city;
				var country = userInfo.country;
				if(!res.detail.iv){
					uni.showToast({
						title: "您取消了授权，登陆失败",
						icon: "none"
					});
					return false;
				}
					
				uni.login({
					provider:'weixin',
					success:function(loginRes){
						// console.log(loginRes);
						uni.request({                           
							url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc708106e4bcd4934&secret=c95edcc7d59fbeff19fc6261af70dd2c&js_code=' + loginRes.code + '&grant_type=authorization_code',
							
						    success: res => {
						        // 获取到用户的 openid
								me.openid = res.data.openid;
								me.session_key = res.data.session_key;
								const db = wx.cloud.database();
								const projectCollection = db.collection('login_users');
								projectCollection.add({
									data: {
										openid: me.openid,
										session_key: me.session_key,
										nickName: userInfo.nickName,
										avatarUrl: userInfo.avatarUrl,
										gender: userInfo.gender, 
										province: userInfo.province,
										city: userInfo.city,
										country: userInfo.country
									}
								});
								success:res => {
									console.log(res);
								},
								
								uni.setStorageSync('suid', me.openid);
								uni.setStorageSync('srand', me.session_key);
								uni.setStorageSync('nickName', userInfo.nickName);
								uni.setStorageSync('avatarUrl', userInfo.avatarUrl);
								uni.setStorageSync('gender', userInfo.gender);
								uni.setStorageSync('province', userInfo.province);
								uni.setStorageSync('city', userInfo.city);
								uni.setStorageSync('country', userInfo.country);
						    }
					
						})
					},
					fail:function(r){
						console.log(r); 
					}
				});
				uni.navigateBack({
				
				});

			}
		}
	}
</script>

<style>
 
.header {
    margin: 90rpx 0 90rpx 50rpx;
    border-bottom: 1px solid #ccc;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
}
 
.header image {
    width: 200rpx;
    height: 200rpx;
}
 
.content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
}
 
.content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
}
 
.bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
}
</style>
