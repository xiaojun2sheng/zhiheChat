import { ref, onMounted } from "vue"
export const useHistory = (emit) => {
  const fileList = ref([])
  const initFileList = () => {
    fileList.value = JSON.parse(localStorage.getItem("chatbot-files") || "[]")
    try {
      const aiImages = JSON.parse(
        localStorage.getItem("chatbot-image-history") || "[]"
      )
      aiImages.forEach((list) => {
        fileList.value.push(
          ...list.map((item) => {
            return { ...item, type: "ai" }
          })
        )
      })
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
