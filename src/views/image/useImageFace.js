import { ref, computed } from "vue"
import { generateFaceswap, getTaskById } from "@/api/index"

export const useImageFace = (emit) => {
  const sourceImage = ref("")
  const targetImage = ref("")
  const sourceImageSuccess = (data) => {
    sourceImage.value = data
  }
  const targetImageSuccess = (data) => {
    targetImage.value = data
  }

  const loading = ref(false)
  const generateImage = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    if (!sourceImage.value?.url || !targetImage.value?.url) {
      window.$message.warning("请上传图片")
      return
    }
    emit("on-loading", true)
    loading.value = true

    const { id } = await generateFaceswap({
      sourceUrl: sourceImage.value.url,
      targetUrl: targetImage.value.url,
    }).catch(() => (loading.value = false))

    localStorage.setItem("chatbot-image-generating-id", id)
    getTaskInterval(id)
  }

  const intervalCode = ref()
  const queryTasking = ref(false)
  const getTaskInterval = async (id) => {
    intervalCode.value = setInterval(async () => {
      if (queryTasking.value) return
      queryTasking.value = true
      const res = await getTaskById(id).catch(() => {
        clearTask()
      })
      queryTasking.value = false
      if (res?.imageUrl) {
        emit("on-success", [{ url: res.imageUrl }])
        clearTask()
      }
      if (res.status == "failed") {
        $message.error("生成失败")
        clearTask()
      }
    }, 3000)
  }
  const clearTask = () => {
    queryTasking.value = false
    loading.value = false
    clearInterval(intervalCode.value)
    emit("on-loading", false)
    localStorage.setItem("chatbot-image-generating-id", "")
  }
  return {
    sourceImageSuccess,
    targetImageSuccess,
    generateImage,
  }
}
