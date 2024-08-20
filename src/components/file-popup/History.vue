<template>
  <div class="max-h-[400px] list overflow-auto h-full flex flex-wrap">
    <n-image
      v-for="item in fileList"
      :class="item.selected ? 'selected-img' : ''"
      @click="selectFile(item)"
      class="p-2 mb-2 cursor-pointer rounded-lg shrink-0"
      :key="item.url"
      :src="item.url"
      object-fit="cover"
      :width="140"
      :height="140"
      preview-disabled
    ></n-image>
  </div>
</template>

<script setup>
import { useHistory } from "./useHistory"

const emit = defineEmits(["on-selected"])
const { fileList,selectFile } = useHistory(emit)
</script>
<style lang="scss" scoped>
.selected-img {
  border: 1px solid #72e528;
}
:deep(.n-image) {
  box-sizing: border-box;
  img {
    height: 140px;
  }
}
</style>
