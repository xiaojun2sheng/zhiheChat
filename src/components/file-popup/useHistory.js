import { ref, onMounted } from "vue"
export const useHistory = (emit) => {
  const fileList = ref([])
  const initFileList = () => {
    fileList.value = JSON.parse(localStorage.getItem("chatbot-files") || "[]")
    fileList.value.reverse()
    try {
      const aiImages = JSON.parse(
        localStorage.getItem("chatbot-image-history") || "[]"
      )
      // aiImages.forEach((list) => {
      //   if (list) {
      //     const subAiImg = list.map((item) => {
      //       return { ...item, type: "ai" }
      //     })
      //     fileList.value.push(...subAiImg)
      //   }
      // })
    } catch (e) {}
  }

  onMounted(initFileList)
  const selectFile = (file) => {
    fileList.value.forEach((item) => {
      item.selected = false
    })
    file.selected = true
    emit("on-selected", file)
  }

  return { selectFile, fileList }
}
