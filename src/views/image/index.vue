<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px] shrink-0 overflow-auto">
      <n-tabs type="line" v-model:value="activeName" animated>
        <n-tab-pane name="text" tab="生成图片" display-directive="show">
          <Panel icon="flat-color-icons:idea" title="创意描述">
            <template #content>
              <div class="prompt">
                <n-input
                  v-model:value="imageSetting.prompt"
                  class="textarea__inner"
                  rows="4"
                  autocomplete="off"
                  placeholder="请输入您要生成图片的描述，可以描述主题，场景，风格等等"
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
                  v-for="item in imageRecommendPrompt"
                  @click="imageSetting.prompt = item.desc"
                  >{{ item.label }}</span
                >
              </div>
            </template>
          </Panel>
          <Panel
            v-if="imageSetting.model == 'kling'"
            icon="flat-color-icons:settings"
            title="垫图/参考图"
          >
            <template #content>
              <div>
                <UploadImage
                  class="mb-2"
                  :type="imageSetting.model == 'kling' ? 'kling' : 'oss'"
                  placeholder="参考图"
                  @on-success="sourceImageSuccess"
                ></UploadImage>
              </div>
            </template>
          </Panel>
          <Panel icon="flat-color-icons:settings" title="参数设置">
            <template #content>
              <div>
                <span>设置模型：</span>
                <div class="prompt">
                  <n-select
                    v-model:value="imageSetting.model"
                    :options="modelOptions"
                  />
                </div>
              </div>
            </template>
          </Panel>
        </n-tab-pane>
        <n-tab-pane name="face" tab="AI 换脸" display-directive="show">
          <Panel icon="flat-color-icons:settings" title="上传图片">
            <template #content>
              <div>
                <UploadImage
                  class="mb-2"
                  type="'oss'"
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
        </n-tab-pane>
        <n-tab-pane name="tools" tab="图片百宝箱" display-directive="show">
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
                <span>处理方式：</span>
                <div>
                  <n-tag
                    class="m-1"
                    v-for="item in imageTools"
                    :key="item.label"
                    v-model:checked="item.checked"
                    checkable
                    @click="settingTagSelect('type', item.label)"
                    >{{ item.label }}
                  </n-tag>
                </div>
              </div>
              <div v-if="pceditSetting.type === '14' ">
                <span>风格选择：</span>
                <div>
                  <n-tag
                    class="m-1"
                    v-for="item in styleOptions"
                    :key="item.label"
                    v-model:checked="item.checked"
                    checkable
                    @click="settingTagSelect('style', item.label)"
                    >{{ item.label }}
                  </n-tag>
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
          @click="generateImage"
          type="primary"
          >生成图片</n-button
        >
      </div>
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
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import HistorySide from "@/components/history-side/index.vue"
import { imageRecommendPrompt } from "@/utils"
import { useImage } from "./useImage"

const {
  pceditSetting,
  styleOptions,
  modelOptions,
  activeName,
  historyImgs,
  inputStyle,
  loading,
  imageUrls,
  imageSetting,
  imageTools,
  settingTagSelect,
  targetImageSuccess,
  sourceImageSuccess,
  generateImage,
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
