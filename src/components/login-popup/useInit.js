import { ref, watch, onMounted, computed } from "vue"
import { useAppStore } from "@/stores"
import { generateCode } from "@/api"
import { useLogin } from "@/hooks/useLogin"

export const useInit = () => {
  const visible = ref(false)
  const isLogin = ref(true)
  const { toLogin, toRegister } = useLogin()

  const btnText = computed(() => (isLogin.value ? "登录" : "注册"))
  const loginInfo = ref({})

  // 验证码
  const codeImg = ref("")
  const refreshCode = async () => {
    const { uuid, img } = await generateCode()
    codeImg.value = "data:image/png;base64," + img
    loginInfo.value.uuid = uuid
  }

  watch(
    () => visible.value,
    () => refreshCode(),
    { immediate: true }
  )

  const show = () => {
    loginInfo.value = {
      username: "",
      password: "",
      confirmPassword: "",
      code: "",
      uuid: "",
    }
    visible.value = true
  }

  const rules = {
    username: {
      required: true,
      message: "请输入用户名",
      trigger: ["input"],
    },
    password: {
      required: true,
      message: "请输入密码",
      trigger: ["input"],
    },
    confirmPassword: {
      required: true,
      message: "请再次输入密码",
      trigger: ["input"],
    },
    code: {
      required: true,
      message: "请输入验证码",
      trigger: ["input"],
    },
  }

  const close = () => {
    visible.value = false
  }

  const formRef = ref(null)
  const validate = () => {
    return new Promise((resolve, reject) => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  const submit = async () => {
    await validate()
    if (isLogin.value) {
      await login()
    } else {
      await register()
    }
  }
  const login = async () => {
    await toLogin(loginInfo.value)
      .then(() => {
        window.$message.success("登录成功")
        close()
      })
      .catch(() => {
        refreshCode()
      })
  }
  const register = async () => {
    toRegister(loginInfo.value)
      .then(() => {
        window.$message.success("注册成功")
        close()
      })
      .catch(() => refreshCode())
  }

  onMounted(() => {
    !localStorage.getItem("chatbot-token") && (visible.value = true)
  })
  return {
    isLogin,
    rules,
    loginInfo,
    formRef,
    visible,
    codeImg,
    btnText,
    refreshCode,
    show,
    close,
    submit,
  }
}
