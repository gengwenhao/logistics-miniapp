<template>
  <view id="address-list">
    <!-- 控件组 -->
    <view class="control-group">
      <view class="control">
        <view class="btn blue">新增地址</view>
      </view>
      <view class="control">
        <u-input v-model="form.keyWord" height="60" :type="type" :border="true" placeholder="请输入姓名/手机号/地址"/>
      </view>
    </view>

    <view class="address-group">
      <view class="card address" v-for="item in 9" :key="item">
        <view class="information">
          <view class="name-line">
            <view class="name">陈东东</view>
            <view class="tel">13299999555</view>
          </view>
          <div class="place-line">
            福建省福州市鼓楼区华林路155号新华兴联合广场A座20层XXXXXXXXXX
          </div>
        </view>
        <view class="edit-group">
          <view class="inner-con">
            <view class="edit-item">编辑</view>
            <view class="edit-item">删除</view>
          </view>
        </view>
      </view>
      <view class="more">
        <u-loadmore icon-type="flower" :status="loadStatus" :load-text="loadText"/>
      </view>
    </view>


  </view>
</template>

<script>
export default {
  data() {
    return {
      // 加载状态
      loadStatus: null,
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '没有更多数据了'
      },
      form: {
        keyWord: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../static/styles/scss/geng.scss';

#address-list {
  min-height: 100vh;
  height: 100%;
  background: $bg-color-gray;

  // 控件组
  .control-group {
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 23rpx;

    // 按钮
    .control:nth-child(1) {
      flex: 1;
      height: 64rpx;
      line-height: 64rpx;
      margin-right: 20rpx;
    }

    // 输入框
    .control:nth-child(2) {
      flex: 2;
    }
  }

  // 地址列表
  .address-group {
    padding: 22rpx;

    .address {

      // 信息
      .information {
        border-bottom: 2rpx solid #f2f2f2;
        padding-bottom: 24rpx;
        padding-top: 24rpx;

        .name-line {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          font-size: $font-size-medium;
          color: #333333;

          .tel {
            text-indent: 46rpx;
          }

        }

        .place-line {
          color: #8f8d8e;
          padding-top: 8rpx;
          font-size: $font-size-small;
        }
      }

      // 编辑
      .edit-group {
        padding: 16rpx 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        color: #8f8d8e;

        .inner-con {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .edit-item {
            margin-right: 26rpx;
          }
        }
      }
    }
  }
}
</style>
