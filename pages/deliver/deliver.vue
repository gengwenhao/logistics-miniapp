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
            <view class="address-item" v-if="form.sender">
              <view class="address-title">{{ form.sender || '暂无' }} {{
                  form.senderPhone || ''
                }}
              </view>
              <view class="address">{{ form.senderArea }} {{ form.senderAddress || '暂无' }}</view>
            </view>
            <view class="address-item" v-else>
              暂未选择
            </view>
            <div class="to-address" @click="toAddressList('send')">地址簿</div>
          </view>

          <view class="inner-con">
            <view class="icon-wrapper">
              <view class="divider"></view>
              <view class="icon-2">收</view>
              <view class="divider"></view>
            </view>

            <view class="address-item" v-if="form.receiver">
              <view class="address-title">{{ form.receiver || '暂无' }} {{
                  form.receiverPhone || ''
                }}
              </view>
              <view class="address">{{ form.receiverArea }} {{ form.receiverAddress || '暂无' }}</view>
            </view>
            <view class="address-item" v-else>
              暂未选择
            </view>
            <view class="to-address" @click="toAddressList('receive')">地址簿</view>
          </view>

        </view>
      </view>
    </view>

    <!-- 货物信息 -->
    <view class="card goods-info">
      <view class="goods-title">货物信息
        <view class="add-good" @click="toGoodAdder">添加货物</view>
      </view>
      <view class="goods-con">
        <view class="goods-list" v-if="form.goodList.length > 0">
          <view class="good-item" v-for="(name, idx) in form.goodList.slice(0, 3)" :key="idx">{{ idx + 1 }}、{{
              name
            }}
          </view>
        </view>
        <view class="goods-list" style="text-indent: 46rpx;" v-else>
          暂未选择
        </view>
        <view class="control" @click="toGoodAdder">
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
            <u-input v-model="form.factoryName" type="select"
                     @click="isShowFactoryNameSelector = true"/>
            <u-action-sheet :list="factoryList"
                            v-model="isShowFactoryNameSelector"
                            @click="handleSelectedFactory"/>
          </u-form-item>

          <u-form-item label-width="140" required label="结算方式">
            <u-input v-model="form.settlementName" type="select"
                     @click="isShowSettleNameSelector = true"/>
            <u-action-sheet :list="settlementWayList"
                            v-model="isShowSettleNameSelector"
                            @click="handleSelectedSettlementWay"/>
          </u-form-item>

          <u-form-item label-width="140" label="货物单号">
            <u-input v-model="form.orderCode"/>
          </u-form-item>

          <u-form-item label-width="140" required label="运输方式">
            <u-input v-model="form.transportName" type="select"
                     @click="isShowTransportNameSelector = true"/>
            <u-action-sheet :list="transportWayList"
                            v-model="isShowTransportNameSelector"
                            @click="handleSelectedTransportWay"/>
          </u-form-item>

          <u-form-item label-width="140" required label="期望送达">
            <uni-datetime-picker type="datetime"
                                 :border="false"
                                 v-model="form.deliveryPlanTime"
                                 @change="printInfo($event)"/>
          </u-form-item>

        </u-form>
      </div>
    </view>

    <view class="card service-spe">
      <div class="detail">
        <u-form :model="form" ref="uForm">

          <!-- 提货方式 -->
          <u-form-item label-width="140" required label="提货">
            <u-radio-group v-model="form.pickUpWayName">
              <u-radio @change="form.pickUpWayCode = 'customer_delivery'" name="客户自送">客户自送</u-radio>
              <u-radio @change="form.pickUpWayCode = 'home_take_delivery'" name="上门提货">上门提货</u-radio>
            </u-radio-group>
          </u-form-item>
          <!-- 选择上门提货时有时间控件 -->
          <u-form-item label-width="140" required label="提货时间" v-if="form.pickUpWayCode === 'home_take_delivery'">
            <uni-datetime-picker type="datetime"
                                 :border="false"
                                 v-model="form.pickUpTime"/>
          </u-form-item>

          <!-- 送货方式 -->
          <u-form-item label-width="140" required label="送货">
            <u-radio-group v-model="form.deliveryWayName">
              <u-radio @change="form.deliveryWayCode = 'customer_take'" name="客户自提">客户自提</u-radio>
              <u-radio @change="form.deliveryWayCode = 'home_delivery'" name="客户送货">上门送货</u-radio>
            </u-radio-group>
          </u-form-item>
          <!-- 选择上门送货时有时间控件 -->
          <u-form-item label-width="140" required label="送货时间" v-if="form.deliveryWayCode === 'home_delivery'">
            <uni-datetime-picker type="datetime"
                                 :border="false"
                                 v-model="form.deliveryTime"/>
          </u-form-item>

          <!-- 装货方式 -->
          <u-form-item label-width="140" required label="装货">
            <u-radio-group v-model="form.isLoading">
              <u-radio name="1">需要装货</u-radio>
              <u-radio name="0">无需装货</u-radio>
            </u-radio-group>
          </u-form-item>

          <!-- 卸货方式 -->
          <u-form-item label-width="140" required label="卸货">
            <u-radio-group v-model="form.isUnload">
              <u-radio name="1">需要卸货</u-radio>
              <u-radio name="0">无需卸货</u-radio>
            </u-radio-group>
          </u-form-item>

          <!-- 备注 -->
          <u-form-item label-width="140" label="备注">
            <u-input type="textarea" border="true" v-model="form.remarks"/>
          </u-form-item>

          <button class="btn blue" @click="onSubmit">提交订单</button>
        </u-form>
      </div>
    </view>

  </view>
