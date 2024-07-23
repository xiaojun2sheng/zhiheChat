

<template>
    <div class="common_page">
        <el-card class="left" shadow="always">
            <el-tabs v-model="activeName">
                <el-tab-pane label="文字生成图片" name="text">
                    <el-input
                        v-model="imageDesc"
                        style="width: 100%"
                        :maxlength="200"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        type="textarea"
                        placeholder="请输入您要生成图片的描述，可以描述主题，场景，风格等等"
                    />
                   
                    <el-button class="width_btn" @click="betterPrompt" :disabled="!imageDesc" type="primary">优化提示词</el-button>
                    <el-button class="width_btn" @click="createImage" :disabled="!imageDesc" type="primary">生成图片</el-button>
                </el-tab-pane>
                <el-tab-pane label="图片生成图片" name="image">
                    <h2>敬请期待</h2>
                    <!-- <UploadImage></UploadImage> -->
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-card 
            class="right"
            shadow="always"
            v-loading="createLoading"
            element-loading-text="图片正在生成中，请耐心等待..." >
            <label class="waring_desc">
                <el-icon size="14"><WarnTriangleFilled /></el-icon>
                请遵守中华人民共和国网络安全法， 严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理
            </label>
            <div v-if="resData.length > 0">
                <div v-for="item in resData" :key="item.url">
                    <img class="image_item" :src="item.url" />
                </div>
            </div>
            <el-empty v-else description="请生成图片" />
        </el-card>

        <!-- 优化提示词 -->
        <el-dialog
            v-model="dialogVisible"
            title="优化提示词"
            width="500"
            :before-close="cancelbetterPrompt"
        >
            <span v-if="batterImageDesc">{{ batterImageDesc }}</span>
            <span v-else>正在生成提示词优化，请耐心等待...</span>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelbetterPrompt">取消</el-button>
                <el-button type="primary" :disabled="!batterImageDesc" @click="submitbetterPrompt">替换</el-button>
            </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>

import { ref } from 'vue'
import { createImgeApi } from '@/api/index'
import { ElMessage } from 'element-plus'
import axios from 'axios';
import UploadImage from '@/components/uploadImage.vue';

let activeName = ref('text')

let imageDesc = ref('')
let batterImageDesc = ref('')
// 优化提示词
let dialogVisible = ref(false)
const betterPrompt = async () => {
    dialogVisible.value = true
    // https://openai.chatfire.cn/prompts?prompt=一直带有雄鹰翅膀的老虎，飞翔在大海上方
    axios.get('https://openai.chatfire.cn/prompts?prompt=' + imageDesc.value).then(res => {
        batterImageDesc.value = res.data.result
    }).catch(error => {
        ElMessage({ message: '优化提示词失败，请重新尝试一下', type: 'warning' })
        dialogVisible.value = false
    });
}

// 确认替换提示词
const submitbetterPrompt = () => {
    imageDesc.value = batterImageDesc.value
    batterImageDesc.value = ''
    dialogVisible.value = false
}
// 取消替换提示词
const cancelbetterPrompt = () => {
    batterImageDesc.value = ''
    dialogVisible.value = false
}

// 生成的图片
let resData = ref([])
let createLoading = ref(false)
const createImage = async () => {
    createLoading.value = true
    let res = await createImgeApi({
        data: {
            model: "stable-diffusion-3",
            prompt: imageDesc.value,
            n: 1,
            size: "1024x1024"
        }
    })
    resData.value = res.data || []
    createLoading.value = false
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
.image_item {
    width: 40%;
}
</style>
