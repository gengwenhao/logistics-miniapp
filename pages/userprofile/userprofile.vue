<template>
  <view id="userprofile">
    <u-row gutter="16">

      <!-- 顶部 -->
      <view class="avatar-panel">
        <u-image width="150rpx" height="150rpx" src="../../../static/images/avatar.png" shape="circle"/>
        <view class="nickname">哆唻A梦</view>
      </view>

      <!-- 功能组 -->
      <view class="tool-list">
        <view class="card tool">
          <u-image width="60rpx" height="60rpx" src="../../../static/images/地址簿图标.png"/>
          <view class="tool-title" @click="toAddressList">地址簿</view>
        </view>
      </view>

      <!-- 退出登录 -->
      <view class="logout-panel">
        <view class="btn">退出登录</view>
      </view>

    </u-row>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
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
  background: rgba(242, 242, 242, 1);
  min-height: 100vh;
  height: 100%;

  // 头像面板
  .avatar-panel {
    background: #FFFFFF;
    height: 180rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 80rpx;

    .nickname {
      text-indent: 38rpx;
      font-size: 35rpx;
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
    position: fixed;
    bottom: 150rpx;

    .btn {
      width: 45vw;
      height: 95rpx;
      line-height: 95rpx;
      background: #FFFFFF;
      font-size: 34rpx;
      border: 2rpx solid #939393;
      border-radius: 12rpx;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
