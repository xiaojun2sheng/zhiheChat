<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px]">
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
          </div>
        </n-tab-pane>
        <n-tab-pane name="image" tab="图片生成视频">
          <Panel icon="flat-color-icons:idea" title="请期待"> </Panel>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="flex flex-col">
      <div class="video-box w-full flex justify-center">
        <div
          class="video-box w-4/5 h-[300px] mt-10 flex justify-center items-center"
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
            <span class="text-sm mt-3"
              >生成中，预计需要 2 - 5 分钟，请稍候~</span
            >
          </div>
          <video v-else-if="videoUrl" width="100%" height="300px" controls>
            <source :src="videoUrl" type="video/mp4" />
          </video>
          <n-empty v-else description="快去生成你的创意吧" />
        </div>
      </div>
      <span class="waring_desc justify-self-end">
        请遵守中华人民共和国网络安全法，
        严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理</span
      >
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
import { ref } from "vue"
import { createVideoKlingApi, getVideoKlingApi } from "@/api/index"
import { ElMessage } from "element-plus"
import axios from "axios"
import Panel from "@/components/panel/index.vue"
import { videoRecommendPrompt } from "@/utils"
import { useCountDown } from "@/hooks/useCountDown"

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
  let res = await createVideoKlingApi({
    data: {
      aspect_ratio: "16:9",
      camera: {
        horizontal: 0,
        pan: 0,
        roll: 0,
        tilt: 0,
        type: "empty",
        vertical: 0,
        zoom: 0,
      },
      cfg: 0.5,
      duration: 5,
      negative_prompt: "",
      prompt: videoDesc.value,
      tail_image_url: "",
      url: "",
    },
  })
  createVideoTaskId.value = res.id
  // 倒计时
  initCountDown()
  intervalId.value = setInterval(getVideoTask, 3000)
}

// 生成的视频
let videoUrl = ref("")
const getVideoTask = async () => {
  if (!createVideoTaskId.value) return
  let res = await getVideoKlingApi({
    data: {
      url: createVideoTaskId.value,
    },
  })
  if (res?.data?.works[0]?.resource?.resource) {
    window.$message.success("视频生成成功请查看")
    videoUrl.value = res.data.works[0].resource.resource
    clearInterval(intervalId.value)
    createVideoTaskId.value = null
    clearCountDown()
  } else {
    // window.$message.error("视频生成失败")
  }
}
</script>

<style scoped lang="scss">
.waring_desc {
  text-align: center;
  color: rgb(106, 114, 124);
  font-size: 12px;
  margin-top: 36px;
}
.video-progress-container {
  background-color: #191d21dd;
  color: #c5c7d5;
}
</style>
