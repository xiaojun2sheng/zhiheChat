import { ref, onMounted } from "vue"
import {
  generateImageTask,
  generateFaceswap,
  getTaskById,
  generateImagePcedit,
} from "@/api/index"
import { imageToolsOptions } from "@/utils/constant"
import { base64ToImage } from "@/utils/tools"

export const useImage = (url) => {
  const activeName = ref("text")
  const inputStyle = ref({
    "--n-border-hover": "transparent",
    "--n-border-focus": "transparent",
    "--n-box-shadow-focus": "none",
  })

  const modelOptions = ref([
    {
      label: "可灵",
      value: "kling",
    },
    {
      label: "dall-e-3",
      value: "dall-e-3",
    },
    {
      label: "step-1x-medium",
      value: "step-1x-medium",
    },
    {
      label: "flux-pro",
      value: "flux-pro",
    },
    {
      label: "flux-pro-max",
      value: "flux-pro-max",
    },
    {
      label: "stable-diffusion-3",
      value: "stable-diffusion-3",
    },
  ])
  const imageSetting = ref({
    model: "flux-pro",
    prompt: "",
    n: 1,
    size: "1024x1024",
    url: "",
  })

  const loading = ref(false)
  const imageUrls = ref([])

  const onGenerateSuccess = (data) => {
    imageUrls.value = data || []
    loading.value = false
    addHistory(data)
    initHistory()
  }

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
    historys.unshift(images)
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
      if (imageUrls.value.length == 0) return
      loading.value = false
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
    imageTools.value[0].checked = true
  })

  const styleOptions = ref([
    { label: "橡皮泥的风", key: "clay", checked: true },
    { label: "宫崎骏", key: "miyazaki", checked: false },
    { label: "油画", key: "monet", checked: false },
  ])
  const imageTools = ref([])
  const settingTagSelect = (type, label) => {
    if (type === "type") {
      imageTools.value.forEach((t) => {
        if (t.label == label) {
          t.checked = true
          pceditSetting.value.type = t.value
        } else t.checked = false
      })
    }
    if (type === "style") {
      styleOptions.value.forEach((t) => {
        if (t.label == label) {
          t.checked = true
          pceditSetting.value.style = t.key
        } else t.checked = false
      })
    }
  }
  const pceditSetting = ref({
    type: "3",
    style: "clay",
    create_level: "0",
    ext_ratio: "1:1",
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
      pceditSetting.value
    )
    const { id } = await generateImagePcedit(req).catch(
      () => (loading.value = false)
    )
    if (!id) return
    localStorage.setItem("chatbot-image-generating-id", id)
    getTaskInterval(id)
  }
  // -----------------
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
    pceditSetting,
    styleOptions,
    modelOptions,
    activeName,
    historyImgs,
    inputStyle,
    loading,
    imageUrls,
    imageSetting,
    imageTools,
    settingTagSelect,
    sourceImageSuccess,
    targetImageSuccess,
    selectHistory,
    deleteHistory,
    generateImage,
    // -------------------
    onLoading,
    onSuccess,
    onEnd,
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
