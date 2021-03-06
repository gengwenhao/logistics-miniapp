// 订单管理
import gengReq from "../../lib/geng-request"

export default {
  // 分页查看订单
  'listOrder': (data) => gengReq({
    url: `/customer/orderInfo/CustomerPage`,
    method: 'get',
    data
  }),
  // 查看订单
  'getOrder': (data) => gengReq({
    url: `/customer/orderInfo/detail`,
    method: 'get',
    data
  }),
  // 客户下单
  'createOrder': (data) => gengReq({
    url: `/customer/orderInfo/customerPlaceOrder`,
    method: 'post',
    data
  })
}