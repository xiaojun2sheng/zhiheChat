import { request } from "@/utils"
import { useUserStore } from "@/stores"

function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
    "no-cors": true,
    mode: "no-cors",
  }
  const token = localStorage.getItem("chatbot-token")
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  return headers
}

export const chat2gpt = ({ data, onDownloadProgress, signal }) => {
  let content = ""
  let searchContent = ""
  const userStore = useUserStore()
  return fetch(`/box/chat/ask`, {
    method: "post",
    body: JSON.stringify(data),
    signal: signal,
    headers: getHeaders(),
  }).then(async (res) => {
    const reader = res.body.getReader()
    while (true) {
      const { value, done } = await reader.read()
      let decodeVal = new TextDecoder().decode(value)
      if (decodeVal.includes(`"code":401`)) {
        onDownloadProgress("登录失效，请重新登录")
        window.$message.error("请重新登录")
        userStore.setShowLogin(true)
        break
      }
      content += decodeVal
      onDownloadProgress(content)
      if (done) {
        break
      }
    }
  })
}
