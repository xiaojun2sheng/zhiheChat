import { ref, onMounted, computed } from "vue"
import { viduApi } from "@/api/index"
import { useCountDown } from "@/hooks/useCountDown"

export const useVideo = (url) => {
  const { progress, initCountDown, clearCountDown } = useCountDown()
  const activeName = ref("text")
  const videoPrompt = ref("")
  const inputStyle = ref({
    "--n-border-hover": "transparent",
    "--n-border-focus": "transparent",
    "--n-box-shadow-focus": "none",
  })

  const uploadImage = ref({})
  const loading = ref(false)
  const onUploading = (data) => {
    loading.value = data
  }
  const onUploadSuccess = (data) => {
    uploadImage.value = data
  }

  const intervalId = ref("")
  const generating = ref(false)
  const createVideoTask = async () => {
    if (generating.value) return window.$message.warning("正在生成视频中。。")
    if (activeName.value != "text" && !uploadImage.value.url)
      return window.$message.warning("请上传图片")
    if (activeName.value == "text" && !videoPrompt.value)
      return window.$message.warning("请输入创意")

    videoInfo.value = undefined
    // tab1 不需要传图
    const uploadImageUrl =
      activeName.value == "text" ? "" : uploadImage.value.url

    const req = {
      prompt: videoPrompt.value,
      url: uploadImageUrl,
      style: "general",
      aspect_ratio: "16:9",
      duration: 4,
    }
    generating.value = true
    const res = await viduApi.createVideo(req).catch((err) => {
      generating.value = false
    })
    if (!res.id) return
    videoInfo.value = { taskId: res.id }
    localStorage.setItem("chatbot-video-generating-id", res.id)
    // 倒计时
    initCountDown()
    intervalId.value = setInterval(getVideoInfo, 3000)
  }

  let videoInfo = ref()
  const getVideoInfo = async () => {
    if (!generating.value && videoInfo.value.taskId) return

    const res = await viduApi.getVideo(videoInfo.value.taskId).catch((err) => {
      generating.value = false
      localStorage.setItem("chatbot-video-generating-id", "")
      clearInterval(intervalId.value)
    })
    console.log("getVideoInfo res", res)
    if (!generating.value) return
    const creation = res?.creations[0]
    if (creation) {
      creation.taskId = creation.task_id
      creation.creationId = creation.id
      videoInfo.value = creation

      addHistory({
        videoPrompt: videoPrompt.value,
        uploadImage: uploadImage.value,
        ...creation,
      })
      window.$message.success("视频生成成功")
      clearInterval(intervalId.value)
      localStorage.setItem("chatbot-video-generating-id", "")
      generating.value = false
      clearCountDown()
    }
  }

  const upscaleVideoTask = async () => {
    const res = await viduApi.videoUpscale({
      task_id: videoInfo.value.taskId + "",
      creation_id: videoInfo.value.creationId + "",
    })
    videoInfo.value = { taskId: res.id }
    localStorage.setItem("chatbot-video-generating-id", res.id)
    console.log("upscaleVideoTask res", res)
    // 倒计时
    initCountDown()
    generating.value = true
    intervalId.value = setInterval(getVideoInfo, 3000)
  }

  const addHistory = async (video) => {
    const json = localStorage.getItem("chatbot-video-history") || "[]"
    let historys = JSON.parse(json)
    historys.push(video)
    localStorage.setItem("chatbot-video-history", JSON.stringify(historys))
  }
  const historyVideos = ref([])
  const initHistory = async () => {
    const json = localStorage.getItem("chatbot-video-history") || "[]"
    const t = JSON.parse(json)
    historyVideos.value = t
  }

  const selectHistory = (data) => {
    videoInfo.value = data
    videoPrompt.value = data.videoPrompt
    uploadImage.value = data.uploadImage
  }
  const deleteHistory = (index) => {
    historyVideos.value.splice(index, 1)
    localStorage.setItem(
      "chatbot-image-history",
      JSON.stringify(historyVideos.value)
    )
  }
  onMounted(() => {
    initHistory()
    const videoGeneratingId = localStorage.getItem(
      "chatbot-video-generating-id"
    )
    if (videoGeneratingId) {
      window.$message.warning("发现未完成视频生成，正在继续生成")
      videoInfo.value = { taskId: videoGeneratingId }
      // 倒计时
      initCountDown()
      generating.value = true
      intervalId.value = setInterval(getVideoInfo, 3000)
    }
  })

  const videoUrl = computed(() => {
    return videoInfo.value?.uri || ""
  })
  return {
    videoUrl,
    videoPrompt,
    activeName,
    loading,
    videoInfo,
    historyVideos,
    inputStyle,
    uploadImage,
    generating,
    progress,
    createVideoTask,
    getVideoInfo,
    upscaleVideoTask,
    selectHistory,
    deleteHistory,
    onUploading,
    onUploadSuccess,
  }
}
