const cloud = require('wx-server-sdk')
cloud.init({
  env: 'liaohch3-j5hup'
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	
  try {
    return await   db.collection('wait').where({
		  _openid: wxContext.OPENID
	  }).remove()
  
  } catch (e) {
    console.error(e)
  }
}
