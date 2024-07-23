<template>
  <div class="header_box" hadow="always">
    <div class="logo">AI 百宝箱</div>
    <n-tabs type="line" animated @update:value="jumpPage">
      <n-tab-pane
        v-for="menuItem in menuList"
        :key="menuItem.id"
        :name="menuItem.url"
        :tab="menuItem.title"
      >
      </n-tab-pane>
    </n-tabs>
    <UserCenter></UserCenter>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import UserCenter from "./userCenter.vue"

const router = useRouter()
const route = useRoute()

const menuList = [
  { title: "视频", id: "1", url: "/video" },
  // { title: '音乐', id: '2', url: '/music' },
  { title: "图片", id: "3", url: "/image" },
  { title: "问答", id: "4", url: "/chat" },
  { title: "语音", id: "5", url: "/voice" },
  { title: "提示词优化", id: "6", url: "/betterPrompt" },
]

const jumpPage = (url) => {
  debugger
  router.push({
    path: url,
  })
}

let activeIndex = ref("1")

onMounted(() => {
  setTimeout(() => {
    getMenuActice()
  }, 1000)
})
const getMenuActice = () => {
  let menuItem = menuList.find((item) => {
    return item.url == route.path
  })
  if (!menuItem) return
  activeIndex.value = menuItem.url
}
</script>

<style lang="less" scoped>
.header_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  .logo {
    width: 100px;
    padding: 0 8px;
    // color: #409eff;
  }
  .menulist {
    width: calc(100% - 200px);
  }
}
</style>
