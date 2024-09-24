import { defineStore } from "pinia"

export const useHistoryStore = defineStore({
  id: "history",
  state: () => {
    return {
      images: [], // 图片
      videos: [], // 视频
      audios: [], // 音频
      files: [], // 用户上传的文件
    }
  },
  getters: {},
  actions: {
    setImages(images) {
      this.images = images
    },
    setVideos(videos) {
      this.videos = videos
    },
    setAudios(audios) {
      this.audios = audios
    },
    setFiles(files) {
      this.files = files
    },
  },
})
