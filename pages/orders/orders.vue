<template>
  <view id="orders">

    <!-- controls group -->
    <div class="controls-group bg-white">
      <u-input v-model="form.keyWord" :type="type" :border="true" placeholder="请输入订单编号"/>
    </div>

    <!-- card list -->
    <view class="card-list">
      <view class="card" v-for="item in 4" :key="item">
        <view class="title">
          <view class="title-l">订单号: 123412341234123</view>
          <view class="title-r" @click="toOrderDetail">查看详情 ></view>
        </view>
        <view class="place">
          <view class="place-l">
            <view class="item">
              <view class="ch-1" style="width: 120rpx;height: 120rpx;line-height: 120rpx">南平市</view>
              <view class="ch-2">陈冬冬</view>
            </view>
          </view>
          <view class="place-c">
            <view class="item">
                <image style="width: 128rpx;height: 120rpx;" src="../../static/images/arrow.png" />
              <view class="ch-2">已发货</view>
            </view>
          </view>
          <view class="place-r">
            <view class="item">
              <view class="ch-1" style="width: 120rpx;height: 120rpx;line-height: 120rpx">福州市</view>
              <view class="ch-2">陈冬</view>
            </view>
          </view>
        </view>
        <view class="tip-1">最新物流：物流到达XXXXXXXXX准备发往XXXXXXXXX</view>
        <view class="tip-2">更新时间：2021-02-02 10:20:10</view>
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
      },
      orderList: []
    }
  },
  methods: {
    // 跳转到订单详情
    toOrderDetail(){
      uni.navigateTo({
        url: '../order-detail/order-detail'
      })
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng.scss";

#orders {
  @include background-common;

  .bg-white {
    background: #FFFFFF;
  }


  .controls-group {
    padding: 30rpx;
  }

  .card-list {
    padding: 34rpx;

    .card {

      // 订单号
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32rpx;
        font-size: $font-size-small;
        color: $font-color-black;
      }

      // 起始地址
      .place {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 46rpx;
        color: $font-color-black;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .ch-1 {
            font-size: 40rpx;
            font-weight: bold;
          }

          .ch-2 {
            font-size: $font-size-small;
            color: $font-color-gray;
          }
        }
      }

      // 更新时间，最新物流
      .tip-2,
      .tip-1 {
        height: 40rpx;
        line-height: 40rpx;
        font-size: $font-size-small;
        overflow: hidden;
        color: #AAAAAA;
      }
    }
  }

}
</style>
