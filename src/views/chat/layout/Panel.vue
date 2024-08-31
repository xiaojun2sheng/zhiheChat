<template>
  <div
    class="side-panel"
    :class="{
      open,
    }"
  >
    <div class="container flex flex-col h-full">
      <span class="flex justify-between p-4">
        <span class="text-lg">智能体工作台</span>
        <SvgIcon
          :width="25"
          :height="25"
          icon="mingcute:close-line"
          @click="chatStore.switchPanel(false)"
        ></SvgIcon>
      </span>
      <div class="p-4">
        <div class="agent-box mb-4">
          <p class="leading-7 text-base mb-2 font-semibold">火宝 +</p>
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
        <div v-if="!inAgentPanel" class="file-box">
          <p class="leading-7 text-base mb-2 font-semibold">会话中的文件</p>
          <template v-if="files?.length > 0">
            <div class="file" v-for="file in files"></div>
          </template>
          <div v-else class="empty-block">
            <img src="@/assets/file-empty.png" alt="" width="92" height="60" />
            <div class="intro">本轮会话暂无文件</div>
            <div class="des text-center text-xs">
              支持的文件格式：PDF、Word 文档（DOC、DOCX）、Excel
              表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD。
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="inAgentPanel"
        class="flex justify-center items-end flex-1 w-full mb-4"
      >
        <n-button round color="#5280FD" text-color="#ffffff" @click="newChat">
          开启新会话
        </n-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useChatStore } from "@/stores"
import { useRouter } from "vue-router"

const router = useRouter()
const chatStore = useChatStore()

const agents = computed(() => chatStore.panelData?.agents)
const files = computed(() => chatStore.panelData?.files)
const open = computed(() => chatStore.panelShow)
const inAgentPanel = computed(() => chatStore.navType === "3")

const newChat = () => {
  chatStore.resetChat()
  chatStore.setAgent(agents.value[0])
  router.push("/chat")
}
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
  .file-box {
    .file {
      width: 100%;
      height: 100px;
      background: #31313a;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .empty-block {
      padding: 20px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      border-radius: 12px;
      border: 1px dashed #45454e;
    }
  }
}
</style>
