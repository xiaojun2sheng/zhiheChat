import { ref, onMounted } from "vue"
import { createImgeApi } from "@/api/index"

export const useImage = (url) => {
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
  })

  const loading = ref(false)
  const imageUrls = ref([])
  const generateImage = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    loading.value = true
    imageUrls.value = []
    let res = await createImgeApi(imageSetting.value)
    imageUrls.value = res.data || []
    loading.value = false
    addHistory(res.data)
    initHistory()
  }

  const addHistory = async (images) => {
    const json = localStorage.getItem("chatbot-image-historys") || "{}"
    let historys = JSON.parse(json)
    historys[Date.now()] = images
    localStorage.setItem("chatbot-image-historys", JSON.stringify(historys))
  }
  // const taskId = ref("")
  // const updateTask = async (id, data) => {
  //   tasks.value[id] = data
  //   localStorage.setItem("chatbot-image-tasks", JSON.stringify(tasks.value))
  // }

  const historyImgs = ref([])
  const initHistory = async () => {
    const json = localStorage.getItem("chatbot-image-historys") || "{}"
    const t = JSON.parse(json)
    historyImgs.value = Object.values(t)
  }

  const selectHistory = (data) => {
    imageUrls.value = data
  }

  onMounted(() => {
    initHistory()
  })
  return {
    historyImgs,
    inputStyle,
    loading,
    imageUrls,
    imageSetting,
    selectHistory,
    generateImage,
  }
}
