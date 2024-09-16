<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="火宝新语🔥"
    :show-icon="false"
    :mask-closable="false"
    style="width: 50%; max-width: 640px; max-height: 90vh; overflow: auto"
  >
    <div class="poster-container">
      <div class="container__content">
        <div v-if="!canvasImage" ref="canvasRef" class="poster-canvas">
          <div v-if="loading" class="w-full" v-html="renderHtml"></div>
          <div v-else v-html="finallyPosterHtml"></div>
        </div>
        <div v-else class="poster-preview">
          <img class="poster-img" :src="canvasImage" />
        </div>
      </div>
      <!-- <div class="container__actions">
        <n-button type="primary" @click="toImage">卡片分享</n-button>
      </div> -->
    </div>
  </NModal>
</template>
<script setup>
import { ref } from "vue"
import { usePoster } from "./usePoster"

const {
  canvasImage,
  canvasRef,
  loading,
  renderHtml,
  finallyPosterHtml,
  visible,
  show,
  close,
  toImage,
} = usePoster()
defineExpose({
  show,
  close,
})
</script>
<style lang="scss" scoped>
.poster-container {
  .container__content {
    height: 70vh;
    overflow: auto;
    .poster-canvas {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      > div {
        width: 100%;
      }
    }
  }
  .poster-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 100%;
    width: 300px;
    > img {
      width: 100%;
    }
  }

  .container__actions {
    display: flex;
    justify-content: end;
  }
}
</style>
<style lang="scss">
.n-dialog__content {
  background-color: transparent !important;
}
.poster-img {
  width: 300px;
  border-radius: 20px;
}
</style>
