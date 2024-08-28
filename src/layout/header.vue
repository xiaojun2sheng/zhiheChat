<template>
  <div class="header_box" hadow="always">
    <div class="logo flex justify-center items-center">
      <img src="@/assets/logo.png" alt="" />
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
    <UserCenter></UserCenter>
    <n-dropdown
      v-if="userStore.isLogin"
      trigger="hover"
      :options="options"
      @select="handleSelect"
    >
      <n-avatar class="mx-2" round size="small" :src="Avatar" />
    </n-dropdown>
    <n-button
      v-if="!userStore.isLogin"
      class="ml-2"
      text
      type="primary"
      @click="loginRef?.show"
      >去登录</n-button
    >

    <LoginPopup ref="loginRef"></LoginPopup>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, h } from "vue"
import { useRouter, useRoute } from "vue-router"
import UserCenter from "./userCenter.vue"
import LoginPopup from "@/components/login-popup/index.vue"
import { useAppStore, useUserStore } from "@/stores"
import { useLogin } from "@/hooks/useLogin"
import { useUser } from "@/hooks/useUser"
import Avatar from "@/assets/avatar-g.png"
import { NAvatar, NText, useMessage } from "naive-ui"

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const loginRef = ref()

const { initUser } = useUser()
const { toLogout } = useLogin()

const menuList = [
  { title: "视频", id: "1", url: "/video" },
  // { title: '音乐', id: '2', url: '/music' },
  { title: "图片", id: "3", url: "/image" },
  { title: "问答", id: "4", url: "/chat" },
  { title: "语音", id: "5", url: "/voice" },
  { title: "提示词工厂", id: "6", url: "/robot-market" },
  { title: "工具箱", id: "7", url: "/tools" },
  // { title: "提示词优化", id: "6", url: "/betterPrompt" },
  { title: "账户", id: "8", url: "/payment" },
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
  initUser()
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

const options = ref([
  {
    key: "header",
    type: "render",
    render: renderCustomHeader,
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    label: "退出登录",
    key: "logout",
  },
])
function renderCustomHeader() {
  return h(
    "div",
    {
      class: "flex items-center px-3 py-2",
    },
    [
      h(NAvatar, {
        round: true,
        class: "mr-3",
        src: Avatar,
      }),
      h("div", null, [
        h("div", null, [
          h(NText, { depth: 2 }, { default: () => userStore.user?.nickName }),
          h("div", { style: "font-size: 12px;" }, [
            h(
              NText,
              { depth: 3 },
              { default: () => "毫无疑问，你是办公室里最亮的仔🌟" }
            ),
          ]),
        ]),
      ]),
    ]
  )
}
const handleSelect = async (key) => {
  if (key == "logout") {
    await toLogout()
    window.$message.success("退出登录成功")
  }
}
</script>

<style lang="scss" scoped>
.header_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 55px;
  .logo {
    padding: 0 8px;
    // width: 120px;
    img {
      width: 40px;
    }
  }
  .menulist {
    width: calc(100% - 200px);
  }
}
:deep(.n-tabs) {
  .n-tabs-nav-scroll-content {
    border-bottom: none !important;
  }
}
</style>
