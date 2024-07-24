<template>
  <div class="usercenter_page">
    <n-popover placement="bottom" :width="300" trigger="click">
      <template #trigger>
        <n-button text type="primary">联系客服</n-button>
      </template>
      <div>
        <p>请扫描二维码联系客服人员</p>
        <img src="@/assets/images/help/weixinqun.jpg" />
      </div>
    </n-popover>
  </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
.usercenter_page {
  display: flex;
  font-size: 14px;
  .btn {
    width: 80px;
  }
}
</style>
