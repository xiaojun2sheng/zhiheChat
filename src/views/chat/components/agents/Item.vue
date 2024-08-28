<template>
  <div class="agent-card" @click="selectAgent">
    <div class="card_left">
      <div class="MuiBox-root css-5nczy5">
        <img
          :src="item.avatar"
          alt=""
          style="border-radius: 50%; width: 100%; height: 100%"
        />
      </div>
    </div>
    <div class="card_right">
      <p class="font-semibold">{{ item.name }}</p>
      <p class="my-2">{{ item.intro }}</p>
      <p class="">来自{{ item.creator }}</p>
    </div>
  </div>
</template>

<script setup>
import { robotList } from "@/utils"
import { copy } from "@/utils"
import { useChatStore } from "@/stores"

const chatStore = useChatStore()
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})

const handlerAction = (type, item) => {
  if (type == "copy") {
    copy(item.prompt)
    $message.success("复制成功")
  }
}

const list = ref(robotList)

const selectAgent = () => {
  chatStore.setPanelData(props.item)
  chatStore.switchPanel(true)
}
</script>
<style lang="scss" scoped>
.agent-card {
  width: 372px;
  height: 100px;
  background: #31313a;
  // margin-bottom: 12px;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  cursor: pointer;
  transition: all 0.3s ease;
  border-color: transparent;
  position: relative;
  .card_left {
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }
  .card_right {
    flex: 1 1;
    position: relative;
  }
}
</style>
