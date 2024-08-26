<template>
  <div class="history px-4 h-full flex flex-col">
    <div
      class="close w-[35px] h-[35px] absolute top-[80px] left-[20px] flex justify-center items-center rounded-md cursor-pointer"
      @click="chatStore.setNavType('1')"
    >
      <SvgIcon
        :width="25"
        :height="25"
        color="#ffffff"
        icon="mingcute:close-line"
      ></SvgIcon>
    </div>
    <p class="title text-4xl font-bold text-center my-4">历史会话</p>
    <div class="search h-[60px] mb-4 flex-shrink-0">
      <n-input
        class="h-full rounded-2xl"
        v-model:value="filter"
        placeholder="搜索"
      >
        <template #prefix>
          <SvgIcon
            :width="25"
            :height="25"
            icon="mingcute:search-line"
          ></SvgIcon>
        </template>
      </n-input>
    </div>
    <div class="chat-list w-full h-full overflow-auto">
      <template v-if="chatStore.chatList.length > 0">
        <ChatItem
          v-for="item in filterList"
          class="mb-2"
          :item="item"
          :active="item.id == chatStore.chat.id"
          :key="item.id"
          @on-remove="chatStore.delChat"
        ></ChatItem>
      </template>
      <NEmpty v-else description="暂无数据" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { useChatStore } from "@/stores"
import ChatItem from "./Item.vue"

const chatStore = useChatStore()
onMounted(() => {})

const filter = ref("")
const filterList = computed(() => {
  return chatStore.chatList.filter((item) => {
    return filter.value ? item.name.includes(filter.value) : item
  })
})
</script>
<style lang="scss" scoped>
.close {
  background-color: #cc525f;
}
:deep(.n-input) {
  .n-input__input-el {
    height: 100% !important;
  }
}
</style>
