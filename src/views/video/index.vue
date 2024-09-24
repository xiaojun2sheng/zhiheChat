<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px] shrink-0">
      <n-tabs type="line" v-model:value="activeName" animated>
        <n-tab-pane name="text" tab="文字生成视频" display-directive="show">
          <Panel icon="flat-color-icons:idea" title="创意描述">
            <template #content>
              <div class="prompt">
                <n-input
                  v-model:value="videoPrompt"
                  class="textarea__inner"
                  rows="4"
                  autocomplete="off"
                  placeholder="请输入您要生成视频的描述，可以描述主题，场景，风格等等"
                  type="textarea"
                  :style="inputStyle"
                ></n-input>
              </div>
            </template>
            <template #footer>
              <div class="footer">
                <span class="label">推荐尝试：</span>
                <span
                  class="val mr-2 cursor-pointer"
                  v-for="item in videoRecommendPrompt"
                  @click="videoPrompt = item.desc"
                  >{{ item.label }}</span
                >
              </div>
            </template>
          </Panel>
          <Panel icon="flat-color-icons:settings" title="参数设置">
            <template #content>
              <div>
                <span>设置模型：</span>
                <div class="prompt">
                  <n-select
                    v-model:value="videoSetting.model"
                    :options="modelOptions"
                  />
                </div>
              </div>
            </template>
          </Panel>
        </n-tab-pane>
        <n-tab-pane name="image" tab="图片生成视频" display-directive="show">
          <Panel icon="flat-color-icons:idea" title="图片创意描述">
            <template #content>
              <div class="base-image">
                <UploadImage
                  class="mb-2"
                  :type="videoSetting.model"
                  placeholder="请上传视频图片"
                  @on-uploading="onUploading"
                  @on-success="onUploadSuccess"
                ></UploadImage>
                <p class="label my-2">图片创意描述：</p>
                <div class="prompt">
                  <n-input
                    v-model:value="videoPrompt"
                    class="textarea__inner"
                    rows="4"
                    autocomplete="off"
                    placeholder="请输入您要生成视频的描述，可以描述主题，场景，风格等等"
                    type="textarea"
                    :style="inputStyle"
                  ></n-input>
                </div>
              </div>
            </template>
          </Panel>
          <Panel icon="flat-color-icons:settings" title="参数设置">
            <template #content>
              <div>
                <span>设置模型：</span>
                <div class="prompt">
                  <n-select
                    v-model:value="videoSetting.model"
                    :options="modelOptions"
                  />
                </div>
              </div>
            </template>
          </Panel>
        </n-tab-pane>
      </n-tabs>
      <div class="flex justify-end mt-2 gap-4">
        <n-button
          class="prompt-btn__primary"
          round
          @click="createVideoTask"
          :disabled="!videoPrompt && !uploadImage.url"
          type="primary"
          >生成视频</n-button
        >
      </div>
    </div>
    <div class="flex flex-col w-full h-full items-center justify-between pt-10">
      <MediaHistory
        type="videos"
        :generating="generating"
        @upscale-video="upscaleVideoTask"
      ></MediaHistory>
    </div>
  </div>
</template>
<script setup>
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import { videoRecommendPrompt } from "@/utils"
import { useVideo } from "./useVideo"
import MediaHistory from "@/components/media-history/index.vue"

const {
  videoPrompt,
  activeName,
  videoSetting,
  modelOptions,
  inputStyle,
  uploadImage,
  generating,
  createVideoTask,
  upscaleVideoTask,
  onUploading,
  onUploadSuccess,
} = useVideo()
</script>

<style scoped lang="scss">
.image-preview {
  overflow: hidden;
  background: linear-gradient(264.35deg, #22403eb3 2.09%, #283d46b3 94.63%);
  box-shadow: -2px 4px 4px #0000001f;
  .n-image {
    height: 160px;
  }
}
.video-progress-container {
  background-color: #191d21dd;
  color: #c5c7d5;
}
.video-history {
  width: 120px;
  height: 65px;
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
