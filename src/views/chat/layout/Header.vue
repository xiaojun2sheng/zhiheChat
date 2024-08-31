<template>
  <div class="header flex justify-between items-center shrink-0">
    <span v-if="chatStore.agent"></span>
    <div class="flex gap-4">
      <span>{{ chatStore.chatInfo?.title?.substring(0, 20) }} </span>
    </div>
    <div v-if="chatStore.agent" class="" @click="showPanel">
      <SvgIcon
        :width="25"
        :height="25"
        icon="akar-icons:panel-split-row"
      ></SvgIcon>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script setup>
import { useChatStore } from "@/stores"

const chatStore = useChatStore()
const panelRef = ref()

const showPanel = () => {
  chatStore.switchPanel(!chatStore.panelShow)
}
</script>

<style lang="scss" scoped>
.header {
  height: 46px;
  position: relative;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  top: 0;
  left: 0;
  min-width: 375px;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  .mask {
    pointer-events: none;
    position: absolute;
    top: 46px;
    height: 44px;
    width: 100%;
    z-index: 100;
    background: linear-gradient(
      180deg,
      #0a0f18 0%,
      rgba(243, 245, 249, 0) 100%
    );
  }
}
</style>
