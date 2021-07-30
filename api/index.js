import settings from "./settings"
import gengReq from "./geng-request"

export default {
  // 登录
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
  // 完善个人信息
  'editUserInfo': (data) => gengReq({
    url: `/wx/miniApp/customer/${settings.APP_ID}/bindAccount`,
    method: 'post',
    data
  }),
  // 订单管理
  // 分页查看订单
  'listOrders': (data) => gengReq({
    url: `/front/customer/orderInfo/CustomerPage`,
    method: 'get',
    data
  })
}