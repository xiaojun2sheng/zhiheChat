<template>
  <div class="agents w-full h-full flex flex-col items-center overflow-auto">
    <div class="banner">
      <img src="@/assets/chat-plus-bg.jpg" />
    </div>
    <div class="content">
      👋 大家好，这里是 火宝 的新朋友们 <br />
      和 火宝 聊天时，随时@fire+，召唤你的私人助理
    </div>
    <div class="flex flex-wrap gap-5 min-w-[760px]">
      <Item :item="item" v-for="item in agents"></Item>
    </div>
  </div>
</template>
<script setup>
import { useAgent } from "./useAgent"
import Item from "./Item.vue"

const { agents } = useAgent()
</script>
<style lang="scss" scoped>
.agents {
  .content {
    // width: 686px;
    font-size: 16px;
    line-height: 24px;
    margin: 24px auto;
    text-align: center;
  }
}
</style>
