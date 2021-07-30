// 地址管理
import gengReq from "../../lib/geng-request"

export default {
  // 编辑地址
  'updateAddress': (data) => gengReq({
    url: `/customer/Address/edit`,
    method: 'post',
    data
  }),
  //  删除地址
  'deleteAddress': (data) => gengReq({
    url: `/customer/Address/delete`,
    method: 'post',
    data
  }),
  // 分页查看地址
  'listAddress': (data) => gengReq({
    url: `/customer/Address/page`,
    method: 'get',
    data
  }),
  // 查看地址
  'getAddress': (id) => gengReq({
    url: `/customer/Address/${id}`,
    method: 'get'
  })
}