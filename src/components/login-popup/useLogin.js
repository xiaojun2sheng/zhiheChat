import { ref, reactive, onMounted } from "vue"
import { useAppStore } from "@/stores"
import { generateCode } from "@/api"

export const useLogin = () => {
  const visible = ref(false)
  const user = reactive({
    username: "",
    password: "",
  })
  const show = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }
  const submit = () => {
    close()
  }
  onMounted(() => {
    generateCode()
  })
  return {
    user,
    visible,
    show,
    close,
    submit,
  }
}
