<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="参考图 / 垫图"
    :show-icon="false"
    :closable="false"
    :mask-closable="false"
    :close-on-esc="false"
    style="width: 700px"
  >
    <div class="container w-full">
      <n-tabs class="min-h-[220px] max-h-[500px]" type="segment" animated>
        <n-tab-pane
          class="w-full"
          name="upload"
          tab="上传"
          display-directive="show"
        >
          <NSpin :show="loading">
            <UploadFile
              class="w-full"
              :type="type"
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
                <n-text style="font-size: 16px"> 请上传图片 </n-text>
                <n-p depth="3" style="margin: 8px 0 0 0">
                  请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                </n-p>
              </n-upload-dragger>
            </UploadFile>
          </NSpin>
        </n-tab-pane>
        <n-tab-pane
          class="h-full"
          name="history"
          tab="历史图片(最近10张)"
          display-directive="show"
        >
          <History @on-selected="selectFile"></History>
        </n-tab-pane>
      </n-tabs>
      <div class="actions w-full flex justify-end gap-2">
        <n-button @click="close"> 取消 </n-button>
        <n-button type="primary" @click="submit"> 确定 </n-button>
      </div>
    </div>
  </NModal>
</template>

<script setup>
import History from "./History.vue"
import UploadFile from "@/components/upload/index.vue"
import { useFile } from "./useFile"

const emit = defineEmits(["submit"])
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
const {
  visible,
  loading,
  onUploading,
  onUploadSuccess,
  show,
  close,
  selectFile,
  submit,
} = useFile(emit)

defineExpose({
  show,
  close,
})
</script>
<style lang="scss" scoped>
:deep(.n-upload) {
  .n-upload-trigger {
    width: 100%;
  }
}
</style>
