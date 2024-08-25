<template>
  <div class="chat h-full w-full flex">
    <Nav></Nav>
    <div class="main h-full w-full">
      <Header v-if="!chatStore.isHistory"></Header>
      <div class="chat-content flex-1 w-full">
        <ChatContainer v-if="!chatStore.isHistory"></ChatContainer>
        <History v-else></History>
      </div>
    </div>
  </div>
</template>
<script setup>
import Nav from "./layout/Nav.vue"
import Header from "./layout/Header.vue"
import ChatContainer from "./components/chat-container/index.vue"
import History from "./components/history/index.vue"
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
    height: calc(100% - 50px);
    max-width: 792px;
  }
}
</style>
