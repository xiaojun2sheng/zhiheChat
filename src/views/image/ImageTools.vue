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
          <div>
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
        </div>
      </template>
    </Panel>
    <div class="flex justify-end mt-2 gap-4">
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
import { usePcedit } from "./usePcedit"

const emit = defineEmits(["on-pcedit-generate"])
const {
  pceditSettings,
  ratioOptions,
  styleOptions,
  imageToolSelect,
  ratioSelect,
  styleSelect,
  generatePcedit,
} = usePcedit(emit)
</script>
<style lang="sass" scoped></style>
