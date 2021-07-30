<!-- 货物添加 -->
<template>
  <view id="good-adder">

    <view class="top-control-group">
      <u-input class="input" border="true" placeholder="请输入货物名称" />
      <button class="btn blue">添加</button>
    </view>

    <view class="good-list">
      <view class="card good" v-for="(name, idx) in nameList" :key="idx">
        <view class="good-title">
          <view class="index">
            {{ idx + 1 }}、
          </view>
          <view class="title">
            {{ name }}
          </view>
        </view>
        <view class="control-group">
          <view class="edit">编辑</view>
          <view class="delete">删除</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import {localRead} from "../../lib/utils"

export default {
  data() {
    return {
      nameList:[]
    }
  },
  onLoad(){
    this.nameList = localRead('nameList') || []
  }
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng.scss";

#good-adder {
  @include background-common;

  // 控件组
  .top-control-group {
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
      height: 76rpx;
      line-height: 70rpx;
      border-radius: 8rpx;
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
