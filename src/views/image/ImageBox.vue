<template>
  <div class="pcedit">
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
    <Panel v-if="!type" icon="flat-color-icons:settings" title="参数设置">
      <template #content>
        <div>
          <span>处理方式：</span>
          <div>
            <n-tag
              class="m-1"
              v-for="item in pceditTypeOptions"
              :key="item.label"
              v-model:checked="item.checked"
              checkable
              @click="pceditTypeChange(item.label)"
              >{{ item.label }}
            </n-tag>
          </div>
          <div v-if="pceditSettings.type == 14">
            <span>风格选择：</span>
            <div>
              <n-tag
                class="m-1"
                v-for="item in styleOptions"
                :key="item.label"
                v-model:checked="item.checked"
                checkable
                @click="styleSelect(item.label)"
                >{{ item.label }}
              </n-tag>
            </div>
          </div>
          <div v-if="pceditSettings.type == 4">
            <span>比例选择：</span>
            <div>
              <n-tag
                class="m-1"
                v-for="item in ratioOptions"
                :key="item.label"
                v-model:checked="item.checked"
                checkable
                @click="ratioSelect(item.label)"
                >{{ item.label }}
              </n-tag>
            </div>
          </div>
          <div v-if="pceditSettings.type == 6">
            <span>创造性：</span>
            <div>
              <n-slider
                v-model:value="pceditSettings.create_level"
                :min="0"
                :max="6"
                :step="1"
              />
            </div>
          </div>
        </div>
      </template>
    </Panel>
    <div class="flex justify-end mt-2 gap-4">
      <n-button
        v-if="loading"
        class="prompt-btn__primary"
        round
        type="primary"
        @click="clearTask"
        >终止任务</n-button
      >
      <n-button
        class="prompt-btn__primary"
        round
        @click="generatePcedit"
        type="primary"
        >生成图片</n-button
      >
    </div>
  </div>
</template>
<script setup>
import Panel from "@/components/panel/index.vue"
import UploadImage from "@/components/upload-image/index.vue"
import { useImageBox } from "./useImageBox"

const emit = defineEmits(["on-success", "on-generating"])
const props = defineProps({
  type: String,
})

const {
  loading,
  ratioOptions,
  styleOptions,
  pceditTypeOptions,
  pceditSettings,
  clearTask,
  sourceImageSuccess,
  ratioSelect,
  styleSelect,
  pceditTypeChange,
  generatePcedit,
} = useImageBox(emit, props)
</script>
<style lang="sass" scoped></style>
