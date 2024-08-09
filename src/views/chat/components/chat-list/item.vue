<!-- 消息列表卡片 -->
<template>
  <div
    class="chat-item w-full flex justify-between p-2 rounded-md cursor-pointer"
    :class="{ 'is-active': active }"
    @click="selectChat"
  >
    <p class="title truncate">{{ item.name }}</p>
    <n-dropdown trigger="click" :options="options" @select="dropdownSelect">
      <SvgIcon :width="18" :height="18" hover icon="ri:more-fill"></SvgIcon>
    </n-dropdown>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores"
import router from "@/router"

const chatStore = useChatStore()
const emit = defineEmits(["on-remove"])
const props = defineProps({
  active: Boolean,
  item: Object,
})
const selectChat = async () => {
  chatStore.setChat(props.item)
  router.push({ name: "chat", params: { id: props.item.id } })
}

const options = ref([{ label: "删除", key: "delete" }])
const dropdownSelect = (key) => {
  if (key == "delete") {
    emit("on-remove", props.item.id)
  }
}
</script>
<style lang="scss" scoped>
.chat-item {
  box-sizing: border-box;
  .title {
    width: 80%;
  }
  &:hover,
  &.is-active {
    background-color: #eff4fd;
    .right {
      display: flex;
    }
  }
}
.dark {
  .chat-item {
    &:hover,
    &.is-active {
      background-color: #202024;
    }
  }
}
</style>
