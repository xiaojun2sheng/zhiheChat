

<template>
    <div class="common_page">
        <el-card class="left" shadow="always">
            <el-tabs v-model="activeName">
                <el-tab-pane label="文字生成音频" name="text">
                    <el-input
                        v-model="voiceSoundConfig.input"
                        style="width: 100%"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        type="textarea"
                        placeholder="请输入您要生成音频的文案"
                    />
                    <el-button class="width_btn" @click="dialogVisible = true" type="primary">配置</el-button>
                    <el-button class="width_btn" @click="createVoice(true)" type="primary">润色并音频</el-button>
                    <div>
                        <el-button class="width_btn" @click="createVoice(false)" :disabled="!voiceSoundConfig.input" type="primary">生成音频</el-button>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="克隆声音" name="image">
                    <div class="center_btn_box">
                        <el-button class="width_btn" @click="createVoice(false)" :disabled="!voiceSoundConfig.input" type="primary">生成音频</el-button>
                    </div>
                </el-tab-pane> -->
            </el-tabs>
        </el-card>
        <el-card 
            class="right"
            shadow="always">
            <label class="waring_desc">
            <el-icon size="14"><WarnTriangleFilled /></el-icon>
            请遵守中华人民共和国网络安全法， 严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理</label>
            <div v-if="voiceTextList.length > 0" v-loading="loading" element-loading-text="音频正在生成中，请耐心等待...">
                <h2>一共{{ voiceTextList.length }}语音</h2>
                <h2>正在生成第{{ resData.length }}语音</h2>

            </div>
            <el-empty v-else></el-empty>
            <el-card
                v-for="item in resData" 
                :key="item.url"
                class="blob_box"
                shadow="always" >
                <audio 
                    
                    :src="item.url"
                    controls="controls">
                </audio>
                <div 
                    :key="item.url" 
                    class="polish_text" >
                    {{ item.content }}
                </div>
                <el-button type="primary" @click="handleCopy(item.content)">复制</el-button>
            </el-card>
        </el-card>

        <!-- 音频配置 -->
        <el-dialog
            v-model="dialogVisible"
            title="优化提示词"
            width="500"
            :before-close="cancelDialog"
        >   
            <label class="diglog_title">选择音色</label>
            <div>
                <el-check-tag
                    class="sound_tag"
                    v-for="item in voiceSoundTypeOptions" 
                    :key="item" 
                    :checked="item == voiceSoundConfig.voice"
                    @click="voiceSoundConfig.voice = item"
                    >{{ item }}
                </el-check-tag>
            </div>
            <label class="diglog_title">声音速度</label>
            <el-slider v-model="voiceSoundConfig.speed" :min="0.25" :max="4" :step="0.25"/>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelDialog">取消</el-button>
                <el-button type="primary" @click="submitDialog">替换</el-button>
            </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import { textToVoice, chatCompletionsApi } from '@/api/index'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'

const { copy } = useClipboard({ legacy: true })

let activeName = ref('text')

// 生成的音频
let resData = ref([])

// 字符串不限制长度，按照1500个字符进行切割，切换成数组，然后生成数组blob
const splitVoiceText = (input) => {
  const regex = /【【([^】]+)】】([\s\S]*?)(?=【【|$)/g;
  const matches = input.matchAll(regex);
  const result = [];

  for (const match of matches) {
    result.push({ title: match[1], content: match[2].replace(/\n/g,'').trim() });
  }

  return result;
}

let loading = ref(false)

// 文字生成语音参数
let voiceSoundConfig = ref({
    model: "tts-1",
    input: '',
    voice: '云健', //纪录片 8bad0cb3e890489a8925db005f85a765
    speed: 1
})

// isPolish 是否润色
let voiceTextList = ref([])
const createVoice = async (isPolish) => {
    voiceTextList.value = splitVoiceText(voiceSoundConfig.value.input)
    loading.value = true
    for (const item of voiceTextList.value ) {
        if (isPolish) {
            item.content = await polishText(item.content)
        }
        let res = await textToVoice({
            data: Object.assign({}, voiceSoundConfig.value, {input: item.content}),
            responseType: 'blob'
        })
        if (res == 'error') return loading.value = false
        if (res) {
            const elink = document.createElement('a');
            elink.download = item.title + '.mp3';
            elink.style.display = 'none';
            const blob = new Blob([res], { type: 'audio/mpeg' });
            elink.href = URL.createObjectURL(blob);
            resData.value.push(
                {
                    url: elink.href,
                    content: item.content
                }
            )
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
            URL.revokeObjectURL(blob);
        }
        if (voiceTextList.value.length == resData.value.length) {
            loading.value = false
        }
    }
}

// 合并 blob 文件 
// const mergeBlobToMp3 = (voiceBlobList) => {
//     const blob = new Blob(voiceBlobList, { type: 'audio/mpeg' });
//     const audioUrl = URL.createObjectURL(blob);
//     resData.value = audioUrl
//     loading.value = false
// }

// 音频配置
let dialogVisible = ref(false)
const voiceSoundTypeOptions = [
    '晓晓','女声','晓伊','云健','云希','男声', '云夏', '云扬', '辽宁晓北', '陕西晓妮'
]
// 确认替换提示词
const submitDialog = () => {
    dialogVisible.value = false
}
// 取消替换提示词
const cancelDialog = () => {
    dialogVisible.value = false
}

// 润色文案
// 帮我整理以下信息，去除所有的英文单词，和字符例如：*，然后按照讲诉故事方式整理以下文案，要求不要太多重复的字，要求过审核，文案如下：
// 
let polishList = ref([])
const polishText = async (input) => {
    if (!input) return
    let res = await chatCompletionsApi({
        data: {
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "请你以一位资深读书博主的角色讲解以下知识点，要求语言诙谐幽默，通熟易懂。用现实当中交谈的方式讲述出来，知识点深入浅出，去除英文单词和特殊符号"
                },
                {
                    role: "user",
                    content: input
                }
            ]
        }
    })
    if (res.choices[0].message) {
        return res.choices[0].message.content
    }
}

function handleCopy(content) {
    copy(content)
    ElMessage.success('复制成功')
}
</script>

<style scoped lang="less">
@import '@/commonCss/index.less';
.width_btn {
    width: calc(50% - 8px);
    margin-top: 8px;
}
.waring_desc {
    font-size: 12px;
    color: #F56C6C;
    display: flex;
    align-items: center;
    .el-icon {
        margin-right: 8px;
    }
}
.center_btn_box {
    width: 100%;
    display: flex;
    justify-content: center;
}
.diglog_title {
    display: inline-block;
    font-size: 14px;
    margin: 8px 0;
}
.sound_tag {
    margin-right: 8px;
}
.blob_box {
    margin: 8px 0;
    .polish_text {
        width: 100%;
        margin: 8px 0;
    }
}
</style>
