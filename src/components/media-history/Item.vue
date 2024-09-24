<template>
  <div class="history-item">
    <div class="left">
      <n-avatar :src="LogoAvatar" round></n-avatar>
    </div>
    <div class="right">
      <div class="header">
        <div class="header_left">
          <span class="tag">AI 机器人</span>
          <span class="time">2024-09-19 22:31:06 </span>
        </div>
        <div class="header_right">
          <!-- <span class="cursor-pointer">分享</span> -->
          <span class="cursor-pointer" @click="deleteMedia">删除</span>
          <span v-if="mediaData?.grade == 'draft'" class="cursor-pointer" @click="emit('upscale-video')">视频优化</span>
        </div>
      </div>
      <div class="content">
        <p class="prompt-zh">
          {{ data.prompt || data.videoPrompt }}
        </p>
        <div class="media-box">
          <template v-if="type === 'images'">
            <n-spin v-if="loading"></n-spin>
            <div v-else>
              <n-image width="340px" :src="mediaData?.[0]?.url || mediaData?.url"></n-image>
            </div>
          </template>
          <template v-else-if="type === 'videos'">
            <div
              v-if="loading"
              class="video-progress-container w-full h-full flex flex-col justify-center items-center rounded-lg py-8"
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
            <vue-video-player
              v-else
              :width="450"
              :src="mediaData.uri"
              :poster="mediaData.cover_uri"
              controls
              :loop="true"
              :volume="0.6"
            ></vue-video-player>
          </template>
          <template v-else-if="type === 'audios'">
            <n-spin v-if="loading"></n-spin>
            <div v-else></div>
          </template>
        </div>
      </div>
      <div class="actions"></div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted } from "vue"
import LogoAvatar from "@/assets/logo.png"
import { useCountDown } from "@/hooks/useCountDown"

const { progress, initCountDown, clearCountDown } = useCountDown()

const props = defineProps({
  data: Object,
  type: String,
  loading: Boolean,
})
const emit = defineEmits(["delete", "upscale-video"])
const mediaData = computed(() => props.data.data)

const deleteMedia = () => {
  emit("delete")
  clearCountDown()
}

onMounted(() => {
  if (props.loading) initCountDown()
})
onUnmounted(() => {
  clearCountDown()
})
</script>

<style lang="scss" scoped>
.history-item {
  padding: 10px;
  display: flex;
  gap: 10px;
  background-color: #171c23;
  border-radius: 10px;
  .right {
    width: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-bottom: 10px;
      .header_left {
        .tag {
          padding: 2px 5px;
          border-radius: 4px;
          background-color: #4b5096;
          margin-right: 5px;
        }
        .time {
          color: #707070;
        }
      }
      .header_right {
        color: #949ba4;
        display: flex;
        gap: 10px;
        span:hover {
          color: #ffffff;
        }
      }
    }
    .content {
      .prompt-zh {
        word-break: break-all;
        white-space: normal;
        margin: 5px 0;
        font-size: 12px;
      }
    }
  }
}
</style>
