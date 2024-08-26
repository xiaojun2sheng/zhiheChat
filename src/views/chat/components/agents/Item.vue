<template>
  <div class="agent-card">
    <div class="card_left">
      <div class="MuiBox-root css-5nczy5">
        <img
          src="https://kimi-img.moonshot.cn/prod-chat-kimi/avatar/kimiplus/prompt.png"
          alt=""
          style="border-radius: 50%; width: 100%; height: 100%"
        />
      </div>
    </div>
    <div class="card_right">
      <p class="">提示词专家</p>
      <p class="my-2">零门槛成为提示词大师，更好地向 火宝 提问</p>
      <p class="">来自火宝</p>
    </div>
  </div>
</template>

<script setup>
import { robotList } from "@/utils"
import { copy } from "@/utils"
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
</script>
<style lang="scss" scoped>
.agent-card {
  max-width: 372px;
  height: 100px;
  background: #31313a;
  margin-bottom: 12px;
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
