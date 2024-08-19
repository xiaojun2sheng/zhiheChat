<template>
  <div class="common_page flex gap-2">
    <div class="w-[400px] shrink-0">
      <n-tabs
        type="line"
        v-model:value="activeName"
        animated
        @update:value="jumpPage"
      >
        <n-tab-pane name="text" tab="文字生成音频">
          <Panel icon="flat-color-icons:idea" title="创意描述">
            <template #content>
              <div class="prompt">
                <n-input
                  v-model:value="voiceSoundConfig.input"
                  class="textarea__inner"
                  rows="4"
                  autocomplete="off"
                  placeholder="请输入您要生成音频的文案"
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
          <Panel icon="flat-color-icons:settings" title="参数设置">
            <template #content>
              <div>
                <span>选择音色：</span>
                <div>
                  <n-tag
                    class="m-1"
                    v-for="item in voiceSounds"
                    :key="item.label"
                    v-model:checked="item.checked"
                    checkable
                    @click="voiceSoundSelect(item.label)"
                    >{{ item.label }}
                  </n-tag>
                </div>
              </div>
              <div>
                <span>声音速度：</span>
                <div>
                  <n-slider
                    v-model:value="voiceSoundConfig.speed"
                    :min="0.25"
                    :max="4"
                    :step="0.25"
                  />
                </div>
              </div>
            </template>
          </Panel>

          <div class="flex justify-end mt-2 gap-4">
            <n-button
              class="prompt-btn__primary"
              @click="createVoice"
              :disabled="!voiceSoundConfig.input"
              round
              type="primary"
              >生成音频</n-button
            >
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div class="flex flex-col w-full mt-10 items-center">
      <n-spin :show="loading">
        <div
          class="image-box px-10 min-h-[300px] flex gap-2 justify-center items-center"
        >
          <audio v-if="resData" :src="resData" controls="controls"></audio>
          <n-empty v-else description="请生成音频" />
        </div>
      </n-spin>
      <Tips></Tips>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue"
import { textToVoice } from "@/api/index"
import Panel from "@/components/panel/index.vue"
import { voiceSoundOptions } from "@/utils/constant"

let activeName = ref("text")

// 生成的音频
let resData = ref(null)

// 字符串不限制长度，按照1500个字符进行切割，切换成数组，然后生成数组blob
const splitVoiceText = (str) => {
  const chunks = []
  const chunkSize = 15000
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize))
  }
  return chunks
}

let loading = ref(false)

const voiceSounds = ref([])
onMounted(() => {
  voiceSounds.value = voiceSoundOptions.map((t) => {
    return { label: t, checked: false }
  })
  voiceSounds.value[3].checked = true
})

const voiceSoundSelect = (label) => {
  voiceSounds.value.forEach((t) => {
    if (t.label == label) {
      t.checked = true
      voiceSoundConfig.value.voice = label
    } else t.checked = false
  })
}

// 文字生成语音参数
let voiceSoundConfig = ref({
  model: "tts-1",
  input: "",
  voice: "云健", //纪录片 8bad0cb3e890489a8925db005f85a765
  speed: 1,
})
const createVoice = async () => {
  let voiceTextList = splitVoiceText(voiceSoundConfig.value.input)
  let voiceBlobList = []
  loading.value = true
  for (const item of voiceTextList) {
    let res = await textToVoice({
      data: Object.assign({}, voiceSoundConfig.value, { input: item }),
      responseType: "blob",
    })
    if (res == "error") return (loading.value = false)
    if (res) {
      const elink = document.createElement("a")
      elink.download = "voice.mp3"
      elink.style.display = "none"
      const blob = new Blob([res], { type: "audio/mpeg" })
      voiceBlobList.push(blob)
    }
    if (voiceTextList.length == voiceBlobList.length) {
      mergeBlobToMp3(voiceBlobList)
    }
  }
}

const mergeBlobToMp3 = (voiceBlobList) => {
  const blob = new Blob(voiceBlobList, { type: "audio/mpeg" })
  const audioUrl = URL.createObjectURL(blob)
  resData.value = audioUrl
  loading.value = false
}

// 音频配置
let dialogVisible = ref(false)

// 确认替换提示词
const submitDialog = () => {
  dialogVisible.value = false
}
// 取消替换提示词
const cancelDialog = () => {
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
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
.diglog_title {
  display: inline-block;
  font-size: 14px;
  margin: 8px 0;
}
.sound_tag {
  margin-right: 8px;
}
</style>