</template>

<script>
import {checkUpdateOrderFormValid, localRead, localRemove} from "../../lib/utils"
import api from '../../api'
import {trimObj} from "../../lib/tools"

export default {
  data() {
    return {
      // show panel flag
      // 工厂名选择器
      isShowFactoryNameSelector: false,
      // 结算方式选择器
      isShowSettleNameSelector: false,
      // 结算方式选择器
      isShowTransportNameSelector: false,
      // 表单
      form: {
        // 地址信息
        // 发件人
        sender: null,
        // 发件人手机号
        senderPhone: null,
        // 发件详细地址
        senderAddress: null,
        // 发件区域
        senderArea: null,
        // 收件人
        receiver: null,
        // 收件人手机号
        receiverPhone: null,
        // 收件人详细地址
        receiverAddress: null,
        // 收件人区域
        receiverArea: null,

        // 货物信息
        // 货物列表
        goodList: [], // modify

        // 服务要求
        // 选中工厂名
        factoryName: null, // del
        // 选中工厂ID
        factoryId: null,
        // 选中结算方式
        settlementName: null,
        // 选中结算方式ID
        settlementWayCode: null,
        // 货物单号
        orderCode: null,
        // 选中运输方式
        transportName: null,
        // 选中运输方式的编码
        transportWayCode: null,
        // 期望送达时间
        deliveryPlanTime: null,

        // 其他要求
        // 是否装货
        isLoading: null,
        // 是否卸货
        isUnload: null,
        // 送货预约时间
        deliveryTime: null,
        // 提货预约时间
        pickUpTime: null,
        // 提货方式
        pickUpWayCode: null,
        // 提货方式名称
        pickUpWayName: null,
        // 送货方式
        deliveryWayCode: null,
        // 送货方式名称
        deliveryWayName: null,
        // 备注
        remarks: null
      },
      // 工厂列表
      factoryList: [],
      // 结算方式
      settlementWayList: [],
      // 运输方式
      transportWayList: []
    }
  },
  computed: {
    queryData() {
      // prepare obj
      let o = {...this.form}

      // delete field
      delete o.factoryName

      // create good list
      if (this.form.goodList && this.form.goodList.length > 0) {
        o.goodList = {
          goodsName: o.goodList.join('/') + '/',
          volume: '',
          weight: '',
          quantity: ''
        }
      }

      // trim empty value
      trimObj(o)

      return o
    }
  },
  methods: {
    printInfo(e) {
      console.log(e)
    },
    // 提交表单
    onSubmit() {
      if (!this.form) return -1
      checkUpdateOrderFormValid(this.form) && api.createOrder(this.queryData)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
    },
    // 选中工厂
    handleSelectedFactory(idx) {
      if (idx > -1 && idx < this.factoryList.length) {
        this.form.factoryName = this.factoryList[idx].key
        this.form.factoryId = this.factoryList[idx].value
      }
    },
    // 选中结算方式
    handleSelectedSettlementWay(idx) {
      if (idx > -1 && idx < this.settlementWayList.length) {
        this.form.settlementName = this.settlementWayList[idx].key
        this.form.settlementWayCode = this.settlementWayList[idx].value
      }
    },
    // 选中运输方式
    handleSelectedTransportWay(idx) {
      if (idx > -1 && idx < this.transportWayList.length) {
        this.form.transportName = this.transportWayList[idx].key
        this.form.transportWayCode = this.transportWayList[idx].value
      }
    },
    // 跳转到货物详情
    toGoodAdder() {
      uni.navigateTo({
        url: '../good-adder/good-adder'
      })
    },
    // 跳转到地址簿，选择地址
    toAddressList(type) {
      uni.navigateTo({
        url: '../address-list/address-list?canBeSelected=true&type=' + type
      })
    },
    // 查询工厂配置选项
    queryOptionList() {
      Promise.all([api.getCustomerFactory(), api.getSettleWay(), api.getTransportWay()])
          .then(res => {
            this.factoryList = res[0].data.map(item => {
              item.text = item.key
              return item
            })
            this.settlementWayList = res[1].data.map(item => {
              item.text = item.key
              return item
            })
            this.transportWayList = res[2].data.map(item => {
              item.text = item.key
              return item
            })
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  onLoad() {
    // 清空本地表单存储
    localRemove('sendData')
    localRemove('receiverData')
    localRemove('goodList')

    // 查询表单可选择参数
    this.queryOptionList()
  },
  onShow() {
    // 提取发件人信息
    const sendData = localRead('sendData')
    this.form.sender = sendData.contacts || null
    this.form.senderPhone = sendData.phone || null
    this.form.senderAddress = sendData.address || null
    this.form.senderArea = sendData.area || null
    // 提取收件人信息
    const receiverData = localRead('receiverData')
    this.form.receiver = receiverData.contacts || null
    this.form.receiverPhone = receiverData.phone || null
    this.form.receiverAddress = receiverData.address || null
    this.form.receiverArea = receiverData.area || null

    this.form.goodList = localRead('goodList')
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

          .to-address {
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

    .btn {
      margin-top: 32rpx;
    }
  }
}
</style>
