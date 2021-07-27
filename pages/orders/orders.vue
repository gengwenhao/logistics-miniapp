<template>
  <view id="orders">
    <u-row gutter="16">

      <!-- controls group -->
      <div class="controls-group bg-white">
        <u-input v-model="form.keyWord" :type="type" :border="true" placeholder="请输入订单编号"/>
      </div>

      <!-- card list -->
      <view class="card-list">
        <view class="card" v-for="item in 4" :key="item">
          <view class="title">
            <view class="title-l">订单号: 123412341234123</view>
            <view class="title-r">查看详情 ></view>
          </view>
          <view class="place">
            <view class="place-l">
              <view class="item">
                <view class="ch-1">南平市</view>
                <view class="ch-2">陈冬冬</view>
              </view>
            </view>
            <view class="place-c">
              <view class="item">
                <view class="ch-1">-></view>
                <view class="ch-2">已发货</view>
              </view>
            </view>
            <view class="place-r">
              <view class="item">
                <view class="ch-1">福州市</view>
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

    </u-row>
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
  methods: {}
}
</script>

<style scoped lang="scss">
#orders {
  background: rgba(242, 242, 242, 1);
  min-height: 100vh;
  height: 100%;

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

        .title-r{
          cursor: pointer;
        }
      }

      // 起始地址
      .place {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 46rpx;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .ch-1 {
            font-size: 40rpx;
            font-weight: bold;
          }

          .ch-2 {
            font-size: 24rpx;
            color: #AAAAAA;
          }
        }
      }

      // 最新物流
      .tip-1{
        height: 40rpx;
        line-height: 40rpx;
        font-size: 30rpx;
        overflow: hidden;
        border-radius: 2rpx solid #efefef;
        color: #AAAAAA;
      }

      // 更新时间
      .tip-2{
        height: 40rpx;
        line-height: 40rpx;
        font-size: 30rpx;
        overflow: hidden;
        color: #AAAAAA;
      }
    }
  }

}
</style>
