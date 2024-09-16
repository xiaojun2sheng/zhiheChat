<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px] shrink-0 overflow-auto">
      <n-tabs type="line" v-model:value="activeName" animated>
        <n-tab-pane name="text" tab="文生图" display-directive="show">
          <ImageText
            @on-success="onSuccess"
            @on-loading="onLoading"
            @on-end="onEnd"
          ></ImageText>
        </n-tab-pane>
        <!-- <n-tab-pane name="face" tab="AI 换脸" display-directive="show">
          <ImageFace
            @on-success="onSuccess"
            @on-loading="onLoading"
            @on-end="onEnd"
          ></ImageFace>
        </n-tab-pane> -->

        <n-tab-pane name="watermark" tab="去水印" display-directive="show">
          <ImageBox
            type="watermark"
            @on-success="onSuccess"
            @on-loading="onLoading"
            @on-end="onEnd"
          ></ImageBox>
        </n-tab-pane>
        <n-tab-pane name="oldphotos" tab="照片修复" display-directive="show">
          <ImageBox
            type="oldphotos"
            @on-success="onSuccess"
            @on-loading="onLoading"
            @on-end="onEnd"
          ></ImageBox>
        </n-tab-pane>
        <!-- <n-tab-pane name="idPhotos" tab="证件照" display-directive="show">
          <ImageID
            type="idPhotos"
            @on-success="onSuccess"
            @on-loading="onLoading"
            @on-end="onEnd"
          ></ImageID>
        </n-tab-pane> -->
        <n-tab-pane name="tools" tab="百宝箱" display-directive="show">
          <ImageBox
            @on-success="onSuccess"
            @on-loading="onLoading"
            @on-end="onEnd"
          ></ImageBox>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="flex flex-col w-full h-full items-center justify-between pt-10">
      <div
        class="image-box px-10 min-h-[300px] flex gap-2 justify-start items-center flex-wrap overflow-auto"
      >
        <n-image-group v-if="imageUrls.length > 0" show-toolbar-tooltip>
          <n-image
            v-for="item in imageUrls"
            class="rounded-md w-full flex justify-center"
            object-fit="contain"
            :src="item.url"
          />
        </n-image-group>
        <n-spin v-if="loading" :show="true">
          <template #description> 生成中 </template>
        </n-spin>
        <n-empty
          v-if="imageUrls.length == 0 && !loading"
          description="请生成图片"
        />
      </div>
      <Tips></Tips>
    </div>
    <div v-if="historyImgs.length > 0">
      <KeepAlive>
        <HistorySide>
          <template #content>
            <div>
              <div
                class="relative cursor-pointer image-history"
                v-for="(item, index) in historyImgs"
                :key="index"
              >
                <n-image
                  width="240"
                  :preview-disabled="true"
                  :src="item?.[0]?.url"
                  @click="selectHistory(item)"
                />
                <SvgIcon
                  class="absolute top-0 right-0"
                  :width="20"
                  :height="20"
                  hover
                  icon="ion:close"
                  @click="deleteHistory(index)"
                ></SvgIcon>
              </div>
            </div>
          </template>
        </HistorySide>
      </KeepAlive>
    </div>
  </div>
</template>
<script setup>
import HistorySide from "@/components/history-side/index.vue"
import ImageText from "./ImageText.vue"
import ImageFace from "./ImageFace.vue"
import ImageBox from "./ImageBox.vue"
import ImageID from "./ImageID.vue"
import { useImage } from "./useImage"

const {
  activeName,
  historyImgs,
  loading,
  imageUrls,
  onLoading,
  onSuccess,
  onEnd,
  deleteHistory,
  selectHistory,
} = useImage()
</script>

<style scoped lang="scss">
.common_page {
}
.waring_desc {
  font-size: 12px;
  color: #f56c6c;
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 8px;
  }
}
.image_item {
  width: 40%;
}
.image-history {
  .svg-icon {
    display: none;
  }
  &:hover {
    .svg-icon {
      display: block;
    }
  }
}
:deep(.n-select) {
  .n-base-selection {
    border-radius: 10px !important;
  }
}
</style>
