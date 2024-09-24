import { ref } from "vue"
import { generateImageApi } from "@/api/index"

export const useImageText = (emit) => {
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

  const sourceImage = ref("")
  const sourceImageSuccess = (data) => {
    sourceImage.value = data
  }

  const loading = ref(false)
  const generateImage = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    if (!imageSetting.value.prompt) {
      window.$message.warning("请输入提示词")
      return
    }
    try {
      emit("on-loading", true)
      loading.value = true
      if (sourceImage.value?.url) {
        imageSetting.value.url = sourceImage.value.url
      }
      let res = await generateImageApi(imageSetting.value).finally(() => {
        loading.value = false
        emit("on-end")
      })
      emit("on-success", { data: res.data, prompt: imageSetting.value.prompt, model: imageSetting.value.model })
    } catch (error) {
      loading.value = false
    }
  }
  return {
    loading,
    modelOptions,
    imageSetting,
    generateImage,
    sourceImageSuccess,
  }
}
