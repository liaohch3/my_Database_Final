<script>
	export default {
		// #ifdef MP
		onLaunch: function() {
			wx.cloud.init({
				traceUser: true,
				env: 'liaohch3-j5hup'
			});
			var login_code = '';
			
			wx.checkSession({
			  success () {
				wx.login({
				  success (res) {
				    if (res.code) {
				      login_code = res.code;
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
				uni.getUserInfo({
					success: function(userRes) {
						var userInfo = userRes.userInfo;
						console.log('userinfo', userInfo);	
						console.log('login_code', login_code);
											
						uni.request({
							url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc708106e4bcd4934&secret=c95edcc7d59fbeff19fc6261af70dd2c&js_code=' + login_code + '&grant_type=authorization_code',
							success: requestRes => {
								console.log('requestRes', requestRes);
								var openid = requestRes.data.openid;
								var session_key = requestRes.data.session_key;
								
								// #ifdef MP-WEIXIN
									wx.cloud.callFunction({
										name: 'updateData',
										env: 'liaohch3-j5hup',
										data: {
											nickName: userInfo.nickName,
											avatarUrl: userInfo.avatarUrl,
											gender: userInfo.gender,
											province: userInfo.province,
											city: userInfo.city,
											country: userInfo.country
										}
									}).catch(err => {
									  // handle error
									  console.log('myerr', err);
									})
									console.log('数据库更新');
								// #endif 
								
								console.log('opn', openid);
															
								uni.setStorageSync('nickName', userInfo.nickName);
								uni.setStorageSync('avatarUrl', userInfo.avatarUrl);
								uni.setStorageSync('gender', userInfo.gender);
								uni.setStorageSync('province', userInfo.province);
								uni.setStorageSync('city', userInfo.city);
								uni.setStorageSync('country', userInfo.country);
								uni.setStorageSync('current_skin', "#4191ea");
							}
											
						})
						
					}
				})
			  },
			  fail () {
			    // session_key 已经失效，需要重新执行登录流程
			    uni.showModal({
			    	title: '提醒',
			    	content: "请登录",
			    	success:function(){
			    		uni.navigateTo({
			    			url:"/pages/login/login"
			    		});
			    	},
			    });
			  }
			})
			
			// var res = false;
			// var suid = '';
			// var srand = '';
			// try{
			// 	suid = uni.getStorageSync('suid');
			// 	srand = uni.getStorageSync('srand');
			// 	if(suid != '' || srand != ''){
			// 		res = true;
			// 	}
			// }catch(e){
			// 	if(suid == '' || srand == ''){
			// 		res =  false;
			// 		console.log('未登录');
			// 	}
			// }
			// if(!res){
			// 	uni.showModal({
			// 		title: '提醒',
			// 		content: "请登录",
			// 		success:function(){
			// 			uni.navigateTo({
			// 				url:"/pages/login/login"
			// 			});
			// 		},
			// 	});
			// }else{
			// 	uni.getUserInfo({
			// 		success: function(userRes) {
			// 			var userInfo = userRes.userInfo;
			// 			console.log('userinfo', userInfo);						
			// 			uni.request({
			// 				url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc708106e4bcd4934&secret=c95edcc7d59fbeff19fc6261af70dd2c&js_code=' + userRes.code + '&grant_type=authorization_code',
			// 				success: requestRes => {
			// 					console.log('requestRes', requestRes);
			// 					var openid = requestRes.data.openid;
			// 					var session_key = requestRes.data.session_key;
								 
			// 					// #ifdef MP-WEIXIN
			// 						wx.cloud.callFunction({
			// 							name: 'updateData'
			// 						});
			// 						console.log('数据库更新');
			// 					// #endif 
								
			// 					console.log('opn', openid);
															
			// 					// uni.setStorageSync('suid', openid);
			// 					// uni.setStorageSync('srand', session_key);
			// 					uni.setStorageSync('nickName', userInfo.nickName);
			// 					uni.setStorageSync('avatarUrl', userInfo.avatarUrl);
			// 					uni.setStorageSync('gender', userInfo.gender);
			// 					uni.setStorageSync('province', userInfo.province);
			// 					uni.setStorageSync('city', userInfo.city);
			// 					uni.setStorageSync('country', userInfo.country);
			// 				}
											
			// 			})
						
			// 		}
			// 	})
				
			// }
			
			
		}
		// #endif
	}
</script>

<style>
	/*每个页面公共css */
	.page {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		position: absolute;
	}
	
	.page-block {
		background-color: #ffffff;
	}
</style>
