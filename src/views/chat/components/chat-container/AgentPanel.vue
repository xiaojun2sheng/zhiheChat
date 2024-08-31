<template>
  <div class="agent-panel" :class="{ show: visible }">
    <div class="agent-panel__header">
      <div class="panel__header__title">火宝 +</div>
      <div class="panel__header__close cursor-pointer" @click="close">✕</div>
    </div>
    <div class="agent-panel__content">
      <div
        class="agent-panel__content__item"
        v-for="item in agentList"
        @click="selectAgent(item)"
      >
        <n-avatar round size="small" :src="item.avatar" />
        <div class="panel__content__item__name">{{ item.name }}</div>
        <div class="panel__content__item__content">{{ item.intro }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { agentList } from "@/utils"
import { useChatStore } from "@/stores"

const chatStore = useChatStore()

const selectAgent = (item) => {
  chatStore.setPanelData(item, null)
  chatStore.setAgent(item)
  close()
}

const visible = ref(false)
const switchShow = () => {
  visible.value = !visible.value
}
const show = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
}

defineExpose({ show, close, switchShow })
</script>
<style lang="scss" scoped>
.agent-panel {
  position: absolute;
  transform: translateY(-101%);
  width: 100%;

  background-color: #45454e;
  box-shadow: 0px 8px 25px 0px #0000000d;
  display: flex;
  flex-direction: column;
  z-index: 100;
  height: 0px;
  transition: all 0.1s linear;
  z-index: -1;
  &.show {
    z-index: 1;
    height: 180px;
    padding: 0 8px 8px;
    border-radius: 12px;
    border: 1px solid #595965;
  }
  .agent-panel__header {
    color: #f5f9fff2;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }
  .agent-panel__content {
    height: 200px;
    outline: none;
    overflow-y: auto;
    position: relative;
    transition: height 0.1s linear;
    .agent-panel__content__item {
      cursor: pointer;
      padding: 6px 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 8px;
      &:hover {
        background-color: #3a3a44;
      }
      .panel__content__item__name {
        color: #ffffff;
        font-weight: bold;
      }
      .panel__content__item__content {
        color: #e0ecffcc;
      }
    }
  }
}
</style>
