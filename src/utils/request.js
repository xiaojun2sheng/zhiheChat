import axios from "axios"
import { useUserStore } from "@/stores"

const process = import.meta.env
if (process.MODE === "development") {
  // 这是开发环境
  console.log("当前是开发环境")
} else if (process.MODE === "production") {
  // 这是生产环境
  console.log("当前是生产环境")
}
// 创建axios实例
const instance = axios.create({
  // baseURL: process.VITE_APP_BASE_API, // api的base_url
  timeout: 60000, // 请求超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chatbot-token")
    token && (config.headers["Authorization"] = `Bearer ${token}`)
    // 可以在这里添加请求头等信息
    return config
  },
  (error) => {
    window.$message.error("系统异常")
    Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 对响应数据做处理，例如只返回data部分
    let { data, code, msg } = res.data
    // 热榜单独处理
    if (res.config.url.includes("openai-dev.chatfire.cn")) {
      return res.data
    }
    let streamData
    // 流的异常响应也是流，唔要单独处理
    try {
      if (res.config.responseType === "stream") {
        streamData = JSON.parse(res.data)
      }
    } catch (error) {
      if (res.config.responseType === "stream") code = 200
    }
    // 适配语音
    if (res?.data instanceof Blob) {
      return res.data
    }
    if (code === 200) {
      return res.data?.data || res.data
    } else {
      code = code || streamData?.code
      msg = msg || streamData?.msg
      if (code === 401) {
        const userStore = useUserStore()
        userStore.setShowLogin(true)
        userStore.setLogin(false)
        localStorage.removeItem("chatbot-token")
      }
      window.$message.error(msg)
      return Promise.reject(res.data)
    }
  },
  (error) => {
    const msg = error.response?.data?.error?.message || "系统异常"
    window.$message.error(msg)
    return Promise.reject(error)
  }
)

export default instance
