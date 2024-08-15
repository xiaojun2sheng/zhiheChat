<template>
  <div class="header_box" hadow="always">
    <div class="logo flex justify-center items-center">
      <img src="@/assets/logo.png" alt="" /><span>火宝 AI</span>
    </div>
    <n-tabs
      v-model:value="tabName"
      type="line"
      animated
      @update:value="jumpPage"
    >
      <n-tab-pane
        v-for="menuItem in menuList"
        :key="menuItem.id"
        :name="menuItem.url"
        :tab="menuItem.title"
      >
      </n-tab-pane>
    </n-tabs>
    <!-- <SvgIcon
      class="mr-2"
      :width="35"
      :height="35"
      hover
      :icon="
        appStore.theme == 'light' ? 'ic:round-dark-mode' : 'ic:round-light-mode'
      "
      @click="switchTheme"
    ></SvgIcon> -->
    <!-- <SvgIcon
      class="mr-2"
      :width="35"
      :height="35"
      hover
      icon="mingcute:user-4-fill"
    ></SvgIcon> -->
    <UserCenter></UserCenter>
    <!-- <LoginPopup ref="loginRef"></LoginPopup> -->
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import UserCenter from "./userCenter.vue"
import LoginPopup from "@/components/login-popup/index.vue"
import { useAppStore } from "@/stores"

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const loginRef = ref()

const menuList = [
  { title: "视频", id: "1", url: "/video" },
  // { title: '音乐', id: '2', url: '/music' },
  { title: "图片", id: "3", url: "/image" },
  { title: "问答", id: "4", url: "/chat" },
  { title: "语音", id: "5", url: "/voice" },
  { title: "提示词优化", id: "6", url: "/betterPrompt" },
]

const tabName = computed(() => {
  return route.path
})

const jumpPage = (url) => {
  router.push({
    path: url,
  })
}

let activeIndex = ref("1")

onMounted(() => {
  setTimeout(() => {
    getMenuActice()
  }, 1000)
  // loginRef.value.show()
})
const getMenuActice = () => {
  let menuItem = menuList.find((item) => {
    return item.url == route.path
  })
  if (!menuItem) return
  activeIndex.value = menuItem.url
}

const switchTheme = () => {
  if (appStore.theme == "light") appStore.theme = "dark"
  else appStore.theme = "light"
}
</script>

<style lang="scss" scoped>
.header_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  .logo {
    padding: 0 8px;
    width: 120px;
    img {
      width: 40px;
    }
  }
  .menulist {
    width: calc(100% - 200px);
  }
}
</style>
