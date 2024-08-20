import { ref, onMounted } from "vue"
export const useFile = (emit) => {
  const visible = ref(false)

  const uploadFile = ref()
  const selectFile = (file) => {
    uploadFile.value = file
  }

  const submit = () => {
    if (uploadFile.value) {
      emit("submit", uploadFile.value)
      close()
    }
  }

  const loading = ref(false)
  const onUploading = (data) => {
    loading.value = data
  }
  const onUploadSuccess = (data) => {
    uploadFile.value = data
    emit("submit", uploadFile.value)
    close()
  }
  const show = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }

  return {
    visible,
    show,
    close,
    selectFile,
    submit,
    loading,
    onUploading,
    onUploadSuccess,
  }
}
