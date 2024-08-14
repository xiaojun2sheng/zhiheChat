<template>
  <div>
    <NSpin :show="loading">
      <UploadFile
        v-if="!uploadImage.url"
        @on-uploading="onUploading"
        @on-success="onUploadSuccess"
      >
        <n-upload-dragger>
          <div class="w-full flex justify-center mb-2">
            <SvgIcon
              class="mr-2"
              :width="25"
              :height="25"
              icon="ph:upload-bold"
            ></SvgIcon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </UploadFile>
    </NSpin>
    <div
      v-if="uploadImage.url"
      class="image-preview flex items-center justify-between rounded-md"
    >
      <n-image
        class="rounded-md"
        :width="160"
        :height="160"
        object-fit="cover"
        :src="uploadImage.url"
      ></n-image>
      <p class="m-2 w-[40%] truncate">{{ uploadImage.filename }}</p>
      <SvgIcon
        class="mr-2"
        :width="25"
        :height="25"
        icon="mdi:delete-outline"
        @click="uploadImage = {}"
      ></SvgIcon>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import { useUpload } from "./useUpload"
import UploadFile from "@/components/upload/index.vue"

const emit = defineEmits(["on-change", "on-success"])

const { loading, uploadImage, onUploading, onUploadSuccess } = useUpload(emit)

defineExpose({})
</script>
<style lang="scss" scoped>
.image-preview {
  overflow: hidden;
  background: linear-gradient(264.35deg, #22403eb3 2.09%, #283d46b3 94.63%);
  box-shadow: -2px 4px 4px #0000001f;
  .n-image {
    height: 160px;
  }
}
</style>
