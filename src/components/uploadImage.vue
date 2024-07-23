<template>
    <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <div v-else class="no_image_upload">
            <el-icon  size="24"><Plus /></el-icon>
            <div>只能上传jpg/png文件，且不超过10MB</div>
        </div>
    </el-upload>
</template>
<script setup>
import { ref } from 'vue'

// uploadSuccess

let imageUrl = ref('')

const handleAvatarSuccess = () => {
}

const beforeAvatarUpload = () => {
}
</script>

<style scoped lang="scss">
.avatar-uploader {
    width: 99%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #606266;
    .no_image_upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        line-height: 40px;
    }
}

</style>
