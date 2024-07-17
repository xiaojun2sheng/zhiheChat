

<template>
    <div class="common_page">
        <el-card class="left" shadow="always">
            <el-button @click="createVideo">create Video</el-button>
        </el-card>
        <el-card class="right" shadow="always">
            展示内容
            <label v-if="createVideoTaskId">视频正在生成中，请耐心等待ing</label>
            <div v-for="item in resData" :key="item.url">
                <video width="320" height="240" controls>
                    <source :src="item.resource.resource" type="video/mp4">
                </video>
            </div>
        </el-card>
    </div>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import { createVideoKlingApi, getVideoKlingApi } from '@/api/index'
import { ElMessage } from 'element-plus'

let resData = ref([])
let createVideoTaskId = ref('')

let intervalId = ref(null)

const createVideo = async () => {
    if (createVideoTaskId.value) return ElMessage({ message: '正在生成视频中。。', type: 'warning' })
    let res = await createVideoKlingApi({
        data: {
            aspect_ratio: "16:9",
            camera: {
                horizontal: 0,
                pan: 0,
                roll: 0,
                tilt: 0,
                type: "empty",
                vertical: 0,
                zoom: 0
            },
            cfg: 0.5,
            duration: 5,
            negative_prompt: "",
            prompt: "一只可爱的小狗带着墨镜看花朵，并漏出牙齿哈哈大笑",
            tail_image_url: "",
            url: ""
        }
    })
    createVideoTaskId.value = res.id
    intervalId.value = setInterval(getVideoTask, 15000);
}

const getVideoTask = async () => {
    if (!createVideoTaskId.value) return
    let res = await getVideoKlingApi({
        data: {
            url: createVideoTaskId.value
        }
    })
    if (res?.data?.works[0]?.resource?.resource) {
        ElMessage({ 
            message: '视频生成成功请查看', 
            type: 'success' 
        })
        resData.value = res.data.works
        clearInterval(intervalId.value);
        createVideoTaskId.value = null
    } else {
        ElMessage({ message: '视频生成失败', type: 'error' })
    }
}

</script>

<style scoped lang="less">
@import '@/commonCss/index.less';
</style>
