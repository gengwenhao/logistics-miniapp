import settings from "./settings"
import {localRemove} from "../lib/utils"

const HOST = process.env.NODE_ENV === 'development' ? settings.DEV_HOST : settings.HOST

export default function gengRequest(options = {}) {

  // 拼接url
  options.url = `${HOST}${options.url}`

  //配置请求头
  options.header = {
    'token': `${uni.getStorageSync('token') || null}`
  }

  // 封装promise
  return new Promise((resolved, rejected) => {
    // 成功
    options.success = (res) => {
      switch (Number(res.data.code)) {
        case 0:
          // 访问成功
          resolved(res.data)
          break
        case 10021:
          // token 失效
          // remove token
          localRemove('token')
          uni.navigateTo({url: '../../pages/login/login'})
          break
        default:
          uni.showToast({
            icon: 'none',
            duration: 3000,
            title: `${res.data.msg}`
          })
          rejected(res.data)
          break
      }
    }

    // 失败
    options.fail = (err) => {
      rejected(err)
    }

    // 请求
    uni.request(options)
  })

}
