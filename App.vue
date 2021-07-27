<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index";

.card {
  background: #FFFFFF;
  border-radius: 18rpx;
  margin-bottom: 24rpx;
  padding: 12rpx 18rpx;
}
</style>
