<template>
  <div class="chat_container">
    <div class="body _message_list">
      <MsgItem
        :item="{
          role: 'system',
          content: '您好，我是您的智能助理，快来提问试试吧！',
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
        class="ml40"
        size="small"
        round
        @click="sendRef?.handleStop"
      >
        停止接收
      </n-button>
    </div>

    <div class="footer">
      <Send
        class="w-full"
        ref="sendRef"
        @change="msgChange"
        @on-before="beforeSend"
        @on-end="endSend"
      ></Send>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { NButton } from "naive-ui"
import Send from "./Send.vue"
import MsgItem from "./MsgItem.vue"
import { positionDomViewBottom } from "@/utils"
import { useChatStore } from "@/stores"

const route = useRoute()
const chatStore = useChatStore()

watchEffect(() => {
  const { id } = route.params
  chatStore.initMessage(id)
  positionDomViewBottom()
})

const sendRef = ref()
const selectPrompt = (val) => {
  sendRef.value.setContent(val)
}

const beforeSend = (val) => {
  chatStore.addMessage(val)
  positionDomViewBottom()
}
const endSend = () => {
  chatStore.updateLastMessage("", "success")
}

const msgChange = (val) => {
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

  .header {
    height: 60px;
  }
  .body {
    margin: 10px 0;
    flex: 1;
    overflow: auto;
  }
  .footer {
    // height: 75px;
  }
}
</style>
