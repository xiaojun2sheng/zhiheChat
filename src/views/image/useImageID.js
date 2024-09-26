import { ref, onMounted } from "vue"
import { getTaskById, generateImageIDPhoto } from "@/api/index"

export const useImageID = (emit, props) => {
  const sizeOptions = ref([
    { label: "一寸", value: "一寸" },
    { label: "二寸", value: "二寸" },
    { label: "小一寸", value: "小一寸" },
    { label: "小二寸", value: "小二寸" },
    { label: "大一寸", value: "大一寸" },
    { label: "大二寸", value: "大二寸" },
    { label: "五寸", value: "五寸" },
    { label: "教师资格证", value: "教师资格证" },
    { label: "国家公务员考试", value: "国家公务员考试" },
    { label: "初级会计考试", value: "初级会计考试" },
    { label: "英语四六级考试", value: "英语四六级考试" },
    { label: "计算机等级考试", value: "计算机等级考试" },
    { label: "研究生考试", value: "研究生考试" },
    { label: "社保卡", value: "社保卡" },
    { label: "电子驾驶证", value: "电子驾驶证" },
  ])

  const bgColorOptions = ref([
    { label: "蓝色", value: "蓝色" },
    { label: "白色", value: "白色" },
    { label: "红色", value: "红色" },
    { label: "纯蓝色", value: "纯蓝色" },
    { label: "道奇蓝", value: "道奇蓝" },
    { label: "纯红色", value: "纯红色" },
    { label: "猩红色", value: "猩红色" },
    { label: "blue", value: "blue" },
    { label: "white", value: "white" },
    { label: "red", value: "red" },
  ])

  const sourceImage = ref("")
  const sourceImageSuccess = (data) => {
    idPhotoSettings.value.url = data.url
  }

  const loading = ref(false)
  const generateIDPhoto = async () => {
    if (loading.value) {
      window.$message.warning("正在生成图片，请稍后")
      return
    }
    if (!idPhotoSettings.value.url) {
      window.$message.warning("请上传图片")
      return
    }
    loading.value = true
    emit("on-loading", true)
    const formData = new FormData()
    // formData.append("file", file)
    formData.append("url", idPhotoSettings.value.url)
    formData.append("size", idPhotoSettings.value.size)
    formData.append("backgroundColor", idPhotoSettings.value.backgroundColor)
    formData.append("renderMode", idPhotoSettings.value.renderMode)

    const res = await generateImageIDPhoto(formData).finally(() => {
      loading.value = false
      emit("on-end")
      return
    })
    // if (!res) return
    emit("on-success", {
      data: {
        url: res.img_output_standard,
        img_output_standard: res.img_output_standard,
        img_output_standard_hd: res.img_output_standard_hd,
      },
      prompt: `${idPhotoSettings.value.size} ${idPhotoSettings.value.backgroundColor}`,
      model: "证件照",
    })

    // if (!id) return
    // localStorage.setItem("chatbot-image-generating-id", id)
    // getTaskInterval(id)
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

  const idPhotoSettings = ref({
    url: "",
    size: "一寸",
    backgroundColor: "白色",
    renderMode: "pure_color",
  })

  return {
    idPhotoSettings,
    sizeOptions,
    bgColorOptions,
    sourceImageSuccess,
    generateIDPhoto,
  }
}
