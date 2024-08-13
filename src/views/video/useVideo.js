import { ref, onMounted } from "vue"
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
    console.log("onUploading loading", loading)
  }
  const onUploadSuccess = (data) => {
    uploadImage.value = data
    console.log("onUploadSuccess res", res)
  }

  const intervalId = ref("")
  const taskId = ref("")
  const creationId = ref("")
  const generating = ref(false)
  const createVideoTask = async () => {
    if (generating.value) return window.$message.warning("正在生成视频中。。")
    if (activeName.value != "text" && !uploadImage.value.url)
      return window.$message.warning("请上传图片")
    if (!videoPrompt.value) return window.$message.warning("请输入创意")

    videoUrl.value = ""
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
    const res = await viduApi.createVideo(req)
    taskId.value = res.id

    // 倒计时
    initCountDown()
    intervalId.value = setInterval(getVideoUrl, 3000)
  }

  let videoUrl = ref("")
  const getVideoUrl = async () => {
    if (!generating.value && taskId.value) return
    const res = await viduApi.getVideo(taskId.value)
    const creation = res?.creations[0]
    if (creation) {
      debugger
      taskId.value = creation.task_id
      creationId.value = creation.id
      videoUrl.value = creation.uri

      window.$message.success("视频生成成功")
      clearInterval(intervalId.value)
      taskId.value = null
      generating.value = false
      clearCountDown()
    }
  }

  const upscaleVideoTask = async () => {
    const res = await viduApi.videoUpscale({
      task_id: taskId.value + "",
      creation_id: creationId.value + "",
    })
    console.log("upscaleVideoTask res", res)
  }

  return {
    videoPrompt,
    activeName,
    loading,
    videoUrl,
    inputStyle,
    uploadImage,
    generating,
    progress,
    createVideoTask,
    getVideoUrl,
    upscaleVideoTask,
    onUploading,
    onUploadSuccess,
  }
}
