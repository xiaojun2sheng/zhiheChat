import { ref, computed } from "vue"

export const usePcedit = () => {
  const imageTools = ref([])
  const currentToolType = computed(() => {
    return imageTools.value.find((t) => t.checked)?.value
  })

  const sourceImage = ref("")
  const sourceImageSuccess = (data) => {
    sourceImage.value = data
  }

  const imageToolSelect = (label) => {
    imageTools.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
      } else t.checked = false
    })
  }
  const styleSelect = (label) => {
    styleOptions.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
      } else t.checked = false
    })
  }

  const ratioSelect = (label) => {
    ratioOptions.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
      } else t.checked = false
    })
  }

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
    // getTaskInterval(id)
  }

  const pceditSettings = ref({
    style: "clay",
    create_level: "0",
    ext_ratio: "1:1",
  })
  const styleOptions = ref([
    { label: "橡皮泥的风", key: "clay" },
    { label: "宫崎骏", key: "miyazaki" },
    { label: "油画", key: "monet" },
  ])
  const ratioOptions = ref([
    { label: "1:1", key: "1:1" },
    { label: "3:4", key: "3:4" },
    { label: "4:3", key: "4:3" },
  ])

  return {
    pceditSettings,
    ratioOptions,
    styleOptions,
    sourceImageSuccess,
    ratioSelect,
    styleSelect,
    imageToolSelect,
    generatePcedit,
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
