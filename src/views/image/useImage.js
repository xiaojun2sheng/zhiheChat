import { ref, onMounted } from "vue"
import {
  generateImageTask,
  generateFaceswap,
  getTaskById,
  generateImagePcedit,
} from "@/api/index"
import { imageToolsOptions } from "@/utils/constant"

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
    if (activeName.value == "tools") {
      generatePcedit()
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
    imageUrls.value = []
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
      if (res.picArr) {
        imageUrls.value = res.picArr.map((t) => {
          return { url: t.src }
        })
      } else if (res?.imageUrl) {
        imageUrls.value = [{ url: res.imageUrl }]
      }
      loading.value = false
      if (imageUrls.value.length == 0) return
      addHistory(imageUrls.value)
      clearInterval(intervalCode.value)
      localStorage.setItem("chatbot-image-generating-id", "")
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

    imageTools.value = imageToolsOptions.map((t) => {
      return { ...t, checked: false }
    })
    imageTools.value[1].checked = true
  })

  const imageTools = ref([])
  const currentToolType = computed(() => {
    return imageTools.value.find((t) => t.checked)?.value
  })
  const imageToolSelect = (label) => {
    imageTools.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
        // voiceSoundConfig.value.voice = label
      } else t.checked = false
    })
  }
  const pceditOptions = ref({
    style: "clay",
  })
  const generatePcedit = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    if (!sourceImage.value?.url) {
      window.$message.warning("请上传图片")
      return
    }
    loading.value = true
    imageUrls.value = []
    const req = getPceditReq(
      sourceImage.value.url,
      sourceImage.value.url,
      currentToolType.value
    )
    const { id } = await generateImagePcedit(req).catch(
      () => (loading.value = false)
    )
    if (!id) return
    localStorage.setItem("chatbot-image-generating-id", id)
    getTaskInterval(id)
  }
  return {
    activeName,
    historyImgs,
    inputStyle,
    loading,
    imageUrls,
    imageSetting,
    imageTools,
    imageToolSelect,
    sourceImageSuccess,
    targetImageSuccess,
    selectHistory,
    deleteHistory,
    generateImage,
  }
}

function getPceditReq(original_url, thumb_url, type) {
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
    style: type == 14 ? "clay" : "", // 风格 clay  橡皮泥的风 miyazaki 宫崎骏 monet 油画
    is_first: true,
  }
}
