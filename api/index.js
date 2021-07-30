// 导入api可以使用所有接口，例如：api.updateAddress
import login from "./module/login"
import address from "./module/address"
import good from "./module/good"
import order from "./module/order"

export default {
  // 登录相关接口
  ...login,
  // 订单相关接口
  ...order,
  // 货物相关接口
  ...good,
  // 地址相关接口
  ...address
}