

<template>
    <div class="usercenter_page">
        <el-button class="btn" link>联系客服</el-button>
        <el-button class="btn" link>升级VIP</el-button>
        <el-button class="btn" link>个人中心</el-button>
    </div>
</template>
<script setup>

import { ref } from 'vue'

</script>

<style lang="less" scoped>
.usercenter_page {
    display: flex;
    font-size: 14px;
    .btn {
        width: 80px;
    }
}
</style>
