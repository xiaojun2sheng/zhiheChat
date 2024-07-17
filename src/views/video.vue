

<template>
    <div class="common_page">
        <el-card class="left" shadow="always">
            <el-button @click="createImage">create Image</el-button>
        </el-card>
        <el-card class="right" shadow="always">
            展示内容
            <div v-for="item in resData" :key="item.url">
                <img :src="item.url" />
            </div>
        </el-card>
    </div>
</template>
<script setup>

import { ref } from 'vue'
import { createImgeApi } from '@/api/index'

let resData = ref([])
const createImage = async () => {
    let res = await createImgeApi({
        data: {
            model: "stable-diffusion-3",
            prompt: "A cute baby sea otter",
            n: 1,
            size: "1024x1024"
        }
    })
    resData.value = res.data || []
}
</script>

<style scoped lang="less">
@import '@/commonCss/index.less';
</style>
