<template>
  <NLayout class="h-full" has-sider>
    <NLayoutSider
      :collapsed-width="0"
      :width="240"
      collapse-mode="transform"
      :show-collapsed-content="false"
      show-trigger="arrow-circle"
      bordered
      class="px-3 box-content bg-[#0A0F18]"
    >
      <ChatList></ChatList>
    </NLayoutSider>
    <NLayoutContent class="px-3 box-content bg-[#0A0F18]">
      <Chat></Chat>
    </NLayoutContent>
  </NLayout>
</template>
<script setup>
import Chat from "./components/chat-container/index.vue"
import ChatList from "./components/chat-list/index.vue"
import Side from "./components/side/index.vue"
</script>
<style lang="scss" scoped></style>
