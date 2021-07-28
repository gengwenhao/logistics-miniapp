<template>
  <view id="address-editor">
    <div class="title">联系人信息</div>

    <div class="form-con">
      <div class="control-line">
        <u-input v-model="form.name" :type="type" placeholder="真实姓名"/>
      </div>

      <div class="control-line">
        <u-input v-model="form.tel" :type="type" placeholder="电话"/>
      </div>

      <div class="control-line">
        <u-input v-model="form.city" :type="type" placeholder="城市/区域"
                 @click="isShowCitySelector = true"/>
      </div>

      <div class="control-line">
        <u-input v-model="form.address" :type="type" placeholder="详细地址（例如**街**号**）"/>
      </div>
    </div>

    <div class="btn-con">
      <button class="btn red">清空</button>
      <button class="btn blue">确定</button>
    </div>


    <!-- 城市选择器 -->
    <u-city-select v-model="isShowCitySelector" @city-change="onCityChange"/>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // show flag
      isShowCitySelector: false,
      // form
      form: {
        name: '',
        tel: '',
        city: '',
        address: ''
      }
    }
  },
  methods: {
    // printInfo
    printInfo() {
      this.isShowCitySelector = true
      console.log('ggggggg')
    },
    // 城市选择事件
    onCityChange(e) {
      this.form.city = e.province.label + '-' + e.city.label + '-' + e.area.label;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../static/styles/scss/geng.scss";

#address-editor {
  @include background-white;
  padding: $padding-common;

  .title {
    font-size: $font-size-large;
    font-weight: bold;
  }

  .form-con {
    padding: $padding-common;

    .control-line {
      margin: 42rpx 12rpx;
      border-bottom: 2rpx solid $bg-color-gray;
    }
  }

  .btn-con {
    display: flex;
    flex-direction: row;

    button {
      width: calc(40% - 4rpx);
    }
  }
}
</style>