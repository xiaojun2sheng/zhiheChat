<template>
  <div
    class="side-panel"
    :class="{
      open,
    }"
  >
    <div class="container">
      <span class="flex justify-between p-4">
        <span class="text-lg">工作台</span>
        <SvgIcon
          :width="25"
          :height="25"
          icon="mingcute:close-line"
          @click="open = false"
        ></SvgIcon>
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
const open = ref(false)
const show = () => {
  open.value = !open.value
}
const close = () => {
  open.value = false
}

const switchShow = () => {
  open.value = !open.value
}
defineExpose({ switchShow, show, close })
</script>
<style lang="scss">
.side-panel {
  position: fixed;
  z-index: 100;
  right: 0;
  top: 120px;
  background-color: transparent;
  width: 0;
  transition: width 0.3s ease;
  &.open {
    width: 440px;
  }
  .container {
    z-index: 100;
    position: relative;
    background-color: #262630;
    border: 1px solid #45454e;
    width: 420px;
    height: calc(100vh - 140px);
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>
