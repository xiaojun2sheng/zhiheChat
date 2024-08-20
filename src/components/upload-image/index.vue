<template>
  <div class="relative w-full h-[160px]">
    <div class="file-box w-full h-full rounded-md">
      <div
        v-if="!uploadImage.url"
        class="w-full h-full flex flex-col justify-center items-center cursor-pointer"
        @click="openFileMgmt"
      >
        <SvgIcon :width="50" :height="50" icon="iconoir:plus"></SvgIcon>
        <p>{{ placeholder }}</p>
      </div>
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
    <FilePopup ref="filePopupRef" :type="type" @submit="onSelected"></FilePopup>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue"
import { useUpload } from "./useUpload"
import UploadFile from "@/components/upload/index.vue"
import FilePopup from "@/components/file-popup/index.vue"

const props = defineProps({
  type: {
    type: String,
    default: "oss",
  },
  placeholder: {
    type: String,
    default: "请选择图片",
  },
})
const emit = defineEmits(["on-change", "on-success"])

const { uploadImage, filePopupRef, onSelected, openFileMgmt } = useUpload(emit)

defineExpose({})
</script>
<style lang="scss" scoped>
.image-preview {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(264.35deg, #22403eb3 2.09%, #283d46b3 94.63%);
  box-shadow: -2px 4px 4px #0000001f;
  .n-image {
    height: 160px;
  }
}
.file-box {
  background: #0d1116;
}
</style>
