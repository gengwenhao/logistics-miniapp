<!-- 登录 -->
<template>
  <view id="login">
    <div class="card">
      <view class="title">
        <view class="text-1">申请获取以下权限</view>
        <view class="text-2">获得你的公开信息（昵称、头像、手机等）</view>
      </view>
      <u-button class="btn-login" lang="zh_CN" size="default" open-type="getUserInfo" withCredentials="true"
                @getuserinfo="getUserInfo">微信授权登录
      </u-button>
    </div>
  </view>
</template>

<script>
import api from '../../api'
import {localRead, localSave} from "../../lib/utils"

export default {
  data() {
    return {
      // 定时器
      interval: null
    }
  },
  methods: {
    // 获取wxcode，必须在getUserInfo之前调用
    getWXCode() {
      // 获取wxcode
      wx.login({
        success(res) {
          if (!res.code) {
            uni.showToast({
              title: '授权获取失败',
              icon: 'none'
            })

            return -1
          }

          // 存储code，登录用户
          localSave('code', res.code)
        }
      })
    },
    // 微信小程序授权
    getUserInfo(res) {
      const self = this

      // 判断网络状态
      if (res.detail.errMsg === "getUserInfo:fail network offline") {
        uni.showModal({
          content: '请检查手机是否已连接网络',
          showCancel: false
        })

        return -1
      } else if (!res.detail.iv) {
        uni.showToast({
          title: "您取消了授权，登录失败",
          icon: "none"
        })

        return -1
      }

      // 存储用户信息
      localSave('detail', res.detail)

      // 请求后端登录用户
      self.login()
    },
    // 使用 wxcode 向后端发送登录请求
    login() {
      // 获取code
      const code = localRead('code') || null
      if (!code) return -1

      // 登录
      api.authorityLogin({code}).then(res => {
        // save token
        localSave('token', res.data.token)

        // clear interval
        if (this.interval) clearInterval(this.interval)

        // to home page
        uni.switchTab({
          url: '../orders/orders'
        })
      }).catch(err => {
        if (200 === err.code) {
          // save sessionKey
          localSave('sessionKey', err.data.sessionKey)

          // to editor page
          uni.navigateTo({
            url: '../userprofile-editor/userprofile-editor'
          })
        }
      })
    }
  },
  onLoad() {
    this.getWXCode()
    this.interval = setInterval(() => {
      this.getWXCode()
    }, 30000)
  }
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng";

#login {
  @include background-common;
  background: $bg-color-gray;
  padding: $padding-common;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 400rpx;
    padding: $padding-common;

    .title {
      text-align: center;

      .text-1 {
        font-size: $font-size-lm;
        margin-bottom: 22rpx;
      }

      .text-2 {
        font-size: $font-size-medium;
        color: $font-color-gray;
      }
    }

    .btn-login {
      margin-top: 40rpx;

    }
  }
}

</style>