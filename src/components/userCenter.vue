

<template>
    <div class="usercenter_page">
        <el-popover
            placement="bottom"
            :width="300"
            trigger="click"
        >
            <template #reference>
                <el-button class="btn" link type="primary">联系客服</el-button>
            </template>
            <div class="popover_content">
                <p>请扫描二维码联系客服人员</p>
                <img src="@/assets/images/help/weixinqun.jpg" />
            </div>
        </el-popover>
        <!-- <el-button class="btn" link>升级VIP</el-button>
        <el-button class="btn" link>个人中心</el-button> -->
    </div>
</template>
<script setup>

import { ref } from 'vue'
import weixinkefu from '@/assets/images/help/weixinqun.jpg'
</script>

<style lang="less" scoped>
.usercenter_page {
    display: flex;
    font-size: 14px;
    .btn {
        width: 80px;
    }
}
.popover_content {
    width: 100%;
    text-align: center;
    img {
        width: 80%;
    }
}
</style>
