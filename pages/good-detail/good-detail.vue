<!-- 货物详情 -->
<template>
  <view id="good-detail">

    <view class="controls-group">
      <u-input class="input" border="true"/>
      <button class="btn blue">添加</button>
    </view>

    <view class="good-list">
      <view class="card good" v-for="item in 9" :key="item">
        <view class="good-title">
          <view class="index">
            {{ item + 1 }}、
          </view>
          <view class="title">
            我是货物名称，在这里显示
          </view>
        </view>
        <view class="control-group">
          <view class="edit">编辑</view>
          <view class="delete">删除</view>
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
      }
    }
  },
  methods: {},
  // 下拉刷新事件
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng.scss";

#good-detail {
  @include background-common;

  // 控件组
  .controls-group {
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: $bg-color-white;
    display: flex;
    align-items: center;
    padding-left: 20rpx;

    .input{
      width: calc(100% - 200rpx);
    }


    .btn{
      width: 180rpx;
      height: 70rpx;
      line-height: 70rpx;
    }
  }

  // 商品列表
  .good-list {
    padding: $padding-common;

    .good {
      margin: 16rpx 0;

      .good-title {
        .index {
          margin-bottom: 8rpx;
          text-indent: 0;
        }

        .title {
          text-indent: 16rpx;
          padding-bottom: 20rpx;
        }

        font-size: $font-size-small;
        color: $font-color-black;
        border-bottom: 2rpx solid $bg-color-gray;
      }

      .control-group {
        margin-top: 8rpx;
        font-size: $font-size-small;
        color: $font-color-gray;
        display: flex;

        .edit {
          margin-left: auto;
          margin-right: 19rpx;
        }
      }
    }
  }
}
</style>
