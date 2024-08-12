<template>
  <NUpload
    action=""
    :show-file-list="false"
    :on-before-upload="beforeUpload"
    :custom-request="ossUploadFile"
  >
    <slot></slot>
  </NUpload>
</template>

<script setup>
import { uploadFile } from "@/api"

const emit = defineEmits(["on-uploading", "on-success"])

// 校验
const beforeUpload = ({ file }) => {
  const fileData = file.file
  // 类型限制 jpg jpeg docx pdf
  let types = [
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/wps-writer",
    // "application/msword", // doc 暂不支持
    "application/pdf",
  ]
  // 校验文件相关信息
  if (types.includes(fileData.type)) {
    // 文件大小相关校验 20M
    const maxSize = 20 * 1000 * 1024
    if (fileData.size >= maxSize) {
      $message.warning("文件大小最多20M")
      return false
    }
    return true
  } else {
    $message.warning("文件格式不支持")
    return false
  }
}

// 文件上传并解析
const ossUploadFile = async ({ file, onFinish }) => {
  emit("on-uploading", true)
  const fileData = file.file
  let formData = new FormData()
  formData.append("file", fileData)
  // 写死 file-extract-kimi
  formData.append("purpose", "vidu")
  let fileRsp = await uploadFile(formData).finally(() => {
    emit("on-uploading", false)
    onFinish()
  })
  emit("on-success", fileRsp)
}


</script>
<style lang="scss" scoped>
.send-box {
  // @include flex-layout(column, start, start);
  box-sizing: border-box;
  padding-bottom: 10px;
  .addition {
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(239, 239, 245);
    font-size: 14px;
    .file-name {
      max-width: 60px;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
    }
  }
  .tools {
    margin-top: 5px;
    display: flex;
    gap: 10px;
    .item {
      // @include flex-layout();
      cursor: pointer;
      border-radius: 8px;
      height: 25px;
      width: 25px;
      flex-shrink: 0;
      &.active,
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
  // border-radius: 4px;

  .footer {
    align-self: end;
  }
}
:deep(.n-input) {
  background-color: unset !important;
}
.dark {
  .addition {
    border-bottom: 1px solid #2d2d2d;
  }
}
</style>
