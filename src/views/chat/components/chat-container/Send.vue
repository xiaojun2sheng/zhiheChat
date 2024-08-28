<template>
  <div class="send-box flex flex-col">
    <Plugins></Plugins>
    <NInput
      type="textarea"
      :style="{
        '--n-border-hover': '1px solid gba(255, 255, 255, 0)',
        '--n-box-shadow-focus': '0 0 0 0 rgba(17, 17, 17, 0.2)',
        '--n-border-focus': '1px solid gba(255, 255, 255, 0)',
        '--n-border': '1px solid gba(255, 255, 255, 0)',
      }"
      v-model:value="sendContent"
      maxlength="500"
      :autosize="{ minRows: 2, maxRows: 4 }"
      :placeholder="placeholder"
      @keydown.enter="submit"
    ></NInput>
    <div class="footer w-full px-3 pb-2">
      <div></div>
      <div class=" flex gap-2">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="item" @click="upload">
              <SvgIcon
                :width="20"
                :height="20"
                icon="iconamoon:attachment"
                color="#fff"
              ></SvgIcon>
            </div>
          </template>
          支持上传文件（每个 10 MB）接受 pdf、doc、xlsx、ppt、txt、图片等
        </n-tooltip>
        <div class="item submit">
          <SvgIcon
            :width="20"
            :height="20"
            :icon="running ? 'eos-icons:three-dots-loading' : 'iconamoon:send'"
            :disabled="running"
            color="#fff"
            @click="submit"
          ></SvgIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useSend } from "@/hooks/useSend"
import { useChatStore, useAppStore } from "@/stores"
import { isPhone } from "@/utils"
import Plugins from "./Plugins.vue"

const list = ref([])
const appStore = useAppStore()
const chatStore = useChatStore()
const { running, content, send, handleStop } = useSend(list)

const emit = defineEmits([
  "submit",
  "change",
  "on-before",
  "on-end",
  "on-error",
])
const sendContent = ref("")
const placeholder = computed(() => "传递的你的想法")

// 监听消息响应
watch(
  () => content.value,
  (val) => {
    if (running.value) emit("change", val)
  }
)

// 上传成功更新文件列表，插入chat对象
const upload = (file) => {
  $message.success("开发中，请期待。。。")
  // chatStore.addFile(file)
  // chatStore.updateChatItem({ file })
}

// 消息发送 ctrl + enter 换行
const submit = async (e) => {
  if (e.shiftKey) return
  if (running.value || !sendContent.value) return

  emit("on-before", sendContent.value)
  setTimeout(() => {
    setContent("")
  })
  const list = chatStore.messageList
    .filter((item) => item.content)
    .map(({ content, role }) => {
      return { content, role }
    })
  // 插入引导词
  if (chatStore.chat.prompt) {
    list.splice(-1, 0, {
      content: chatStore.chat.prompt,
      role: "user",
    })
  }
  const req = {
    model: appStore.currentChatModel,
    messages: list,
    stream: true,
  }
  await send(req).finally(() => {
    emit("on-end", sendContent.value)
  })
}
// 设置输入框
const setContent = (val) => {
  sendContent.value = val
}

const shortcut = (val) => {
  setContent(val)
  submit()
}

defineExpose({ shortcut, setContent, handleStop, running })
</script>
<style lang="scss" scoped>
.send-box {
  position: relative;
  border: 1px solid #595965;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: none;
  background-color: #3a3a44;

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
      }
      &.submit {
        background-color: #5280fd;
        &:hover {
          background-color: #5280fd99;
        }
      }
    }
  }
}
:deep(.n-input) {
  background-color: unset !important;
}
</style>
