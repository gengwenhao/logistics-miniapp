// 货物管理
import gengReq from "../../lib/geng-request"

export default {
  // 新增货物
  'addGood': (data) => gengReq({
    url: `/customer/orderGoods`,
    method: 'post',
    data
  }),
  // 编辑货物
  'updateGood': (data) => gengReq({
    url: `/customer/orderGoods`,
    method: 'put',
    data
  }),
  //  删除货物
  'deleteGood': (data) => gengReq({
    url: `/customer/orderGoods`,
    method: 'post',
    data
  }),
  // 分页查看货物
  'listGood': (data) => gengReq({
    url: `/customer/orderGoods/page`,
    method: 'get',
    data
  }),
  // 查看货物
  'getGood': (id) => gengReq({
    url: `/customer/orderGoods/${id}`,
    method: 'get'
  })
}