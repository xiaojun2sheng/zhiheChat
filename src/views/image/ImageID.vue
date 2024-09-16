<template>
  <div class="pcedit">
    <Panel icon="flat-color-icons:settings" title="上传图片">
      <template #content>
        <div>
          <UploadImage
            class="mb-2"
            type="oss"
            placeholder="请上传原始图片"
            @on-success="sourceImageSuccess"
          ></UploadImage>
        </div>
      </template>
    </Panel>
    <Panel icon="flat-color-icons:settings" title="参数设置">
      <template #content>
        <div>
          <span>类型：</span>
          <div>
            <n-select
              v-model:value="idPhotoSettings.size"
              :options="sizeOptions"
            />
          </div>
          <div>
            <span>底色：</span>
            <div>
              <n-select
                v-model:value="idPhotoSettings.backgroundColor"
                :options="bgColorOptions"
              />
            </div>
          </div>
        </div>
      </template>
    </Panel>
    <div class="flex justify-end mt-2 gap-4">
      <n-button
        class="prompt-btn__primary"
        round
        @click="generateIDPhoto"
        type="primary"
        >生成图片</n-button
      >
    </div>
  </div>
</template>
<script setup>
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import { useImageID } from "./useImageID"

const emit = defineEmits(["on-success", "on-generating"])
const props = defineProps({
  type: String,
})

const {
  idPhotoSettings,
  sizeOptions,
  bgColorOptions,
  sourceImageSuccess,
  generateIDPhoto,
} = useImageID(emit, props)
</script>
<style lang="sass" scoped></style>
