<template>
  <view id="address-editor">
    <div class="title">联系人信息</div>

    <div class="form-con">
      <div class="control-line">
        <u-input v-model="form.contacts" :type="type" placeholder="真实姓名"/>
      </div>

      <div class="control-line">
        <u-input v-model="form.phone" :type="type" placeholder="电话"/>
      </div>

      <div class="control-line">
        <u-input v-model="form.area" :type="type" placeholder="城市/区域"
                 @click="isShowCitySelector = true"/>
      </div>

      <div class="control-line">
        <u-input v-model="form.address" :type="type" placeholder="详细地址（例如**街**号**）"/>
      </div>
    </div>

    <div class="btn-con">
      <button class="btn red" @click="clearForm">重置</button>
      <button class="btn blue" @click="onSubmit">确定</button>
    </div>


    <!-- 城市选择器 -->
    <u-city-select v-model="isShowCitySelector" @city-change="onCityChange"/>
  </view>
</template>

<script>
import api from '../../api'
import {trimObj} from "../../lib/tools"
import {checkUpdateAddressFormValid, localRead } from "../../lib/utils"

export default {
  data() {
    return {
      // show flag
      isShowCitySelector: false,
      // form
      form: {
        id: null,
        contacts: '',
        phone: '',
        area: '',
        address: ''
      }
    }
  },
  computed: {
    queryData() {
      // copy obj
      let o = {...this.form}

      // handle area field
      if (this.form.area && this.form.area.includes('-')) {
        let items = this.form.area.split('-') || ''
        o.area = items.join('/')
      }

      // trim obj
      trimObj(o)

      return o
    }
  },
  methods: {
    // defined methods
    // 提交表单
    onSubmit() {
      checkUpdateAddressFormValid(this.form) && api.updateAddress(this.queryData)
          .then(res => {
            uni.navigateBack()
          }).catch(err => {
            console.log(err)
          })
    },
    // 城市选择事件
    onCityChange(e) {
      this.form.area = e.province.label + '-' + e.city.label + '-' + e.area.label;
    },
    // common methods
    // clear form
    clearForm() {
      // read storage
      let addressItem = localRead('addressItem')
      if (!addressItem) {
        uni.navigateBack()
        return -1
      }

      // update form
      this.form.address = addressItem.address
      this.form.area = addressItem.area
      this.form.contacts = addressItem.contacts
      this.form.phone = addressItem.phone

      // reset form
      // Object.assign(this.form, template)
    },
    // printInfo
    printInfo(data) {
      console.log(data)
    }
  },
  onLoad(data) {
    if (!data || !data.id) {
      return -1
    }

    // save addressId
    this.form.id = data.id

    // init form
    this.clearForm()

    // remove storage
    // localRemove('addressItem')
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