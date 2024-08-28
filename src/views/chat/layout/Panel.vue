<template>
  <div
    class="side-panel"
    :class="{
      open,
    }"
  >
    <div class="container">
      <span class="flex justify-between p-4">
        <span class="text-lg">智能体工作台</span>
        <SvgIcon
          :width="25"
          :height="25"
          icon="mingcute:close-line"
          @click="open = false"
        ></SvgIcon>
      </span>
      <div class="p-4">
        <div class="agent-box">
          <div
            class="agent-bg"
            v-for="agent in agents"
            :style="{ background: `url(${agent.avatar})` }"
          >
            <div class="agent">
              <div class="name">{{ agent.name }}</div>
              <div class="intro">{{ agent.intro }}</div>
              <div class="creator">来自 {{ agent.creator }}</div>
            </div>
          </div>
        </div>
        <div class="file-box">
          <template>
            <div class="file" v-for="file in files"></div>
          </template>
        </div>
        <h2>敬请期待</h2>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { useChatStore } from "@/stores"

const chatStore = useChatStore()
const open = ref(false)

const agents = computed(() => chatStore.panelData?.agents)
const files = computed(() => chatStore.panelData?.files)

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
  .agent-box {
    .agent-bg {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
      background-position: -10px center !important;
      background-size: 200px;
      background-repeat: no-repeat;
      border-radius: 13px;
    }
    .agent {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      padding: 24px 12px 24px 152px;
      background: linear-gradient(
        90deg,
        rgba(49, 49, 58, 0) 0.02%,
        rgba(49, 49, 58, 0.86) 34.85%,
        #31313a 44.47%
      );
    }
  }
}
</style>
