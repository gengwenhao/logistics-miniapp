<template>
  <view id="order-detail">

    <!-- 订单信息 -->
    <view class="card order-info">
      <view class="order-title">订单号：
        <view class="order-sn">{{ orderId || '' }}</view>
      </view>
      <view class="order-detail">
        <view class="address-group">

          <view class="inner-con">
            <view class="icon-wrapper">
              <view class="divider"></view>
              <view class="icon-1">寄</view>
              <view class="divider"></view>
            </view>
            <view class="address-item">
              <view class="address-title">{{ orderDetail.sender || '未知发件人' }} {{ orderDetail.senderPhone || '' }}</view>
              <view class="address">{{ orderDetail.senderAddress || '未知发件人地址' }}</view>
            </view>
          </view>

          <view class="inner-con">
            <view class="icon-wrapper">
              <view class="divider"></view>
              <view class="icon-2">收</view>
              <view class="divider"></view>
            </view>

            <view class="address-item">
              <view class="address-title">{{ orderDetail.receiver || '未知收件人' }} {{
                  orderDetail.receiverPhone || ''
                }}
              </view>
              <view class="address">{{ orderDetail.receiverAddress || '未知收件人地址' }}</view>
            </view>
          </view>

        </view>
      </view>
    </view>

    <!-- 物流信息 -->
    <view class="card express-info">
      <view class="express-title">物流信息</view>
      <view class="express-detail">
      <view class="express-line" v-for="(item, idx) in orderDetail.flowList" :key="idx">
          <view class="status-name">{{ item.flowTypeCode | flowTypeDisplay }}</view>
          <view class="status-icon">
            <view class="inner-icon"></view>
            <view class="divider"></view>
          </view>
          <view class="status-detail">
            <view class="detail-date">
              {{ item.flowTime }}
            </view>
            <view class="detail-text">
              {{ item.flowAddress || '暂无' }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 货物信息 -->
    <view class="card goods-info">
      <view class="goods-title">货物信息</view>
      <view class="goods-con" v-if="goodsInfo.nameList && goodsInfo.nameList.length > 0">
        <view class="goods-list">
          <view class="good-item"
                v-for="(name, idx) in goodsInfo.nameList.slice(0, 3)" :key="idx">
            {{ idx + 1 }}、{{ name }}
          </view>
        </view>
        <view class="control" v-if="goodsInfo.nameList.length > 3"
              @click="toGoodDetail(goodsInfo.nameList)">更多
        </view>
      </view>
      <view v-else style="text-align: center;margin:18rpx">暂无货物信息</view>
    </view>

    <view class="card service-info">
      <view class="service-title">服务要求</view>
      <view class="service-detail">
        <view class="detail-line">
          <view class="detail-key">工厂名称</view>
          <view class="detail-value">{{ orderDetail.factoryName || '未知工厂名称' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">结算方式</view>
          <view class="detail-value">{{ orderDetail.settlementWayName || '未知结算方式' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">货物单号</view>
          <view class="detail-value">{{ orderDetail.orderCode || '货物单号' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">运输方式</view>
          <view class="detail-value">{{ orderDetail.transportWayName || '未知运输方式' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">期望送达</view>
          <view class="detail-value">{{ orderDetail.deliveryPlanTime || '未知期望送达时间' }}</view>
        </view>
      </view>
    </view>

    <view class="card service-info">
      <view class="service-detail">
        <view class="detail-line">
          <view class="detail-key">提货</view>
          <view class="detail-value">{{ orderDetail.pickUpWayName || '未知提货方式' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">送货</view>
          <view class="detail-value">{{ orderDetail.deliveryWayName || '未知送货方式' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">装货</view>
          <view class="detail-value">{{ orderDetail.isLoadingName || '未知是否装货' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">卸货</view>
          <view class="detail-value">{{ orderDetail.isUnloadName || '未知是否卸货' }}</view>
        </view>
        <view class="detail-line">
          <view class="detail-key">备注</view>
          <view class="detail-value">{{ orderDetail.remarks || '未知订单备注' }}</view>
        </view>
      </view>
      <view class="service-sub-detail">
        <view class="detail" v-if="goodsInfo.quantity">数量：{{ goodsInfo.quantity }}</view>
        <view class="detail" v-if="goodsInfo.volume">体积：{{ goodsInfo.volume }}</view>
        <view class="detail" v-if="goodsInfo.weight">重量：{{ goodsInfo.weight }}</view>
      </view>
    </view>

  </view>
</template>

<script>
import api from '../../api'
import {trimObj} from "../../lib/tools"
import {localRemove, localSave} from "../../lib/utils"

export default {
  data() {
    return {
      orderId: null,
      orderDetail: null
    }
  },
  computed: {
    goodsInfo() {
      // prepare obj
      let o = {}

      // copy object
      if (this.orderDetail &&
          this.orderDetail.goodsList &&
          this.orderDetail.goodsList.length > 0) {
        o = {...this.orderDetail.goodsList[0]}

        // extract info
        if (this.orderDetail.goodsList[0].goodsName) {
          let namesStr = this.orderDetail.goodsList[0].goodsName || ''
          namesStr = namesStr.endsWith('/') ? namesStr.slice(0, namesStr.length - 1) : namesStr
          o.nameList = namesStr.split('/')
        }

        // trim object
        trimObj(o)
      }

      return o
    }
  },
  filters:{
    flowTypeDisplay(val){
      if(!val) return ''
      switch (val) {
        case 'new_order':
          return '未接受'
        case 'depart':
          return '已发货'
        case 'arrive':
          return '在途'
        case 'sign_for':
          return '已签收'
        default:
          return ''
      }
    }
  },
  methods: {
    // 跳转到货物详情
    toGoodDetail(nameList) {
      // save data
      localRemove('nameList')
      localSave('nameList', nameList)

      // to page
      uni.navigateTo({
        url: '../good-detail/good-detail'
      })
    },
    queryPage() {
      if (!this.orderId) return -1
      // send data
      api.getOrder({orderId: this.orderId}).then(({data}) => {
        this.orderDetail = data
      })
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  onLoad(data) {
    this.orderId = data.orderId
    this.queryPage()
  }
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng.scss";

#order-detail {
  @include background-common;
  //background: $bg-color-gray;
  //min-height: 100vh;
  //height: 100%;
  padding: 30rpx;

  // 订单信息
  .order-info {
    .order-title {
      font-size: $font-size-small;
      font-weight: bold;
      color: $font-color-black;
      padding-bottom: 14rpx;
      border-bottom: 2rpx solid $bg-color-gray;
      text-indent: 16rpx;

      .order-sn {
        display: inline-block;
        color: $font-color-gray;
        text-indent: 0;
      }
    }

    .order-detail {
      padding-top: 28rpx;
      font-size: $font-size-small;
      color: $font-color-black;

      .address-group {
        width: 100%;

        .inner-con {
          display: flex;
          flex-direction: row;

          &:first-child {
            .divider:first-child {
              opacity: 0;
            }

            .divider:last-child {
              margin-top: 10rpx;
            }
          }

          &:last-child {
            .divider:last-child {
              opacity: 0;
            }

            .divider:first-child {
              margin-bottom: 10rpx;
            }
          }

          .icon-wrapper {
            width: 30rpx;
            margin-left: 30rpx;
            margin-right: 30rpx;
            display: flex;
            flex-direction: column;
            justify-content: center;

            align-items: center;

            .divider {
              border-right: 2rpx dotted $font-color-gray;
              flex: 1;
            }

            .icon-1 {
              display: inline-block;
              text-align: center;
              width: 100%;
              height: 30rpx;
              line-height: 30rpx;
              background: $bg-color-blue;
              color: #FFFFFF;
              border-radius: 6rpx;
              position: relative;
            }

            .icon-2 {
              display: inline-block;
              text-align: center;
              width: 100%;
              height: 30rpx;
              line-height: 30rpx;
              background: $bg-color-green;
              color: #FFFFFF;
              border-radius: 6rpx;
              position: relative;
            }
          }

          .address-item {
            padding: 14rpx;
            flex: 1;

            &:nth-child(1) {
              border-bottom: 2rpx solid $bg-color-gray;
            }

            .address-title {
              color: $font-color-black;
              font-size: $font-size-small;
              line-height: $font-size-small;
              margin-bottom: 8rpx;
            }

            .address {
              color: $font-color-gray;
            }
          }
        }
      }
    }
  }

  // 物流信息
  .express-info {
    font-size: $font-size-small;

    .express-title {
      color: $font-color-black;
      font-weight: bold;
      padding-bottom: 14rpx;
      border-bottom: 2rpx solid $bg-color-gray;
      text-indent: 16rpx
    }

    .express-detail {
      display: flex;
      flex-direction: column;
      padding: 32rpx 16rpx;

      // 每一条物流信息
      .express-line {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        color: $font-color-gray;

        // 状态：未发货、已发货
        .status-name {
          width: 80rpx;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
        }

        // 状态圆点
        .status-icon {
          width: 80rpx;

          display: flex;
          flex-direction: column;
          align-items: center;

          .divider {
            border-right: 2rpx dotted $font-color-gray;
            flex: 1;
          }

          .inner-icon {
            width: $font-size-small;
            height: $font-size-small;
            border-radius: 50%;
            background: $font-color-gray;
          }

        }

        // 物流详情
        .status-detail {
          flex: 1;
          padding-bottom: 24rpx;

          .detail-date {
            padding-bottom: 12rpx;
          }
        }

        // 第一个圆点点亮
        &:first-child {
          .status-name {
            color: $bg-color-blue;
          }

          .inner-icon {
            background: $bg-color-blue;
          }

          .status-detail {
            color: $font-color-black;
          }
        }

        // 最后一个圆点没竖线
        &:last-child {
          .divider {
            opacity: 0;
          }
        }
      }
    }
  }

  // 货物信息
  .goods-info {
    font-size: $font-size-small;

    .goods-title {
      font-size: $font-size-small;
      font-weight: bold;
      color: $font-color-black;
      padding-bottom: 14rpx;
      text-indent: 16rpx;
    }

    .goods-con {
      display: flex;
      align-items: stretch;
      padding: 22rpx 0;

      .goods-list {
        margin-right: auto;

        .good-item {
          text-indent: 16rpx;
          padding: 8rpx;
        }
      }

      .control {
        width: 94rpx;
        border-left: 2rpx solid $bg-color-gray;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  // 服务要求
  .service-info {
    font-size: $font-size-small;

    .service-title {
      font-size: $font-size-small;
      font-weight: bold;
      color: $font-color-black;
      padding-bottom: 14rpx;
      text-indent: 16rpx;
    }

    .service-detail {
      padding: 36rpx;

      .detail-line {
        display: flex;
        margin: 28rpx;


        .detail-key {
          width: 100rpx;
          text-align: center;
          padding-right: 4rpx;
        }

        .detail-value {
          flex: 1;
          text-indent: 18rpx;
          border-bottom: 2rpx solid $bg-color-gray;
        }
      }
    }

    .service-sub-detail {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 40rpx;
    }
  }
}
</style>
