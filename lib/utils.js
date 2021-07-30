// 业务相关工具

// 显示网络加载
export function showLoading() {
  uni.showLoading({
    title: '加载中'
  })
}

// 写入本地缓存
export function localSave(key, value) {
  uni.setStorage({
    key,
    data: value
  })
}

// 读取本地缓存
export function localRead(key) {
  return uni.getStorageSync(key)
}

// 移除本地缓存
export function localRemove(key) {
  uni.removeStorageSync(key)
}

// 检验编辑、新增地址表单
export function checkUpdateAddressFormValid(form) {
  if (!form) {
    return false
  }

  return true
}

// 检验绑定账号表单
export function checkBindAccountFormValid(form) {
  let reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/

  if (!form) {
    return false
  } else if (!form.phone) {
    uni.showModal({
      title: '请输入手机号',
      showCancel: false
    })

    // reset phone
    form.phone = null

    return false
  } else if (!reg.test(form.phone)) {
    uni.showModal({
      title: '请检查你输入的手机号码',
      showCancel: false
    })

    // reset password
    form.phone = null

    return false
  } else if (!form.password) {
    uni.showModal({
      title: '请输入密码',
      showCancel: false
    })

    // reset password
    form.password = null

    return false
  }

  return true
}