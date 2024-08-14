import { ref, onMounted, computed } from "vue"

export const useUpload = (emit) => {
  const uploadImage = ref({})
  const loading = ref(false)
  const onUploading = (data) => {
    loading.value = data
  }
  const onUploadSuccess = (data) => {
    uploadImage.value = data
    emit("on-success", uploadImage.value)
  }

  const onChange = (data) => {
    uploadImage.value = data
  }

  return {
    emit,
    loading,
    uploadImage,
    onChange,
    onUploading,
    onUploadSuccess,
  }
}
