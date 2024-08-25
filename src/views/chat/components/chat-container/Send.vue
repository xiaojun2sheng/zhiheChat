<template>
  <div class="send-box flex flex-col">
    <!-- <div class="tools">
      <Tag></Tag>
    </div> -->
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
    <div class="footer w-full">
      <div></div>
      <div class="py-2">
        <SvgIcon
          :width="20"
          :height="20"
          hover
          :icon="running ? 'eos-icons:three-dots-loading' : 'ion:send'"
          :disabled="running"
          @click="submit"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useSend } from "@/hooks/useSend"
import { useChatStore, useAppStore } from "@/stores"
import { isPhone } from "@/utils"
import Tag from "./Tag.vue"

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

// kimi 才支持文件解析
const showUpload = computed(
  () => chatStore.tabIndex == 1 && sendOptions.value.model.includes("kimi")
)
const showFile = computed(() => showUpload.value && chatStore.chat.file)
const fileId = computed(() => {
  if (chatStore.tabIndex == 2) {
    return chatStore.chat.id
  } else {
    return chatStore.chat.file?.id || ""
  }
})

const placeholder = computed(() =>
  isPhone
    ? "传递的你的想法"
    : "传递的你的想法（ctrl + enter 换行，enter发送消息）"
)

const sendOptions = ref({
  model: "kimi-all",
  temperature: 0.7,
})

// 监听消息响应
watch(
  () => content.value,
  (val) => {
    if (running.value) emit("change", val)
  }
)


// 上传成功更新文件列表，插入chat对象
const uploadSuccess = (file) => {
  chatStore.addFile(file)
  chatStore.updateChatItem({ file })
}

// 消息发送 ctrl + enter 换行
const submit = async (e) => {
  if (e && e.ctrlKey && e.key === "Enter") {
    sendContent.value += "\n"
    return
  }
  if (running.value || !sendContent.value) return
  // 首页问答需要先新增
  chatStore.createChat()
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
    ...chatStore.sendOptions,
    messages: list,
    stream: true,
  }
  const res = await send(req)
  emit("on-end", sendContent.value)
}
// 设置输入框
const setContent = (val) => {
  sendContent.value = val
}

const shortcut = (val) => {
  setContent(val)
  submit()
}

defineExpose({ shortcut, setContent, sendOptions, handleStop, running })
</script>
<style lang="scss" scoped>
.send-box {
  position: relative;
  border: 1px solid #595965;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: none;
  background-color: #3a3a44;

  .tools {
    display: flex;
    gap: 10px;
    padding: 12px 16px 4px 12px;
    display: flex;
    align-items: center;
  }
  .footer {
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
:deep(.n-input) {
  background-color: unset !important;
}
</style>
