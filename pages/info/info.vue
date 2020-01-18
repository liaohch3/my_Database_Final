<template>
  <view>
    <cmd-page-body type="top">
      <cmd-transition name="fade-up">
        <view>
          <cmd-cel-item title="头像" slot-right>
            <cmd-avatar :src="avatarUrl"></cmd-avatar>
          </cmd-cel-item>
          <!-- <cmd-cel-item title="积分" addon="566" arrow></cmd-cel-item> -->
          <cmd-cel-item title="昵称" :addon="nickName" ></cmd-cel-item>
		  <cmd-cel-item title="性别" :addon="genders[gender]" ></cmd-cel-item>
		  <cmd-cel-item title="地址" :addon="address" ></cmd-cel-item>
          <!-- <cmd-cel-item title="openid" :addon="openid" arrow></cmd-cel-item>
          <!-- <cmd-cel-item title="姓名" addon="Lich" arrow></cmd-cel-item> -->
          <van-field required label="姓名" :value="name" placeholder="请输入姓名" @change="changeName" border="false"></van-field>
          <van-field required label="身高" :value="height" placeholder="请输入身高(cm)" @change="changeHeight" border="false"></van-field>
          <van-field required label="体重" :value="weight" placeholder="请输入体重(kg)" @change="changeWeight" border="false"></van-field>
          <van-field required label="位置" :value="pos" placeholder="请输入位置" @focus="showPopup"></van-field>
          <van-popup :show="isShow" custom-style="height: 40%" closeable close-icon="close" position="bottom" @close="onClose">
            <van-picker show-toolbar title="位置" :columns="positions" @cancel="onClose" @confirm="changePos"></van-picker>
          </van-popup>
          <van-field label="号码" :value="num" placeholder="请输入号码" @change="changeNum" border="false"></van-field>
          <van-popup :show="isInvalid" @close="onClose">请输入有效信息</van-popup>
          <!-- <cmd-cel-item title="联系方式" addon="15676109501" arrow></cmd-cel-item>
          <cmd-cel-item title="证件号码" addon="450112xxxxxxxx2017" arrow></cmd-cel-item>
          <cmd-cel-item title="我的地址" addon="广西壮族自治区南宁市西乡塘区大学西路29号" arrow></cmd-cel-item>
          <cmd-cel-item title="修改密码" @click="fnClick('modify')" arrow></cmd-cel-item> -->
          <van-button size="large" @click="updtData">确认修改</van-button>
          <button class="btn-logout">退出登录</button>
        </view>
      </cmd-transition>
    </cmd-page-body>
  </view>
</template>

<script>
  import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
  import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
  import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
  import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

  export default {
    components: {
      cmdNavBar,
      cmdPageBody, 
      cmdTransition,
      cmdCelItem,
      cmdAvatar
    },

    data() {
      return {
            checked: true,
            name: 'LBJ',
            height: '184',
            weight: '80',
            pos: 'C',
            num: '0',
            isShow: false,
            isInvalid: false,
            positions: ['PG','SG','SF','PF','C'],
			genders: ['未知','男','女'], 
            
            openid: uni.getStorageSync('suid'),
			nickName: uni.getStorageSync('nickName'),
			avatarUrl: uni.getStorageSync('avatarUrl'),
			country: uni.getStorageSync('country'),
			province: uni.getStorageSync('province'),
			city: uni.getStorageSync('city'), 
			gender: uni.getStorageSync('gender'),
            session_key: uni.getStorageSync('srand'),
			address: ''
			
			
        }
    },
    onLoad() {
		this.address = this.country+" "+this.province+" "+this.city;
	},

    mounted() {},
    
    methods:{
      /**
       * 点击触发
       * @param {Object} type 跳转页面名或者类型方式
       */
      updtData:function() {
        var me = this;
        if (me.pos=='' || isNaN(parseInt(me.height)) || isNaN(parseInt(me.weight)) || parseInt(me.height) < 100 || parseInt(me.height) > 300 || parseInt(me.weight) < 35 || parseInt(me.weight) > 200) {
            me.isInvalid = true;
            return 0;
        }
        if (me.num=='') {
            me.num=='0'
        }
        
        console.log('me.nickName', me.nickName);
        console.log('me.openid', me.openid);
        console.log('me.session_key', me.session_key);
        console.log('me.height', parseInt(me.height));
        // console.log(this);
		
		// #ifdef MP-WEIXIN
		wx.cloud.callFunction({
			name: 'updateInfo',
			env: 'liaohch3-j5hup',
			data: {
				name: me.name,
				height: parseInt(me.height),
				weight: parseInt(me.weight),
				pos: me.pos,
				num: me.num
			}
			}).catch(err => {
			// handle error
			console.log('myerr', err);
		})
		console.log('数据库更新');
		// #endif 
		
        // exports.main = async (event, context) => {
        //   try { 
        //     return await db.collection('todos').where({
        //       _openid : me.openid
        //     })
        //     .update({
        //       data: {
        //         nickName: me.nickName,
        //         openid:me.openid,
        //         session_key:me.session_key,
        //         name: me.name,
        //         height: parseInt(me.height),
        //         weight: parseInt(me.weight),
        //         pos: me.pos,
        //         num: me.num
        //       }
        //     })
        //   } catch(e) {
        //     console.error(e)
        //   }
        // }
     //     projectCollection
        // // .add
        // .where({
        //  _openid : me.openid
        // }).update
        // ({
     //         data: {
     //             nickName: me.nickName,
     //             openid:me.openid,
     //             session_key:me.session_key,
     //             name: me.name,
     //             height: parseInt(me.height),
     //             weight: parseInt(me.weight),
     //             pos: me.pos,
     //             num: me.num
     //         }
     //     });
        success:res => {
            console.log(res);
            console.log('-----------------');
        };
        fail:res =>{
            console.log("失败", res);
        };
        console.log("+++++++++++++++++++++++");
      },
	  
      changeName:function(event){
        this.name = event.detail;
        // console.log(event);
        // console.log(this.height);
      },
      changeHeight:function(event){
        this.height = event.detail;
        // console.log(event);
        // console.log(this.height);
      },
      changeWeight:function(event){
        this.weight = event.detail;
        // console.log(event);
        // console.log(this.weight);
      },
      changePos:function(event){
        this.pos = event.detail.value;
        console.log(event);
        console.log(this.pos);
        this.isShow = false;
        // console.log(this.weight);
      },
      changeNum:function(event){
        this.num = event.detail;
        // console.log(event);
        // console.log(this.height);
      },
      showPopup:function() {
        this.isShow = true;
        console.log(this.isShow);
      },
      onClose:function() {
        this.isShow = false;
        this.isInvalid = false;
        console.log(this.isShow);
      },
       onChange:function(event) {
        this.checked = !this.checked;
        }       
    }
    }
  
</script>

<style>
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #365fff, #36bbff);
  }

  .btn-logout-hover {
    background: linear-gradient(to right, #365fdd, #36bbfa);
  }
  
</style>
