<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px] shrink-0">
      <n-tabs type="line" v-model:value="activeName" animated>
        <n-tab-pane name="text" tab="文字生成视频">
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
          <Panel icon="flat-color-icons:settings" title="参数设置"></Panel>
        </n-tab-pane>
        <n-tab-pane name="image" tab="图片生成视频">
          <Panel icon="flat-color-icons:idea" title="图片创意描述">
            <template #content>
              <div class="base-image">
                <NSpin :show="loading">
                  <UploadFile
                    v-if="!uploadImage.url"
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
                      <n-text style="font-size: 16px">
                        点击或者拖动文件到该区域来上传
                      </n-text>
                      <n-p depth="3" style="margin: 8px 0 0 0">
                        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                      </n-p>
                    </n-upload-dragger>
                  </UploadFile>
                </NSpin>
                <div
                  v-if="uploadImage.url"
                  class="image-preview flex items-center justify-between rounded-md"
                >
                  <n-image
                    class="rounded-md"
                    :width="160"
                    :height="160"
                    object-fit="cover"
                    :src="uploadImage.url"
                  ></n-image>
                  <span class="m-2">{{ uploadImage.filename }}</span>
                  <SvgIcon
                    class="mr-2"
                    :width="25"
                    :height="25"
                    icon="mdi:delete-outline"
                    @click="uploadImage = {}"
                  ></SvgIcon>
                </div>
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
        </n-tab-pane>
      </n-tabs>
      <div class="flex justify-end mt-2 gap-4">
        <n-button
          class="prompt-btn__primary"
          round
          @click="betterPrompt"
          :disabled="!videoPrompt"
          type="primary"
          >优化提示词</n-button
        >
        <n-button
          class="prompt-btn__primary"
          round
          @click="createVideoTask"
          :disabled="!videoPrompt && !uploadImage.url"
          type="primary"
          >生成视频</n-button
        >
        <n-button
          v-if="videoInfo?.grade == 'draft'"
          class="prompt-btn__primary"
          round
          @click="upscaleVideoTask"
          type="primary"
          >视频优化</n-button
        >
      </div>
    </div>
    <div class="flex flex-col w-full mt-10 items-center">
      <div
        class="video-box w-4/5 min-h-[300px] flex justify-center items-center"
      >
        <div
          v-if="generating"
          class="video-progress-container w-full h-full flex flex-col justify-center items-center rounded-lg p-8"
        >
          <n-progress
            type="line"
            color="#63E2B8"
            :percentage="progress"
            processing
          />
          <span class="text-sm mt-3">生成中，预计需要 2 - 5 分钟，请稍候~</span>
        </div>
        <video
          v-else-if="videoInfo?.uri"
          width="100%"
          height="300px"
          :src="videoInfo?.uri"
          controls
        ></video>
        <n-empty v-else description="快去生成你的创意吧" />
      </div>
      <Tips></Tips>
    </div>
    <div v-if="historyVideos.length > 0">
      <KeepAlive>
        <HistorySide>
          <template #content>
            <div>
              <n-image
                v-for="item in historyVideos"
                width="240"
                :preview-disabled="true"
                :src="item.cover_uri"
                @click="selectHistory(item)"
              />
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
      <span v-if="batterVideoDesc">{{ batterVideoDesc }}</span>
      <span v-else>正在生成提示词优化，请耐心等待...</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelBetterPrompt">取消</el-button>
          <el-button
            type="primary"
            :disabled="!batterVideoDesc"
            @click="submitBetterPrompt"
            >替换</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { ElMessage } from "element-plus"
import axios from "axios"
import Panel from "@/components/panel/index.vue"
import UploadFile from "@/components/upload/index.vue"
import Tips from "@/components/tips.vue"
import { videoRecommendPrompt } from "@/utils"
import { useVideo } from "./useVideo"

const {
  videoUrl,
  videoPrompt,
  activeName,
  loading,
  inputStyle,
  uploadImage,
  generating,
  progress,
  videoInfo,
  historyVideos,
  selectHistory,
  createVideoTask,
  upscaleVideoTask,
  onUploading,
  onUploadSuccess,
} = useVideo()

let batterVideoDesc = ref("")
// 优化提示词
let dialogVisible = ref(false)
const betterPrompt = async () => {
  dialogVisible.value = true
  // https://openai.chatfire.cn/prompts?prompt=一直带有雄鹰翅膀的老虎，飞翔在大海上方
  axios
    .get("https://openai.chatfire.cn/prompts?prompt=" + videoDesc.value)
    .then((res) => {
      batterVideoDesc.value = res.data.result
    })
    .catch((error) => {
      ElMessage({ message: "优化提示词失败，请重新尝试一下", type: "warning" })
      dialogVisible.value = false
    })
}

// 确认替换提示词
const submitBetterPrompt = () => {
  videoDesc.value = batterVideoDesc.value
  batterVideoDesc.value = ""
  dialogVisible.value = false
}
// 取消替换提示词
const cancelBetterPrompt = () => {
  batterVideoDesc.value = ""
  dialogVisible.value = false
}
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
</style>
