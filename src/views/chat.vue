<template>
  <div class="common_page">
    <div class="message_content">
      <MessageList :msgList="msgList"></MessageList>
    </div>
    <div class="flex flex-col w-4/5">
      <n-input
        v-model:value="askDesc"
        :rows="4"
        type="textarea"
        placeholder="请输入"
      />
      <div class="flex gap-2 justify-end mt-2">
        <n-button @click="sendQuestion" type="primary">配置</n-button>
        <n-button @click="sendQuestion" :disabled="!askDesc" type="primary"
          >发送</n-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import MessageList from "@/components/messageList.vue"
import { chatCompletionsApi } from "@/api/index.js"
import { ElMessage } from "element-plus"

let askDesc = ref("")
// 聊天记录
let msgList = ref([])

onMounted(() => {
  getMessageList()
})

const sendQuestion = async () => {
  if (!askDesc.value) return
  let res = await chatCompletionsApi({
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: askDesc.value,
        },
      ],
    },
  })
  if (res.choices[0].message) {
    msgList.value.push(res.choices[0].message)
  }
}

const getMessageList = () => {
  msgList.value = []
}
</script>

<style scoped lang="scss">
.common_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .message_content {
    width: 70%;
    height: 75%;
    overflow: auto;
  }
}
</style>
