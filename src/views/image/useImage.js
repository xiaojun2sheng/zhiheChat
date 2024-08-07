import { ref } from "vue"
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
    loading.value = true
    imageUrls.value = [{}]
    let res = await createImgeApi(imageSetting.value)
    imageUrls.value = res.data || []
    loading.value = false
  }
  return { inputStyle, loading, imageUrls, imageSetting, generateImage }
}
