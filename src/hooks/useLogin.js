import { login, logout, register } from "@/api/login"
import { queryUser } from "@/api/user"
import { useUserStore } from "@/stores/userStore"

export const useLogin = () => {
  const userStore = useUserStore()

  const toLogin = async (data) => {
    const { code, uuid } = data
    if (!code || !uuid) {
      window.$message.warning("请填写验证码")
      return Promise.reject()
    }
    const res = await login(data)
    localStorage.setItem("chatbot-token", res.access_token)
    userStore.setLogin(true)
    return data
  }

  const toRegister = async (data) => {
    const { code, uuid, password, confirmPassword } = data
    if (!code || !uuid) {
      window.$message.warning("请填写验证码")
      return Promise.reject()
    }
    if (password !== confirmPassword) {
      window.$message.warning("两次密码不一致")
      return Promise.reject()
    }
    return register(data)
  }

  const toLogout = async () => {
    await logout()
    userStore.setLogin(false)
    localStorage.setItem("chatbot-token", "")
  }

  return {
    toLogin,
    toRegister,
    toLogout,
  }
}
