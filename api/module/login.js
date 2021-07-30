// 登录
import gengReq from "../../lib/geng-request"
import settings from "../../settings"

export default {
  // 授权登录
  'authorityLogin': (data) => gengReq({
    url: `wx/miniApp/customer/${settings.APP_ID}/authorityLogin`,
    method: 'post',
    data
  }),
  // 根据微信code 判断该微信用户是否已经在系统中存在
  'getWxUserState': () => gengReq({
    url: `wx/miniApp/customer/${settings.APP_ID}/getWxUserState`,
    method: 'get'
  }),
  // 绑定个人信息
  'bindAccount': (data) => gengReq({
    url: `/wx/miniApp/customer/${settings.APP_ID}/bindAccount`,
    method: 'post',
    data
  })
}