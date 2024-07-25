<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px]">
      <n-tabs
        type="line"
        v-model:value="activeName"
        animated
        @update:value="jumpPage"
        ><n-tab-pane name="text" tab="文字生成图片">
          <Panel icon="flat-color-icons:idea" title="创意描述">
            <template #content>
              <div class="prompt">
                <n-input
                  v-model:value="imageDesc"
                  class="textarea__inner"
                  rows="4"
                  autocomplete="off"
                  placeholder="请输入您要生成图片的描述，可以描述主题，场景，风格等等"
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
                  v-for="item in imageRecommendPrompt"
                  @click="imageDesc = item.desc"
                  >{{ item.label }}</span
                >
              </div>
            </template>
          </Panel>
          <div class="flex justify-end mt-2 gap-4">
            <n-button
              class="prompt-btn__primary"
              round
              @click="betterPrompt"
              :disabled="!imageDesc"
              type="primary"
              >优化提示词</n-button
            >
            <n-button
              class="prompt-btn__primary"
              round
              @click="createImage"
              :disabled="!imageDesc"
              type="primary"
              >生成图片</n-button
            >
          </div>
        </n-tab-pane></n-tabs
      >
    </div>
    <div class="flex flex-col">
      <n-spin :show="!!createLoading">
        <!-- <label class="waring_desc">
          <el-icon size="14"><WarnTriangleFilled /></el-icon>
          请遵守中华人民共和国网络安全法，
          严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理
        </label> -->
        <div
          class="video-box w-full flex justify-center"
          v-if="resData.length > 0"
        >
          <div
            class="flex justify-center"
            v-for="item in resData"
            :key="item.url"
          >
            <img class="image_item" :src="item.url" />
          </div>
        </div>
        <n-empty v-else description="请生成图片" />
      </n-spin>
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
import { createImgeApi } from "@/api/index"
import { ElMessage } from "element-plus"
import axios from "axios"
import UploadImage from "@/components/uploadImage.vue"
import Panel from "@/components/panel/index.vue"
import { imageRecommendPrompt } from "@/utils"

let activeName = ref("text")

let imageDesc = ref("")
let batterImageDesc = ref("")
// 优化提示词
let dialogVisible = ref(false)
const betterPrompt = async () => {
  dialogVisible.value = true
  // https://openai.chatfire.cn/prompts?prompt=一直带有雄鹰翅膀的老虎，飞翔在大海上方
  axios
    .get("https://openai.chatfire.cn/prompts?prompt=" + imageDesc.value)
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
  imageDesc.value = batterImageDesc.value
  batterImageDesc.value = ""
  dialogVisible.value = false
}
// 取消替换提示词
const cancelBetterPrompt = () => {
  batterImageDesc.value = ""
  dialogVisible.value = false
}

// 生成的图片
let resData = ref([])
let createLoading = ref(false)
const createImage = async () => {
  createLoading.value = true
  let res = await createImgeApi({
    data: {
      model: "kolors",
      prompt: imageDesc.value,
      n: 1,
      size: "1024x1024",
    },
  })
  resData.value = res.data || []
  createLoading.value = false
}
</script>

<style scoped lang="scss">
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
</style>
