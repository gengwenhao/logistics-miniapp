// 货物选项
import gengReq from "../../lib/geng-request"
import settings from "../../settings"

export default {
  // 获取结算方式
  'getSettleWay': () => gengReq({
    url: `/customer/dict/getOptionList`,
    method: 'get',
    data: {
      dictType: 'settlement_way'
    }
  }),
  // 获取运输方式
  'getTransportWay': () => gengReq({
    url: `/customer/dict/getOptionList`,
    method: 'get',
    data: {
      dictType: 'transport_way_code'
    }
  })
}