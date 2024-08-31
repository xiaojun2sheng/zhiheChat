<template>
  <div class="nav h-full flex items-center" :class="{ close: isClose }">
    <div
      class="side-bar p-2 flex justify-center items-center flex-col w-[60px] shadow-md justify-center items-center border border-gray-600 rounded-md"
    >
      <!-- 功能区域 -->
      <div class="items tools-items">
        <n-dropdown
          @select="handleSelect"
          trigger="hover"
          placement="right"
          :options="chatStore.presetChatModels"
        >
          <div class="item">
            <SvgIcon :width="25" :height="25" icon="ph:open-ai-logo"></SvgIcon>
          </div>
        </n-dropdown>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="item" @click="newChat">
              <SvgIcon
                :width="25"
                :height="25"
                icon="lets-icons:chat-plus-fill"
              ></SvgIcon>
            </div>
          </template>
          <span>新建会话</span>
        </n-tooltip>

        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="item" @click="chatStore.setNavType('2')">
              <SvgIcon
                :width="25"
                :height="25"
                icon="lets-icons:chat-search-fill"
              ></SvgIcon>
            </div>
          </template>
          历史会话
        </n-tooltip>

        <div class="item" @click="toMarket">
          <SvgIcon
            :width="25"
            :height="25"
            icon="fluent:prompt-28-filled"
          ></SvgIcon>
        </div>
      </div>
      <!-- 扩展区 -->
      <div class="items addtion-items"></div>
      <n-divider />
      <!-- 底部区 -->
      <div class="items footer-items"></div>
    </div>
    <!-- 展开收起 -->
    <div class="nav_line" @click="close">
      <div class="line_0"></div>
      <div class="line_1"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useChatStore } from "@/stores"
import { useRouter } from "vue-router"

const router = useRouter()

const chatStore = useChatStore()
const isClose = ref(false)
const close = () => {
  isClose.value = !isClose.value
}
const handleSelect = (key) => {
  chatStore.setCurrentChatModel(key)
}

const newChat = () => {
  router.push("/chat")
  chatStore.setNavType("1")
}
const toMarket = () => {
  chatStore.setNavType("3")
  // router.push("/robot-market")
}
</script>
<style lang="scss">
.nav {
  transition: all 0.2s ease;

  .side-bar {
    .items {
      .item {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: #3a3a44;
        }
      }
    }
  }
  .n-divider {
    margin: 5px 0;
  }
  .nav_line {
    width: 12px;
    height: 26px;
    margin-top: 26px;
    margin-left: 4px;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      .line_0 {
        background-color: #ffffff;
        transform-origin: 50% 0%;
        transform: rotate(17deg) translateY(1px);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom-left-radius: 10px;
        height: 16px;
      }
      .line_1 {
        background-color: #ffffff;
        transform-origin: 50% 100%;
        transform: rotate(-17deg) translateY(-1px);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-left-radius: 10px;
        height: 16px;
      }
    }
    .line_0 {
      width: 4px;
      height: 13px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #45454e;
      left: 4px;
      top: 0;
      position: absolute;
      transition: all 0.2s ease;
      transform-origin: 50% 0;
    }
    .line_1 {
      width: 4px;
      height: 13px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: #45454e;
      left: 4px;
      bottom: 0;
      position: absolute;
      transition: all 0.2s ease;
      transform-origin: 50% 100%;
    }
  }
  &.close {
    transform: translateX(-68px);
    width: 20px;
    .nav_line {
      &:hover {
        .line_0 {
          background-color: #ffffff;
          transform-origin: 50% 0%;
          transform: rotate(-17deg) translateY(1px);
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 10px;
          height: 14px;
        }
        .line_1 {
          transform-origin: 50% 100%;
          transform: rotate(17deg) translateY(-1px);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top-right-radius: 10px;
          height: 14px;
        }
      }
    }
  }
}
</style>
