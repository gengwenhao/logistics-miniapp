<!-- 个人中心 -->
<template>
  <view id="userprofile">

    <!-- 顶部 -->
    <view class="avatar-panel">
      <u-image width="130rpx" height="130rpx" :src="avatarImgUrl" shape="circle"/>
      <view class="nickname">{{ nickName }}</view>
    </view>

    <!-- 功能组 -->
    <view class="tool-list">
      <view class="card tool" @click="toAddressList">
        <u-image width="60rpx" height="60rpx" src="../../../static/images/address.png"/>
        <view class="tool-title">地址簿</view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-panel">
      <view class="btn" @click="onLogout">退出登录</view>
    </view>

  </view>
</template>

<script>
import {localRead, localRemove} from "../../lib/utils"

export default {
  data() {
    return {}
  },
  computed: {
    avatarImgUrl() {
      return localRead('detail').userInfo.avatarUrl || '../../../static/images/avatar.png'
    },
    nickName() {
      return localRead('detail').userInfo.nickName || '未知昵称'
    }
  },
  methods: {
    // 退出登录事件
    onLogout() {
      // remove token
      localRemove('token')
      // to login page
      uni.navigateTo({
        url: '../login/login'
      })
    },
    // 跳转到地址簿
    toAddressList() {
      uni.navigateTo({
        url: '../address-list/address-list'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../static/styles/scss/geng.scss';

#userprofile {
  @include background-common;
  display: flex;
  flex-direction: column;
  color: $font-color-black;

  // 头像面板
  .avatar-panel {
    background: #FFFFFF;
    height: 180rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 50rpx;

    .nickname {
      text-indent: 38rpx;
      font-size: $uni-font-size-base;
    }
  }

  // 功能组
  .tool-list {
    padding: 30rpx 20rpx;

    .tool {
      height: 110rpx;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-size: 30rpx;
      color: #333333;

      .tool-title {
        margin-left: 18rpx;
      }
    }
  }

  // 退出登录
  .logout-panel {
    width: 100vw;
    margin-top: auto;
    margin-bottom: 80rpx;

    .btn {
      width: 45vw;
      height: 80rpx;
      line-height: 80rpx;
      background: #FFFFFF;
      color: $font-color-black;
      font-size: 34rpx;
      border: 2rpx solid #939393;
      border-radius: 12rpx;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
