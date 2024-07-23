<template>
  <div class="common_page flex gap-2">
    <div class="w-56">
      <n-tabs
        type="line"
        v-model:value="activeName"
        animated
        @update:value="jumpPage"
      >
        <n-tab-pane name="text" tab="文字生成视频">
          <n-input
            v-model:value="videoDesc"
            :maxlength="200"
            :autosize="{ minRows: 6, maxRows: 8 }"
            type="textarea"
            placeholder="请输入您要生成视频的描述，可以描述主题，场景，风格等等"
          />
          <div class="flex justify-between mt-2">
            <n-button
              @click="betterPrompt"
              :disabled="!videoDesc"
              type="primary"
              >优化提示词</n-button
            >
            <n-button @click="createVideo" :disabled="!videoDesc" type="primary"
              >生成视频</n-button
            >
          </div>
        </n-tab-pane>
        <n-tab-pane name="image" tab="图片生成视频"
          ><h2>敬请期待</h2></n-tab-pane
        >
      </n-tabs>
    </div>
    <n-spin :show="!!createVideoTaskId">
      <label class="waring_desc">
        <el-icon size="14"><WarnTriangleFilled /></el-icon>
        请遵守中华人民共和国网络安全法，
        严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理</label
      >
      <div v-if="resData.length > 0">
        <div v-for="item in resData" :key="item.url">
          <video width="100%" height="300px" controls>
            <source :src="item.resource.resource" type="video/mp4" />
          </video>
        </div>
      </div>
      <el-empty v-else description="请生成视频" />
    </n-spin>
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

<style scoped lang="less">
@import "@/commonCss/index.less";
.width_btn {
  width: calc(50% - 8px);
  margin-top: 8px;
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
.center_btn_box {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
