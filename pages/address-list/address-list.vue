<!-- 地址簿 -->
<template>
  <view id="address-list">
    <!-- 控件组 -->
    <view class="control-group">
      <view class="btn blue" @click="toAddressAdder">新增地址</view>
      <u-search class="input" :border="true" placeholder="请输入姓名/手机号/地址"/>
    </view>

    <view class="address-group">
      <view class="card address" v-for="(item, idx) in addressList" :key="idx">
        <view class="information">
          <view class="name-line">
            <view class="name">{{ item.contacts }}</view>
            <view class="tel">{{ item.phone }}</view>
          </view>
          <div class="place-line">
            {{ item.area }} {{ item.address }}
          </div>
        </view>
        <view class="edit-group">
          <view class="inner-con">
            <view class="edit-item" @click="toAddressEditor(item)">编辑</view>
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
import api from '../../api'
import {trimObj} from "../../lib/tools"
import {localSave, showLoading} from "../../lib/utils"

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
        limit: 20,
        page: 1
      },
      // 地址列表
      addressList: []
    }
  },
  computed: {
    queryData() {
      // copy form
      let o = {...this.form}

      // delete

      trimObj(o)

      return o
    }
  },
  methods: {
    // 跳转到地址编辑页面
    toAddressEditor(item) {
      if (!item || !item.id) return -1

      // save item
      localSave('addressItem', item)

      // top age
      uni.navigateTo({
        url: `../address-editor/address-editor?id=${item.id}`
      })
    },
    // 跳转到地址新增页面
    toAddressAdder() {
      uni.navigateTo({
        url: '../address-adder/address-adder'
      })
    },
    queryPage() {
      // show loading icon
      showLoading()
      // query data
      api.listAddress(this.queryData).then(({data}) => {
        console.log(data)

        // stop loading animate
        uni.hideLoading()

        // update orderlsit
        this.addressList = data.records
      }).catch(err => {
        uni.hideLoading()
        console.log(err)
      })
    },
    queryMorePage() {
      // play bottom animate
      this.loadStatus = 'loading'

      // modify query length
      this.form.limit += 20

      // query more data
      api.listAddress(this.queryData).then(({data}) => {
        console.log(data)

        // stop animate
        this.loadStatus = null

        // roll back form modify
        if (data.records.length === this.addressList.length) {
          this.form.limit -= 20
        }

        // update local
        this.addressList = data.records
      }).catch(err => {
        // stop animate
        this.loadStatus = null
        console.log(err)
      })
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    uni.stopPullDownRefresh()
    this.queryPage()
  },
  // 到达底部
  onReachBottom() {
    this.queryMorePage()
  },
  onLoad() {
    this.queryPage()
  },
  onShow() {
    this.queryPage()
  }
}
</script>

<style scoped lang="scss">
@import '../../static/styles/scss/geng.scss';

#address-list {
  @include background-common;

  // 控件组
  .control-group {
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background: $bg-color-white;
    display: flex;
    align-items: center;
    padding-left: 20rpx;

    .input {
      width: calc(100% - 200rpx);
      margin-right: 8rpx;
    }

    .btn {
      width: 170rpx;
      height: 64rpx;
      line-height: 64rpx;
      margin-right: 8rpx;
      //border-radius: 8rpx;
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
        font-size: $font-size-small;

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
