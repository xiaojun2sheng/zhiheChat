<template>
  <div class="pcedit">
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
</template>
<script setup>
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import { useImageText } from "./useImageText"
import { imageRecommendPrompt } from "@/utils"


const emit = defineEmits(["on-success", "on-loading", "on-end"])
const { modelOptions, imageSetting, sourceImageSuccess, generateImage } =
  useImageText(emit)
</script>
<style lang="sass" scoped></style>
