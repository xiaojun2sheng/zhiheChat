import { ref, onMounted } from "vue"
export const useFile = (emit) => {
  const visible = ref(false)
  const fileList = ref([])
  const initFileList = () => {
    fileList.value = JSON.parse(localStorage.getItem("chatbot-files") || "[]")
  }
  const selectFile = (file) => {
    fileList.value.forEach((item) => {
      item.selected = false
    })
    file.selected = true
  }
  onMounted(initFileList)

  const submit = () => {
    const t = fileList.value.find((item) => item.selected)
    if (t) emit("on-selected", t)
  }
  const show = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }
  
  return { visible, fileList, show, close, selectFile, submit }
}
