

<template>
    <div class="common_page">
        <div class="message_content">
            <MessageList :msgList="msgList"></MessageList>
        </div>
        <div class="ask_content">
            <el-input
                class="ask_input"
                v-model="askDesc"
                style="width: 80%"
                :rows="4"
                type="textarea"
                placeholder="请输入"
            />
            <div class="btns_box">
                <el-button class="btn" @click="sendQuestion" type="primary">配置</el-button>
                <el-button class="btn" @click="sendQuestion" :disabled="!askDesc" type="primary">发送</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import MessageList from '@/components/messageList.vue'
import { chatCompletionsApi } from '@/api/index.js'
import { ElMessage } from 'element-plus'

let askDesc = ref('')
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
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: askDesc.value
                }
            ]
        }
    })
    if (res.choices[0].message) {
        msgList.value.push(res.choices[0].message)
    }
}

const getMessageList = () => {
    msgList.value = []
}
</script>

<style scoped lang="less">
@import '@/commonCss/index.less';
.common_page {
    display: flex;
    flex-direction: column;
    align-items: center;
    .message_content {
        width: 70%;
        height: 75%;
        overflow: auto;
    }
    .ask_content {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        bottom: 20px;
        .btns_box {
            text-align: right;
            width: 80%;
            padding-top: 8px;
        }
    }
}
</style>
