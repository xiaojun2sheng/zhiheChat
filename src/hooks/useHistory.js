import { useHistoryStore } from "@/stores"
import { generateUUID } from "@/utils"
import dayjs from "dayjs"
export const useHistory = () => {
  const historyStore = useHistoryStore()

  const initHistory = () => {
    const imageJson = localStorage.getItem("chatbot-image-history") || "[]"
    const videoJson = localStorage.getItem("chatbot-video-history") || "[]"
    const audioJson = localStorage.getItem("chatbot-audio-history") || "[]"
    const fileJson = localStorage.getItem("chatbot-file-history") || "[]"

    let historyImages = JSON.parse(imageJson)
    let historyVideos = JSON.parse(videoJson)
    let historyAudios = JSON.parse(audioJson)
    let historyFiles = JSON.parse(fileJson)

    // 模型改造
    historyImages = historyImages.map((item) => {
      let result = {}
      if (!item.uuid) {
        result.data = item.data ? { ...item } : { data: item }
        result.uuid = generateUUID()
      } else result = item.data ? item : { data: item, ...item }
      return result
    })
    historyVideos = historyVideos.map((item) => {
      let result = item
      if (!item.uuid) {
        result.data = { ...item }
        result.uuid = generateUUID()
      }
      return result
    })
    historyAudios = historyAudios.map((item) => {
      let result = {}
      if (!item.uuid) {
        result.data = { ...item }
        result.uuid = generateUUID()
      } else result = item
      return result
    })
    historyFiles = historyFiles.map((item) => {
      let result = {}
      if (!item.uuid) {
        result.data = { ...item }
        result.uuid = generateUUID()
      } else result = item
      return result
    })

    historyStore.setImages(historyImages)
    historyStore.setVideos(historyVideos)
    historyStore.setAudios(historyAudios)
    historyStore.setFiles(historyFiles)
  }

  const addImage = (image) => {
    historyStore.setImages([
      {
        ...image,
        uuid: generateUUID(),
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      ...historyStore.images,
    ])
    setLocalStorage()
  }

  const removeImageByUUID = (uuid) => {
    historyStore.setImages(
      historyStore.images.filter((item) => item.uuid !== uuid)
    )
    setLocalStorage()
  }

  const addVideo = (video) => {
    historyStore.setVideos([
      {
        ...video,
        uuid: generateUUID(),
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      ...historyStore.videos,
    ])
    setLocalStorage()
  }

  const removeVideoByUUID = (uuid) => {
    historyStore.setVideos(
      historyStore.videos.filter((item) => item.uuid !== uuid)
    )
    setLocalStorage()
  }

  const addAudio = (audio) => {
    // 音频缓存无效
    historyStore.setAudios([
      {
        ...audio,
        uuid: generateUUID(),
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      ...historyStore.audios,
    ])
    // setLocalStorage()
  }

  const removeAudioByUUID = (uuid) => {
    historyStore.setAudios(
      historyStore.audios.filter((item) => item.uuid !== uuid)
    )
    setLocalStorage()
  }

  const addFile = (file) => {
    historyStore.setFiles([...historyStore.files, file])
    setLocalStorage()
  }

  const removeFileByUUID = (uuid) => {
    historyStore.setFiles(
      historyStore.files.filter((item) => item.uuid !== uuid)
    )
    setLocalStorage()
  }

  const setLocalStorage = () => {
    localStorage.setItem(
      "chatbot-image-history",
      JSON.stringify(historyStore.images)
    )
    localStorage.setItem(
      "chatbot-video-history",
      JSON.stringify(historyStore.videos)
    )
    localStorage.setItem(
      "chatbot-audio-history",
      JSON.stringify(historyStore.audios)
    )
    localStorage.setItem(
      "chatbot-file-history",
      JSON.stringify(historyStore.audios)
    )
  }

  const clearHistory = () => {
    historyStore.setImages([])
    historyStore.setVideos([])
    historyStore.setAudios([])
    historyStore.setFiles([])
  }

  return {
    initHistory,
    addImage,
    removeImageByUUID,
    addVideo,
    removeVideoByUUID,
    addAudio,
    removeAudioByUUID,
    addFile,
    removeFileByUUID,
  }
}
