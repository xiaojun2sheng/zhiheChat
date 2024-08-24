<template>
  <div class="panel">
    <div class="title">
      <SvgIcon class="mr-2" :width="25" :height="25" :icon="icon"></SvgIcon>
      <span>{{ title }}</span>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="footer mt-2">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  icon: String,
  title: String,
})
</script>
<style lang="scss" scoped>
.panel {
  backdrop-filter: blur(6px);
  background: linear-gradient(
    196.58deg,
    rgba(57, 84, 90, 0.6) 2.65%,
    rgb(23, 27, 33),
    rgb(25, 36, 44) 90.18%
  );
  // border: 1px solid rgb(30, 49, 57);
  border-radius: 16px;
  padding: 10px;
  height: max-content;
  margin-bottom: 12px;
  .title {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .content {
    color: rgb(114, 116, 133);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
