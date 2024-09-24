<template>
  <div class="media-history h-full w-full">
    <div class="flex-align">
      <span class="mr-[10px] text-[#949BA4] text-lg">#</span>
      <span class="text-sm">创作中心</span>
      <span class="ml-[10px] text-[#F0B132] text-xs">
        请遵守中华人民共和国网络安全法，
        严禁生成涉及政治人物，色情、恐怖等不良内容， 如有违规封号处理
      </span>
    </div>
    <div class="list h-full overflow-y-auto">
      <template v-if="list.length == 0">
        <Item :data="{}" type="empty"></Item>
      </template>
      <template v-else>
        <Item v-if="generating" :data="{}" :type="type" :loading="true"></Item>
        <Item
          v-for="item in list"
          :data="item"
          :type="type"
          @delete="removeMedia(item.uuid)"
          @upscale-video="emit('upscale-video', item.data)"
        ></Item>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { useHistoryStore } from "@/stores"
import Item from "./Item.vue"
import { useHistory } from "@/hooks/useHistory"

const emit = defineEmits(["upscale-video"])

const historyStore = useHistoryStore()
const { initHistory, removeVideoByUUID, removeImageByUUID, removeAudioByUUID } =
  useHistory()
initHistory()

const props = defineProps({
  type: String,
  generating: Boolean,
})

const list = computed(() => {
  return historyStore[props.type]
})

const removeMedia = (uuid) => {
  historyStore[props.type] = historyStore[props.type].filter(
    (item) => item.uuid !== uuid
  )
  if (props.type === "images") {
    removeImageByUUID(uuid)
  } else if (props.type === "videos") {
    removeVideoByUUID(uuid)
  } else if (props.type === "audios") {
    removeAudioByUUID(uuid)
  }
  window.$message.success("删除成功")
}
</script>

<style lang="scss" scoped>
.media-history {
  display: flex;
  flex-direction: column;
  .list {
    background-color: #0a0f18;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 5px;
  }
}
</style>
