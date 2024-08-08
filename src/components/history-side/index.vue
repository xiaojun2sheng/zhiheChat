<template>
  <div class="history-side">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({})
</script>
<style lang="scss" scoped>
.history-side {
  border: 1px solid rgb(46, 49, 54);
  height: calc(100% - 30px);
  border-radius: 12px 12px 0px 0px;
  padding: 16px 15px 15px;
  background-color: rgb(13, 17, 22);
  overflow-y: auto;
  transition: width 0.2s ease 0s;
  display: flex;
  flex-direction: column;
  width: 150px;
  .header {
  }
  .content {
  }
}
</style>
