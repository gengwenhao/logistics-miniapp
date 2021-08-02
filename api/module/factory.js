// 工厂管理
import gengReq from "../../lib/geng-request"

export default {
  // 获取客户关联工厂
  'getCustomerFactory': () => gengReq({
    url: `/customer/factory/getCustomerFactory`,
    method: 'get'
  })
}