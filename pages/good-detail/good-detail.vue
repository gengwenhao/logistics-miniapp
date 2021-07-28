<!-- 货物详情 -->
<template>
  <view id="good-detail">
    <div class="card good" v-for="item in 9" :key="item">
      {{ item + 1 }}、我是货物名称，在这里显示
    </div>
    <view class="more">
      <u-loadmore icon-type="flower" :status="loadStatus" :load-text="loadText"/>
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
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng.scss";

#good-detail {
  @include background-common;
  padding: 32rpx;
}
</style>
