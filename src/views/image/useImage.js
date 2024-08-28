import { ref, onMounted } from "vue"
import { generateImageTask, generateFaceswap, getTaskById } from "@/api/index"

export const useImage = (url) => {
  const activeName = ref("text")
  const inputStyle = ref({
    "--n-border-hover": "transparent",
    "--n-border-focus": "transparent",
    "--n-box-shadow-focus": "none",
  })

  const imageSetting = ref({
    model: "flux-pro",
    prompt: "",
    n: 1,
    size: "1024x1024",
    url: "",
  })

  const loading = ref(false)
  const imageUrls = ref([])
  const generateImage = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    if (activeName.value == "face") {
      generateFaces()
      return
    }
    try {
      loading.value = true
      imageUrls.value = []
      if (sourceImage.value?.url) {
        imageSetting.value.url = sourceImage.value.url
      }
      let res = await generateImageTask(imageSetting.value)
      imageUrls.value = res.data || []
      loading.value = false
      addHistory(res.data)
      initHistory()
    } catch (error) {
      loading.value = false
    }
  }

  const addHistory = async (images) => {
    const json = localStorage.getItem("chatbot-image-history") || "[]"
    let historys = JSON.parse(json)
    historys.push(images)
    historyImgs.value = images
    localStorage.setItem("chatbot-image-history", JSON.stringify(historys))
  }

  const historyImgs = ref([])
  const initHistory = async () => {
    const json = localStorage.getItem("chatbot-image-history") || "[]"
    const t = JSON.parse(json)
    historyImgs.value = t
  }

  const selectHistory = (data) => {
    imageUrls.value = data
  }
  const deleteHistory = (index) => {
    historyImgs.value.splice(index, 1)
    localStorage.setItem(
      "chatbot-image-history",
      JSON.stringify(historyImgs.value)
    )
  }

  const sourceImage = ref("")
  const targetImage = ref("")
  const sourceImageSuccess = (data) => {
    sourceImage.value = data
  }
  const targetImageSuccess = (data) => {
    targetImage.value = data
  }

  const generateFaces = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    if (!sourceImage.value?.url || !targetImage.value?.url) {
      window.$message.warning("请上传图片")
      return
    }
    loading.value = true
    const { id } = await generateFaceswap({
      sourceUrl: sourceImage.value.url,
      targetUrl: targetImage.value.url,
    }).catch(() => (loading.value = false))
    localStorage.setItem("chatbot-image-generating-id", id)
    getTaskInterval(id)
  }

  const intervalCode = ref("")
  const queryTasking = ref(false)
  const getTaskInterval = async (id) => {
    intervalCode.value = setInterval(async () => {
      if (queryTasking.value) return
      queryTasking.value = true
      const res = await getTaskById(id).catch(() => {
        loading.value = false
        queryTasking.value = false
        clearInterval(intervalCode.value)
        localStorage.setItem("chatbot-image-generating-id", "")
      })
      queryTasking.value = false
      if (res?.imageUrl) {
        loading.value = false
        imageUrls.value = [{ url: res.imageUrl }]

        addHistory(imageUrls.value)
        clearInterval(intervalCode.value)
        localStorage.setItem("chatbot-image-generating-id", "")
      }
    }, 5000)
  }
  onMounted(() => {
    initHistory()
    const imageGeneratingId = localStorage.getItem(
      "chatbot-image-generating-id"
    )
    if (imageGeneratingId) {
      window.$message.warning("发现未完成图片任务生成，正在继续生成")
      getTaskInterval(imageGeneratingId)
    }
  })
  return {
    activeName,
    historyImgs,
    inputStyle,
    loading,
    imageUrls,
    imageSetting,
    sourceImageSuccess,
    targetImageSuccess,
    selectHistory,
    deleteHistory,
    generateImage,
  }
}
