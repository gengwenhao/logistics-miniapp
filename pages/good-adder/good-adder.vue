<!-- 货物添加 -->
<template>
  <view id="good-adder">

    <view class="top-control-group">
      <u-input class="input" border="true" placeholder="请输入货物名称" v-model="goodName"/>
      <button class="btn blue" @click="handleEditGoodConfirm" v-if="isEditor">编辑</button>
      <button class="btn blue" @click="handleAddGood" v-else>添加</button>
    </view>

    <view class="good-list">
      <view class="card good" v-for="(name, idx) in goodList" :key="idx">
        <view class="good-title">
          <view class="index">
            {{ idx + 1 }}、
          </view>
          <view class="title">
            {{ name }}
          </view>
        </view>
        <view class="control-group">
          <view class="edit" @click="handleEditItem(name, idx)">编辑</view>
          <view class="delete" @click="handleDeleteItem(idx)">删除</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import {localRead, localSave} from "../../lib/utils"

export default {
  data() {
    return {
      goodList: [],
      goodName: '',
      // 显示模式（默认显示添加，不显示编辑）
      isEditor: false,
      // 编辑的货物序号
      editIdx: -1
    }
  },
  watch: {
    goodList: {
      handler(val) {
        localSave('goodList', val)
      },
      deep: true
    }
  },
  methods: {
    // 确认添加货物事件
    handleAddGood() {
      if (!this.goodName) return -1
      this.goodList.push(this.goodName)
      this.goodName = ''
    },
    // 确认编辑货物事件
    handleEditGoodConfirm() {
      if (!this.goodName || this.editIdx >= this.goodList.length) return -1
      this.goodList.splice(this.editIdx, 1, this.goodName)
      this.goodName = ''
      this.isEditor = false
    },
    // 删除货物
    handleDeleteItem(idx) {
      // clear editor status
      this.isEditor = false
      this.goodName = ''

      let self = this
      uni.showModal({
        title: '确定删除该货物？',
        success(res) {
          console.log(idx)
          if (res.confirm) {
            self.goodList.splice(idx, 1)
          }
        }
      })
    },
    // 编辑货物
    handleEditItem(name, idx) {
      if (!name || idx >= this.goodList.length) return -1
      this.isEditor = true
      this.editIdx = idx
      this.goodName = name
    }
  },
  onLoad() {
    this.goodList = localRead('goodList') || []
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

    .input {
      width: calc(100% - 200rpx);
    }

    .btn {
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
