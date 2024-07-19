

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
                    <el-button class="width_btn" @click="createVoice" :disabled="!voiceSoundConfig.input" type="primary">生成音频</el-button>
                </el-tab-pane>
                <!-- <el-tab-pane label="克隆声音" name="image">
                    <div class="center_btn_box">
                        <el-button class="width_btn" @click="createVoice" :disabled="!voiceSoundConfig.input" type="primary">生成音频</el-button>
                    </div>
                </el-tab-pane> -->
            </el-tabs>
        </el-card>
        <el-card 
            class="right"
            shadow="always" 
            v-loading="loading"
            element-loading-text="音频正在生成中，请耐心等待...">
            <label class="waring_desc">
                <el-icon size="14"><WarnTriangleFilled /></el-icon>
                请遵守中华人民共和国网络安全法， 严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理</label>
            <div v-if="resData">
                <audio :src="resData" controls="controls"></audio>
            </div>
            <el-empty v-else description="请生成音频" />
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
import { textToVoice } from '@/api/index'
import { ElMessage } from 'element-plus'

let activeName = ref('text')

// 生成的音频
let resData = ref(null)

// 字符串不限制长度，按照1500个字符进行切割，切换成数组，然后生成数组blob
const splitVoiceText = (str) => {
    const chunks = [];
    const chunkSize = 1500;
    for (let i = 0; i < str.length; i += chunkSize) {
        chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
}

let loading = ref(false)

// 文字生成语音参数
let voiceSoundConfig = ref({
    model: "tts-1",
    input: '',
    voice: '云健',
    speed: 1
})
const createVoice = async () => {
    let voiceTextList = splitVoiceText(voiceSoundConfig.value.input)
    let voiceBlobList = []
    loading.value = true
    for (const item of voiceTextList) {
        let res = await textToVoice({
            data: item,
            responseType: 'blob'
        })
        if (res == 'error') return loading.value = false
        if (res) {
            const elink = document.createElement('a');
            elink.download = 'voice.mp3';
            elink.style.display = 'none';
            const blob = new Blob([res], { type: 'audio/mpeg' });
            voiceBlobList.push(blob)
        }
        if (voiceTextList.length == voiceBlobList.length) {
            mergeBlobToMp3(voiceBlobList)
        }
    }
}

const mergeBlobToMp3 = (voiceBlobList) => {
    const blob = new Blob(voiceBlobList, { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(blob);
    resData.value = audioUrl
    loading.value = false
}

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
</style>
