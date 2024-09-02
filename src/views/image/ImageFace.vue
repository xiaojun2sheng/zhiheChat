<template>
  <div class="image-face">
    <Panel icon="flat-color-icons:settings" title="上传图片">
      <template #content>
        <div>
          <UploadImage
            class="mb-2"
            type="oss"
            placeholder="请上传原始图片"
            @on-success="sourceImageSuccess"
          ></UploadImage>
          <UploadImage
            type="oss"
            placeholder="请上传被替换的图片"
            @on-success="targetImageSuccess"
          ></UploadImage>
        </div>
      </template>
    </Panel>
    <div class="flex justify-end mt-2 gap-4">
      <n-button
        class="prompt-btn__primary"
        round
        @click="generateImage"
        type="primary"
        >生成图片</n-button
      >
    </div>
  </div>
</template>
<script setup>
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import { useImageFace } from "./useImageFace"

const emit = defineEmits(["on-success", "on-loading", "on-end"])

const { sourceImageSuccess, targetImageSuccess, generateImage } =
  useImageFace(emit)
</script>
<style lang="sass" scoped></style>
