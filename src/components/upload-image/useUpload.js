import { ref, onMounted, computed } from "vue"

export const useUpload = (emit) => {
  const uploadImage = ref({})
  const loading = ref(false)
  const onUploading = (data) => {
    loading.value = data
  }
  const onSelected = (data) => {
    uploadImage.value = data
    emit('on-success', uploadImage.value)
  }
  const onUploadSuccess = (data) => {
    uploadImage.value = data
    emit("on-success", uploadImage.value)
  }

  const onChange = (data) => {
    uploadImage.value = data
  }
  const filePopupRef = ref()
  const openFileMgmt = () => {
    filePopupRef.value.show()
  }

  return {
    emit,
    loading,
    uploadImage,
    filePopupRef,
    onSelected,
    openFileMgmt,
    onChange,
    onUploading,
    onUploadSuccess,
  }
}
