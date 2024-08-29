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
          <Panel icon="flat-color-icons:settings" title="上传图片">
            <template #content>
              <div>
                <UploadImage
                  class="mb-2"
                  type="kling"
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
                  <n-input
                    v-model:value="imageSetting.model"
                    class="textarea__inner"
                    rows="4"
                    autocomplete="off"
                    placeholder="请输入您要生成图片的描述，可以描述主题，场景，风格等等"
                    :style="inputStyle"
                  ></n-input>
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
                  type="vidu"
                  placeholder="请上传原始图片"
                  @on-success="sourceImageSuccess"
                ></UploadImage>
                <UploadImage
                  type="vidu"
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
                  type="vidu"
                  placeholder="请上传原始图片"
                  @on-success="sourceImageSuccess"
                ></UploadImage>
                <!-- <UploadImage
                  type="vidu"
                  placeholder="请上传被替换的图片"
                  @on-success="targetImageSuccess"
                ></UploadImage> -->
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
                    @click="imageToolSelect(item.label)"
                    >{{ item.label }}
                  </n-tag>
                </div>
                <div>
                  <span>设置模型：</span>
                  <div class="prompt">
                    <n-input
                      v-model:value="imageSetting.model"
                      class="textarea__inner"
                      rows="4"
                      autocomplete="off"
                      placeholder="请输入您要生成图片的描述，可以描述主题，场景，风格等等"
                      :style="inputStyle"
                    ></n-input>
                  </div>
                </div>
              </div>
            </template>
          </Panel>
        </n-tab-pane>
      </n-tabs>
      <div class="flex justify-end mt-2 gap-4">
        <!-- <n-button
          class="prompt-btn__primary"
          round
          @click="betterPrompt"
          :disabled="!imageSetting.prompt"
          type="primary"
          >优化提示词</n-button
        > -->
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
            class="rounded-md"
            width="240"
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

    <!-- 优化提示词 -->
    <el-dialog
      v-model="dialogVisible"
      title="优化提示词"
      width="500"
      :before-close="cancelBetterPrompt"
    >
      <span v-if="batterImageDesc">{{ batterImageDesc }}</span>
      <span v-else>正在生成提示词优化，请耐心等待...</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelBetterPrompt">取消</el-button>
          <el-button
            type="primary"
            :disabled="!batterImageDesc"
            @click="submitBetterPrompt"
            >替换</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"
import axios from "axios"
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import HistorySide from "@/components/history-side/index.vue"
import { imageRecommendPrompt } from "@/utils"
import { useImage } from "./useImage"

const {
  activeName,
  historyImgs,
  inputStyle,
  loading,
  imageUrls,
  imageSetting,
  imageTools,
  imageToolSelect,
  targetImageSuccess,
  sourceImageSuccess,
  generateImage,
  deleteHistory,
  selectHistory,
} = useImage()

let batterImageDesc = ref("")
// 优化提示词
let dialogVisible = ref(false)
const betterPrompt = async () => {
  dialogVisible.value = true
  // https://openai.chatfire.cn/prompts?prompt=一直带有雄鹰翅膀的老虎，飞翔在大海上方
  axios
    .get(
      "https://openai.chatfire.cn/prompts?prompt=" + imageSetting.value.prompt
    )
    .then((res) => {
      batterImageDesc.value = res.data.result
    })
    .catch((error) => {
      ElMessage({ message: "优化提示词失败，请重新尝试一下", type: "warning" })
      dialogVisible.value = false
    })
}

// 确认替换提示词
const submit = () => {
  imageSetting.value = batterImageDesc.value
  batterImageDesc.value = ""
  dialogVisible.value = false
}
// 取消替换提示词
const cancelBetterPrompt = () => {
  batterImageDesc.value = ""
  dialogVisible.value = false
}
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
</style>
