// 导入api可以使用所有接口，例如：api.updateAddress
import login from "./module/login"
import address from "./module/address"
import good from "./module/good"
import order from "./module/order"
import factory from "./module/factory"
import option from "./module/option"

export default {
  // 登录相关接口
  ...login,
  // 订单相关接口
  ...order,
  // 货物相关接口
  ...good,
  // 地址相关接口
  ...address,
  // 工厂相关接口
  ...factory,
  // 货物服务要求参数相关接口（结算方式、运输方式）
  ...option
}