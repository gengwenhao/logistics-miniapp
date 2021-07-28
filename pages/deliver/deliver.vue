<template>
  <view id="deliver">

    <!-- 订单信息 -->
    <view class="card order-info">
      <view class="order-detail">
        <view class="address-group">

          <view class="inner-con">
            <view class="icon-wrapper">
              <view class="divider"></view>
              <view class="icon-1">寄</view>
              <view class="divider"></view>
            </view>
            <view class="address-item">
              <view class="address-title">陈东东 2314123412342</view>
              <view class="address">福建省福州市鼓楼区华林路155号新华兴联合广场A座20层XXXXX</view>
            </view>
            <div class="to-address" @click="toAddressList">地址簿</div>
          </view>

          <view class="inner-con">
            <view class="icon-wrapper">
              <view class="divider"></view>
              <view class="icon-2">收</view>
              <view class="divider"></view>
            </view>

            <view class="address-item">
              <view class="address-title">陈东东 2314123412342</view>
              <view class="address">福建省福州市鼓楼区华林路155号新华兴联合广场A座20层XXXXX</view>
            </view>
            <view class="to-address" @click="toAddressList">地址簿</view>
          </view>

        </view>
      </view>
    </view>

    <!-- 货物信息 -->
    <view class="card goods-info">
      <view class="goods-title">货物信息
        <view class="add-good" @click="toGoodDetail">添加货物</view>
      </view>
      <view class="goods-con">
        <view class="goods-list">
          <view class="good-item">1、我是货物名称，在这里显示</view>
          <view class="good-item">2、我是货物名称，在这里显示</view>
          <view class="good-item">3、我是货物名称，在这里显示</view>
        </view>
        <view class="control" @click="toGoodDetail">
          更多
        </view>
      </view>
    </view>

    <!-- 服务要求 -->
    <view class="card service">
      <div class="title">服务要求</div>
      <div class="detail">
        <u-form :model="form" ref="uForm">
          <u-form-item label-width="140" required label="工厂名称">
            <u-input v-model="form.name"/>
          </u-form-item>
          <u-form-item label-width="140" required label="结算方式">
            <u-input v-model="form.name"/>
          </u-form-item>
          <u-form-item label-width="140" label="货物单号">
            <u-input v-model="form.name"/>
          </u-form-item>
          <u-form-item label-width="140" required label="运输方式">
            <u-input v-model="form.name"/>
          </u-form-item>
          <u-form-item label-width="140" required label="期望送达">
            <u-input v-model="form.name"/>
          </u-form-item>
        </u-form>
      </div>
    </view>

    <view class="card service-spe">
      <div class="detail">
        <u-form :model="form" ref="uForm">

          <u-form-item label-width="140" required label="提货">
            <u-radio-group v-model="value" @change="radioGroupChange">
              <u-radio @change="" name="客户自送">客户自送</u-radio>
              <u-radio @change="" name="客户自送">上门自提</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label-width="140" required label="送货">
            <u-radio-group v-model="value" @change="radioGroupChange">
              <u-radio @change="" name="客户自送">客户自提</u-radio>
              <u-radio @change="" name="客户自送">上门自提</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label-width="140" required label="装货">
            <u-radio-group v-model="value" @change="radioGroupChange">
              <u-radio @change="" name="客户自送">需要装货</u-radio>
              <u-radio @change="" name="客户自送">无需装货</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label-width="140" required label="卸货">
            <u-radio-group v-model="value" @change="radioGroupChange">
              <u-radio @change="" name="客户自送">需要卸货</u-radio>
              <u-radio @change="" name="客户自送">无需卸货</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label-width="140" required label="备注">
            <u-input type="textarea" border="true"/>
          </u-form-item>

          <button class="btn blue">提交订单</button>
        </u-form>
      </div>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        form: {
          name: ''
        }
      }
    }
  },
  methods: {
    // 跳转到货物详情
    toGoodDetail() {
      uni.navigateTo({
        url: '../good-detail/good-detail'
      })
    },
    // 跳转到地址簿
    toAddressList() {
      uni.navigateTo({
        url: '../address-list/address-list'
      })
    },
    // 选中任一radio时，由radio-group触发
    radioGroupChange(e) {
      console.log(e)
    },
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
@import '../../static/styles/scss/geng.scss';

#deliver {
  @include background-common;
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

          .to-address{
            width: 140rpx;
            border-left: 2rpx solid $bg-color-gray;
            display: flex;
            justify-content: center;
            align-items: center;
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
      display: flex;

      .add-good {
        margin-left: auto;
        margin-right: 8rpx;
        color: $font-color-blue;
      }
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
  .service,
  .service-spe {
    .title {
      font-size: $font-size-small;
      font-weight: bold;
      color: $font-color-black;
      padding-bottom: 14rpx;
      text-indent: 16rpx;
    }

    .detail {
      padding: $padding-common;
    }

    .btn{
      margin-top: 32rpx;
    }
  }
}
</style>
