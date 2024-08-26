<!-- 消息列表卡片 -->
<template>
  <div
    class="chat-item w-full flex justify-between items-center p-2 rounded-lg cursor-pointer h-[46px]"
    :class="{ 'is-active': active }"
    @click="selectChat"
  >
    <span class="title truncate w-[80%]">{{ item.name.substring(0, 80) }}</span>
    <div class="actions">
      <SvgIcon
        :width="18"
        :height="18"
        hover
        icon="ic:outline-delete"
      ></SvgIcon>
    </div>
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
  chatStore.setNavType('1')
  chatStore.initMessage(props.item.id)
//   positionDomViewBottom()
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
  background-color: #31313a;
  
  .actions {
    opacity: 0;
  }
  &:hover,
  &.is-active {
    background-color: #45454e;
    .right {
      display: flex;
    }
    .actions {
        opacity: 1;
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
