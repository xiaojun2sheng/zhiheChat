

<template>
    <div class="common_page">
        <div class="home_box">
            <h1>AI提示词美化</h1>
            <div>只需要输入简短的文本，就能自动生成AI大语言模型能读懂的提示词，大大增强了视频制作的精美程度。</div>

            <div>
                <el-input type="textarea" placeholder="请输入文本..."
                          :rows="10"
                          clearable
                          v-model="prompt"
                          autofocus
                ></el-input>
            </div>

            <div>
                <el-button type="primary" @click="handlePrompt" :loading="loading" :disabled="!prompt">点击美化</el-button>
            </div>

            <br>

            <div>
                <el-input type="textarea" placeholder="这里将展示美化后的文本..."
                          :rows="10"
                          readonly
                          v-model="responseText"
                ></el-input>
            </div>

            <div>
                <el-button type="primary" @click="handleCopy" :disabled="!responseText">复制</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
/**
 功能描述
 @author yanyue
 @since 2024-07-18 9:23
 */
import {reactive, ref, onMounted, watch, toRefs} from "vue"
import {ElMessage} from 'element-plus'
import axios from 'axios';
import { useClipboard } from '@vueuse/core'
import { batterPromptApi } from '@/api/index'
const { copy } = useClipboard({ legacy: true })

let prompt = ref("")
let responseText = ref("")
let loading = ref(false)

const handlePrompt = async () => {
    if (!prompt.value) {
        ElMessage.warning("输入的文本不能为空")
        return
    }
    loading.value = true
    responseText.value = ""
    let res = await batterPromptApi({
        params: {
            prompt: prompt.value
        }
    })
    if (res == 'error') return ElMessage({ message: '优化提示词失败，请重新尝试一下', type: 'warning' })
    responseText.value = res.result
    loading.value = false
}

/**
 * vueuse
 * https://vueuse.netlify.app/core/useClipboard/
 */

function handleCopy() {
    copy(responseText.value)
    ElMessage.success('复制成功')
}
</script>
<style lang='less' scoped>
@import '@/commonCss/index.less';
.common_page {
  // 子元素会水平垂直居中
  display: flex; /*父元素设置flex属性*/
  justify-content: center;

  .home_box {
    height: 100%;
    width: 70%;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    text-align: center;
    padding: 20px 50px;
    height: max-content;

    .el-textarea {
      margin-top: 10px;
      font-size: 16px;
    }

    button {
      font-size: 16px;
      margin-top: 10px;
      width: 80%;
      height: 40px;
    }
  }
}
</style>
