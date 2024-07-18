

<template>
    <div class="common_page">
        <el-card class="left" shadow="always">
            <el-tabs v-model="activeName">
                <el-tab-pane label="文字生成音频" name="text">
                    <el-input
                        v-model="voiceDesc"
                        style="width: 100%"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        type="textarea"
                        placeholder="请输入您要生成音频的文案"
                    />
                    <el-button class="width_btn" @click="createVoice" :disabled="!voiceDesc" type="primary">生成音频</el-button>
                </el-tab-pane>
                <el-tab-pane label="克隆声音" name="image">
                    <!-- <UploadImage @uploadSuccess="uploadSuccess"></UploadImage> -->
                    <div class="center_btn_box">
                        <el-button class="width_btn" @click="createVoice" :disabled="!voiceDesc" type="primary">生成音频</el-button>
                    </div>
                </el-tab-pane>
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
    </div>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import { textToVoice } from '@/api/index'
import { ElMessage } from 'element-plus'
import UploadImage from '@/components/uploadImage.vue';

let activeName = ref('text')
let voiceDesc = ref('')

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
const createVoice = async () => {
    let voiceTextList = splitVoiceText(voiceDesc.value)
    let voiceBlobList = []
    loading.value = true
    for (const item of voiceTextList) {
        let res = await textToVoice({
            data: {
                model: "tts-1",
                input: item,
                voice: "shimmer"
            },
            responseType: 'blob'
        })
        if (res) {
            const elink = document.createElement('a');
            elink.download = '文件名称.xls';
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
</style>
