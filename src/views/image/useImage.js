import { ref, onMounted } from "vue"

export const useImage = (url) => {
  const activeName = ref("text")
  const loading = ref(false)
  const imageUrls = ref([])

  const addHistory = async (images) => {
    const json = localStorage.getItem("chatbot-image-history") || "[]"
    let historys = JSON.parse(json)
    historys.unshift(images)
    // 缓存 10 个数据
    historys.splice(10)
    localStorage.setItem("chatbot-image-history", JSON.stringify(historys))
    initHistory()
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

  onMounted(() => {
    initHistory()
    // const imageGeneratingId = localStorage.getItem(
    //   "chatbot-image-generating-id"
    // )
    // if (imageGeneratingId) {
    //   window.$message.warning("发现未完成图片任务生成，正在继续生成")
    //   getTaskInterval(imageGeneratingId)
    // }

  })

  const onLoading = (data) => {
    loading.value = data
    if (data) {
      imageUrls.value = []
    }
  }
  const onSuccess = (data) => {
    imageUrls.value = data || []
    loading.value = false
    addHistory(data)
    initHistory()
  }
  const onEnd = () => {
    loading.value = false
    localStorage.setItem("chatbot-image-generating-id", "")
  }
  return {
    activeName,
    historyImgs,
    loading,
    imageUrls,
    onLoading,
    onSuccess,
    onEnd,
    deleteHistory,
    selectHistory,
  }
}

function getPceditReq(original_url, thumb_url, pceditSetting) {
  const { type, style } = pceditSetting
  return {
    type,
    original_url,
    thumb_url,
    query: "ChatfireAI图片助手",
    image_source: "1",
    picInfo: "",
    picInfo2: "",
    text: "",
    ext_ratio: type == 4 ? "4:3" : "", // 扩图比例 1:1   3:4   4:3,
    expand_zoom: "",
    clid: "1",
    front_display: "2",
    create_level: type == 6 ? "3" : "0", // 重绘 0～6
    style: type == 14 ? style : "", // 风格 clay  橡皮泥的风 miyazaki 宫崎骏 monet 油画
    is_first: true,
  }
}
