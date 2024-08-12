<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px] shrink-0">
      <n-tabs
        type="line"
        v-model:value="activeName"
        animated
        @update:value="jumpPage"
      >
        <n-tab-pane name="text" tab="文字生成视频">
          <Panel icon="flat-color-icons:idea" title="创意描述">
            <template #content>
              <div class="prompt">
                <n-input
                  v-model:value="videoDesc"
                  class="textarea__inner"
                  rows="4"
                  autocomplete="off"
                  placeholder="请输入您要生成视频的描述，可以描述主题，场景，风格等等"
                  type="textarea"
                  :style="{
                    '--n-border-hover': 'transparent',
                    '--n-border-focus': 'transparent',
                    '--n-box-shadow-focus': 'none',
                  }"
                ></n-input>
              </div>
            </template>
            <template #footer>
              <div class="footer">
                <span class="label">推荐尝试：</span>
                <span
                  class="val mr-2 cursor-pointer"
                  v-for="item in videoRecommendPrompt"
                  @click="videoDesc = item.desc"
                  >{{ item.label }}</span
                >
              </div>
            </template>
          </Panel>
          <Panel icon="flat-color-icons:settings" title="参数设置"></Panel>
          <div class="flex justify-end mt-2 gap-4">
            <n-button
              class="prompt-btn__primary"
              round
              @click="betterPrompt"
              :disabled="!videoDesc"
              type="primary"
              >优化提示词</n-button
            >
            <n-button
              class="prompt-btn__primary"
              round
              @click="createVideoTask"
              :disabled="!videoDesc"
              type="primary"
              >生成视频</n-button
            >
            <n-button
              v-if="videoUrl"
              class="prompt-btn__primary"
              round
              @click="upscaleVideoTask"
              type="primary"
              >视频优化</n-button
            >
          </div>
        </n-tab-pane>
        <n-tab-pane name="image" tab="图片生成视频">
          <Panel icon="flat-color-icons:idea" title="请上传">
            <template #content>
              <div class="prompt">
                <UploadFile>
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
                <!-- <n-upload
                  multiple
                  directory-dnd
                  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                  :max="5"
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
                </n-upload> -->
              </div>
            </template>
          </Panel>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="flex flex-col w-full mt-10 items-center">
      <div
        class="video-box w-4/5 min-h-[300px] flex justify-center items-center"
      >
        <div
          v-if="createVideoTaskId"
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
        <video v-else-if="videoUrl" width="100%" height="300px" controls>
          <source :src="videoUrl" type="video/mp4" />
        </video>
        <n-empty v-else description="快去生成你的创意吧" />
      </div>
      <Tips></Tips>
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
import { useCountDown } from "@/hooks/useCountDown"
import { KLingAdapter, ViduAdapter } from "@/adapter"

// const adapter = new KLingAdapter()
const adapter = new ViduAdapter()
let activeName = ref("text")

let videoDesc = ref("")
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

let createVideoTaskId = ref("")
// 轮训任务
let intervalId = ref(null)

const { progress, initCountDown, clearCountDown } = useCountDown()
const createVideoTask = async () => {
  if (createVideoTaskId.value)
    return window.$message.warning("正在生成视频中。。")

  let id = await adapter.createVideoTask(videoDesc.value)
  createVideoTaskId.value = id
  // 倒计时
  initCountDown()
  intervalId.value = setInterval(getVideoTask, 3000)
}

// 生成的视频
let videoUrl = ref("")
const getVideoTask = async () => {
  if (!createVideoTaskId.value) return
  let url = await adapter.getVideoUrl(createVideoTaskId.value)
  if (url) {
    window.$message.success("视频生成成功")
    console.log("视频地址：", url)
    videoUrl.value = url
    clearInterval(intervalId.value)
    createVideoTaskId.value = null
    clearCountDown()
  } else {
    // window.$message.error("视频生成失败")
  }
}
</script>

<style scoped lang="scss">
.video-progress-container {
  background-color: #191d21dd;
  color: #c5c7d5;
}
</style>
