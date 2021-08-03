<!-- 完善个人信息，未绑定手机号的用户登录时会跳转到该页面 -->
<template>
  <view id="userprofile-editor">
    <div class="card">
      <view class="title">请先完善个人信息</view>
      <div class="detail">
        <u-form :model="form" ref="uForm">
          <u-form-item required label="电话号" label-width="140">
            <u-input v-model="form.phone" type="mobile" placeholder="请输入电话号"/>
          </u-form-item>
          <u-form-item required label="密码" label-width="140">
            <u-input v-model="form.password" type="password" placeholder="请输入密码"/>
          </u-form-item>
        </u-form>
      </div>
      <div class="btn blue" @click="onSubmit">提交</div>
    </div>
  </view>
</template>

<script>
import api from '../../api'
import {checkBindAccountFormValid, localRead, localSave} from "../../lib/utils"
import {trimObj} from "../../lib/tools"

export default {
  data() {
    return {
      form: {
        password: null,
        phone: null
      }
    }
  },
  computed: {
    queryData() {
      // 复制对象
      let o = {...this.form}

      // 添加字段
      o.code = localRead('code') || null
      o.encryptedData = localRead('detail').encryptedData || null
      o.iv = localRead('detail').iv || null
      o.sessionKey = localRead('sessionKey') || null

      // 删除对象空项
      trimObj(o)

      return o
    }
  },
  methods: {
    // 提交用户信息
    onSubmit() {
      checkBindAccountFormValid(this.form) && api.bindAccount(this.queryData).then(res => {
        console.log(res)
        // save token
        localSave('token', res.data.token)
        // back page
        uni.navigateBack()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../static/styles/scss/geng.scss';

#userprofile-editor {
  @include background-common;
  display: flex;
  flex-direction: column;
  font-size: $font-size-small;
  padding: $padding-common;

  .card {
    .title {
      font-size: $font-size-large;
    }

    .detail {
      padding: $padding-common;
    }

    .btn {
      margin-top: 50rpx;
      height: 70rpx;
      line-height: 70rpx;
    }
  }
}
</style>
