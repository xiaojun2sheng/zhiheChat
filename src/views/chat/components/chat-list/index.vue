<template>
  <div>
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
      <MessageItem
        v-for="item in chatStore.chatList"
        class="mb-2"
        :item="item"
        :active="item.id == chatStore.chat.id"
        :key="item.id"
        @on-remove="chatStore.delChat"
      ></MessageItem>
    </template>
    <NEmpty v-else description="暂无数据" />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import MessageItem from "./item.vue"
import { useChatStore } from "@/stores"

const chatStore = useChatStore()
onMounted(() => {
  chatStore.initChat()
})
</script>
<style lang="scss" scoped>
.message-list {
  min-height: 70vh;
  .list {
    overflow: auto;
    flex: 1;
  }
  .loading {
    // @include flex-layout();
    gap: 5px;
    height: 45px;
    font-size: 14px;
    color: #7c87ae;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .no-more {
    height: 45px;
  }
}
</style>
