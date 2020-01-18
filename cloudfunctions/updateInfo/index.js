const cloud = require('wx-server-sdk')
cloud.init({
  env: 'liaohch3-j5hup'
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	
	const my_openid = wxContext.OPENID
  try {
	 
    return await db.collection('login_users').where({
		_openid: my_openid
	})
      .update({
        data: {
          // openid: my_openid,
          // nickName: event.nickName,
          // avatarUrl: event.avatarUrl,
          // gender: event.gender,
          // province: event.province,
          // city: event.city,
          // country: event.country,
		  name: event.name,
		height: parseInt(event.height),
		weight: parseInt(event.weight),
		pos: event.pos,
		num: event.num
        },
      })
  } catch (e) {
    console.error(e)
  }
}
