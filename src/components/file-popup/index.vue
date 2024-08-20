<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="文件列表"
    :show-icon="false"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submit"
    @on-negative-click="visible = false"
    style="width: 95%; max-width: 640px"
  >
    <div class="container">
      <div class="list max-h-[400px] overflow-auto">
        <div
          v-for="item in fileList"
          class="p-2 mb-2 h-10 border border-gray-700 rounded-md flex cursor-pointer"
          :class="item.selected ? 'bg-gray-900' : ''"
          @click="selectFile(item)"
        >
          <n-image :src="item.url"></n-image>
          <span class="ml-2 text-slate-500 truncate">{{ item.filename }}</span>
        </div>
      </div>
      <div class="actions"></div>
    </div>
  </NModal>
</template>

<script setup>
import { useFile } from "./useFile"

const emit = defineEmits(["on-selected"])
const { visible, fileList, show, close, selectFile, submit } = useFile(emit)

defineExpose({
  show,
  close,
})
</script>
<style scoped></style>
