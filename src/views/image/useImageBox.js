import { ref, onMounted } from "vue"
import { getTaskById, generateImagePcedit } from "@/api/index"
import { imageToolsOptions } from "@/utils/constant"
import { base64ToImage } from "@/utils/tools"

export const useImageBox = (emit, props) => {
  const sourceImage = ref("")
  const sourceImageSuccess = (data) => {
    sourceImage.value = data
  }

  const loading = ref(false)
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
    emit("on-loading", true)

    const req = getPceditReq(sourceImage.value.url, sourceImage.value.url)
    console.log("generateImagePcedit ", req)

    const { id } = await generateImagePcedit(req).catch(() => clearTask())
    if (!id) return
    localStorage.setItem("chatbot-image-generating-id", id)
    getTaskInterval(id)
  }

  const queryTasking = ref(false)
  const intervalCode = ref("")
  const getTaskInterval = async (id) => {
    intervalCode.value = setInterval(async () => {
      if (queryTasking.value) return
      queryTasking.value = true
      const res = await getTaskById(id).catch(() => {
        clearTask()
      })
      queryTasking.value = false
      let list = []
      if (res.picArr) {
        list = res.picArr.map((t) => {
          return { url: t.src }
        })
      }
      if (list.length == 0) return
      emit("on-success", list)
      clearTask()
    }, 3000)
  }

  const pceditSettings = ref({
    type: "3",
    style: "clay",
    create_level: "3",
    ext_ratio: "1:1",
  })
  onMounted(() => {
    if(props.type == 'watermark') pceditSettings.value.type = '1'
    if(props.type == 'oldphotos') pceditSettings.value.type = '3'
  })
  const pceditTypeChange = (label) => {
    pceditTypeOptions.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
        pceditSettings.value.type = t.key
      } else t.checked = false
    })
  }
  const styleSelect = (label) => {
    styleOptions.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
        pceditSettings.value.style = t.key
      } else t.checked = false
    })
  }

  const ratioSelect = (label) => {
    ratioOptions.value.forEach((t) => {
      if (t.label == label) {
        t.checked = true
        pceditSettings.value.ext_ratio = t.key
      } else t.checked = false
    })
  }
  const pceditTypeOptions = ref([
    { label: "变清晰", key: "3", checked: true },
    { label: "去水印", key: "1", checked: false },
    { label: "AI扩图", key: "4", checked: false },
    { label: "AI重绘", key: "6", checked: false },
    { label: "风格转换", key: "14", checked: false },
  ])
  const styleOptions = ref([
    { label: "橡皮泥的风", key: "clay", checked: true },
    { label: "宫崎骏", key: "miyazaki", checked: false },
    { label: "油画", key: "monet", checked: false },
  ])
  const ratioOptions = ref([
    { label: "1:1", key: "1:1", checked: true },
    { label: "3:4", key: "3:4", checked: false },
    { label: "4:3", key: "4:3", checked: false },
  ])

  const clearTask = () => {
    queryTasking.value = false
    loading.value = false
    clearInterval(intervalCode.value)
    emit("on-loading", false)
    localStorage.setItem("chatbot-image-generating-id", "")
  }
  const getPceditReq = (original_url, thumb_url) => {
    const { type, create_level, ext_ratio, style } = pceditSettings.value
    return {
      type,
      original_url,
      thumb_url,
      query: "ChatfireAI图片助手",
      image_source: "1",
      picInfo: "",
      picInfo2: "",
      text: "",
      ext_ratio: type == 4 ? ext_ratio : "", // 扩图比例 1:1   3:4   4:3,
      expand_zoom: "",
      clid: "1",
      front_display: "2",
      create_level: type == 6 ? `${create_level}` : "0", // 重绘 0～6
      style: type == 14 ? style : "", // 风格 clay  橡皮泥的风 miyazaki 宫崎骏 monet 油画
      is_first: true,
    }
  }
  return {
    pceditSettings,
    pceditTypeOptions,
    ratioOptions,
    styleOptions,
    clearTask,
    sourceImageSuccess,
    ratioSelect,
    styleSelect,
    pceditTypeChange,
    generatePcedit,
  }
}
