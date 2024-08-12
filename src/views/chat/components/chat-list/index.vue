<template>
  <div class="h-full">
    <div class="chat-list">
      <div class="flex justify-between items-center mb-2">
        <span></span>
        <SvgIcon
          class="mr-2"
          :width="20"
          :height="20"
          icon="uil:edit"
          @click="chatStore.createChat"
        ></SvgIcon>
      </div>
      <template v-if="chatStore.chatList.length > 0">
        <ChatItem
          v-for="item in chatStore.chatList"
          class="mb-2"
          :item="item"
          :active="item.id == chatStore.chat.id"
          :key="item.id"
          @on-remove="chatStore.delChat"
        ></ChatItem>
      </template>
      <NEmpty v-else description="暂无数据" />
    </div>
    <Actions></Actions>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import ChatItem from "./item.vue"
import Actions from "./actions.vue"
import { useChatStore } from "@/stores"

const chatStore = useChatStore()
onMounted(() => {
  chatStore.initChat()
})
</script>
<style lang="scss" scoped>
.chat-list {
  height: calc(100% - 100px);
  overflow: auto;
}
</style>
