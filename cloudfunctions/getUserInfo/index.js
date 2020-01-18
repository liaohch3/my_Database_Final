// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
	
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//   }
// }

const cloud = require('wx-server-sdk')
cloud.init({
  env: 'liaohch3-j5hup'
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
	var data = {};
await db.collection('login_users').get().then(res => {
	  data = res;
    }) 
  return {
    event,
	res_data: data
  }
}