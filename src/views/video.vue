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
              @click="createVideo"
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
      <n-spin :show="!!createVideoTaskId">
        <div class="video-box w-full flex justify-center">
          <!-- <video class="w-3/5 rounded-xl" controls>
            <source
              src="https://h1.inkwai.com/bs2/upload-ylab-stunt/special-effect/output/HB1_PROD_ai_web_41379409/3932614183368399947/output.mp4"
              type="video/mp4"
            />
          </video> -->
          <div class="video-box w-full flex justify-center" v-if="resData.length > 0">
            <div v-for="item in resData" :key="item.url">
              <video width="100%" height="300px" controls>
                <source :src="item.resource.resource" type="video/mp4" />
              </video>
            </div>
          </div>
          <n-empty v-else description="请生成视频" />
        </div>

      </n-spin>
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
import { onMounted, ref } from "vue"
import { createVideoKlingApi, getVideoKlingApi } from "@/api/index"
import { ElMessage } from "element-plus"
import axios from "axios"
import UploadImage from "@/components/uploadImage.vue"
import Panel from "@/components/panel/index.vue"

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

// 生成的视频
let resData = ref([])
let createVideoTaskId = ref("")
// 轮训任务
let intervalId = ref(null)

const createVideo = async () => {
  if (createVideoTaskId.value)
    return ElMessage({ message: "正在生成视频中。。", type: "warning" })
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
  intervalId.value = setInterval(getVideoTask, 30000)
}

const getVideoTask = async () => {
  if (!createVideoTaskId.value) return
  let res = await getVideoKlingApi({
    data: {
      url: createVideoTaskId.value,
    },
  })
  if (res?.data?.works[0]?.resource?.resource) {
    ElMessage({
      message: "视频生成成功请查看",
      type: "success",
    })
    resData.value = res.data.works
    clearInterval(intervalId.value)
    createVideoTaskId.value = null
  } else {
    // ElMessage({ message: '视频生成失败', type: 'error' })
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



</style>
