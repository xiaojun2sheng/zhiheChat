import { ref } from "vue"
import { chat2gpt } from "@/api"

export const useSend = () => {
  const running = ref(false)
  const content = ref("")
  let controller = new AbortController()
  const send = async (data) => {
    // 发送之前进行套餐校验
    controller = new AbortController()
    running.value = true
    content.value = ""
    return chat2gpt({
      data,
      onDownloadProgress: (chunk) => {
        const t = getOpenAIContent(chunk)
        console.log("输出中", t)
        content.value = t
        if (chunk.includes("[DONE]")) {
          console.log("输出结束")
          setTimeout(() => {
            running.value = false
          }, 500)
        }
      },
      signal: controller.signal,
    })
      .then(async (res) => {})
      .catch((err) => {
        window.$messages.error(err)
      })
      .finally(() => {
        setTimeout(() => {
          running.value = false
        }, 1000)
        // content.value = ""
      })
  }
  const handleStop = () => {
    if (running.value) {
      controller.abort()
      running.value = false
    }
  }
  return {
    content,
    running,
    send,
    handleStop,
  }
}

function getOpenAIContent(chunk) {
  let result = ""
  try {
    const list = chunk.split("<|-hold-|>")
    list.forEach((item) => {
      item = item.replace("data:", "")
      if (item && !item.includes("[DONE]"))
        result += JSON.parse(item).choices[0].delta.content || ""
    })
  } catch (error) {
  } finally {
    return result
  }
}
