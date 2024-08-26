<template>
  <div class="chat h-full w-full flex">
    <Nav></Nav>
    <div class="main h-full w-full flex flex-col">
      <Header v-if="chatStore.navType === '1'"></Header>
      <div class="chat-content flex-1 w-full h-full">
        <ChatContainer v-if="chatStore.navType === '1'"></ChatContainer>
        <History v-if="chatStore.navType === '2'"></History>
        <Agents v-if="chatStore.navType === '3'"></Agents>
      </div>
    </div>
  </div>
</template>
<script setup>
import Nav from "./layout/Nav.vue"
import Header from "./layout/Header.vue"
import ChatContainer from "./components/chat-container/index.vue"
import History from "./components/history/index.vue"
import Agents from "./components/agents/index.vue"
import { useChatStore } from "@/stores"
import { onMounted } from "vue"

const chatStore = useChatStore()
onMounted(() => {
  chatStore.initChat()
})
</script>
<style lang="scss" scoped>
.chat {
  // background-color: #292932;
  .chat-content {
    transition: all 0.2s ease;
    margin: 0 auto;
    height: calc(100% - 46px);
    padding-bottom: 10px;
    max-width: 792px;
  }
}
</style>
