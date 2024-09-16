<template>
  <div class="chat_container px-4">
    <div
      v-if="chatStore.messageList?.length > 0"
      class="body _message_list pt-10"
    >
      <MsgItem
        :item="{
          role: 'system',
          content: '您好，我是火宝，快来提问试试吧！',
        }"
        role="gpt"
        position="left"
      ></MsgItem>
      <MsgItem
        v-for="item in chatStore.messageList"
        :key="item"
        :item="item"
        :position="item.role == 'user' ? 'right' : 'left'"
        role="gpt"
      ></MsgItem>
      <!-- v-if="sendRef?.running" -->
      <n-button
        v-if="sendRef?.running"
        class="mb-4"
        size="small"
        round
        @click="sendRef?.handleStop"
      >
        停止接收
      </n-button>
    </div>
    <Homepage v-else @hot-item-select="hotItemSelect"></Homepage>
    <div class="footer">
      <AgentPanel ref="agentPanelRef"></AgentPanel>
      <Send
        class="w-full"
        ref="sendRef"
        @change="msgChange"
        @search-change="searchMsgChange"
        @on-before="beforeSend"
        @on-end="endSend"
        @on-error="onError"
        @switch-agent-panel="switchAgentPanel"
      ></Send>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { NButton } from "naive-ui"
import Send from "./Send.vue"
import MsgItem from "./MsgItem.vue"
import { positionDomViewBottom } from "@/utils"
import { useChatStore } from "@/stores"
import AgentPanel from "./AgentPanel.vue"
import Homepage from "./Homepage.vue"
import { useAgent } from "./useAgent"

const router = useRouter()
const route = useRoute()
const chatStore = useChatStore()
const sendRef = ref()
const { sendContent, agentPanelRef, switchAgentPanel } = useAgent(sendRef)

watchEffect(() => {
  const { id } = route.params
  chatStore.initMessage(id)
  positionDomViewBottom()
})

const hotItemSelect = (val) => {
  sendRef.value.shortcut(val)
}

let newId = ""
const beforeSend = async (val) => {
  // 首页问答需要先新增
  let { id } = route.params
  if (!id) {
    id = chatStore.createChat()
    newId = id
  }
  chatStore.addMessage(val)
  positionDomViewBottom()
}
const onError = () => {
  chatStore.updateLastMessage("", "success")
}
const endSend = () => {
  chatStore.updateLastMessage("", "success")
  if (newId) {
    router.push({ name: "chat", params: { id: newId } })
    newId = undefined
  }
}

const searchMsgChange = (val) => {
  chatStore.updateLastMessage("", "", val)
  positionDomViewBottom()
}
const msgChange = (val) => {
  sendContent.value = val
  chatStore.updateLastMessage(val)
  positionDomViewBottom()
}

let handleStop
onMounted(() => {
  console.log("加载")
  handleStop = sendRef.value.handleStop
})
onUnmounted(() => {
  console.log("卸载")
  // 切换问答，终止流
  endSend()
  handleStop?.()
})
</script>
<style lang="scss" scoped>
.chat_container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .body {
    flex: 1;
    overflow: auto;
  }
  .footer {
    position: relative;
    max-height: 145px;
  }
}
</style>
