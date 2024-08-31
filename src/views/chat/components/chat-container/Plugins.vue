<template>
  <div class="plugins" v-if="chatStore.agent">
    <div class="tag">
      <div class="flex justify-center items-center">
        <div class="talking">
          和
          <span class="name">{{ chatStore.agent.name }}</span>
          聊聊
        </div>
        <SvgIcon icon="mingcute:close-line" @click="close"></SvgIcon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useChatStore, useAppStore } from "@/stores"

const appStore = useAppStore()
const chatStore = useChatStore()

const close = () => {
  chatStore.setAgent()
}
</script>
<style lang="scss" scoped>
.plugins {
  display: flex;
  gap: 10px;
  padding: 12px 16px 4px 12px;
  display: flex;
  align-items: center;
  .tag {
    height: 30px;
    padding: 4px 6px 4px 8px;
    background-color: #31313a;
    display: flex;
    align-items: center;
    border-radius: 10px;
    gap: 10px;
    .talking {
      color: #e0ecffcc;
      font-family: PingFang SC;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.25px;
      text-align: center;
      display: flex;
      gap: 4px;
      margin: 0 8px 0 4px;
      .name {
        font-weight: bold;
      }
    }
  }
}
</style>
