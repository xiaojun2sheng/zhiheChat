import { ref, reactive, onMounted, computed } from "vue"
import { useAppStore } from "@/stores"
import { generateCode, login, register } from "@/api"

export const useLogin = () => {
  const visible = ref(false)
  const isLogin = ref(true)

  const btnText = computed(() => (isLogin.value ? "登录" : "注册"))
  const loginInfo = reactive({
    username: "",
    password: "",
    confirmPassword: "",
    code: "",
    uuid: "",
  })
  const show = () => {
    visible.value = true
    refreshCode()
  }
  const close = () => {
    visible.value = false
  }
  const submit = async () => {
    if (isLogin.value) {
      await toLogin()
    } else {
      await toRegister()
    }
    close()
  }
  const toLogin = async () => {
    const { code, uuid } = loginInfo
    if (!code || !uuid) {
      window.$message.warning("请填写验证码")
      return
    }
    const { data } = await login(loginInfo)
    localStorage.setItem("chatbot-token", data.access_token)
    window.$message.success("登录成功")
  }
  const toRegister = async () => {
    const { code, uuid } = loginInfo
    if (!code || !uuid) {
      window.$message.warning("请填写验证码")
      return
    }
    await register(loginInfo)
    window.$message.success("注册成功")
  }

  // 验证码
  const codeImg = ref("")
  const refreshCode = async () => {
    const { uuid, img } = await generateCode()
    codeImg.value = "data:image/png;base64," + img
    loginInfo.uuid = uuid
  }

  onMounted(() => {})
  return {
    isLogin,
    loginInfo,
    visible,
    codeImg,
    btnText,
    refreshCode,
    show,
    close,
    submit,
  }
}
