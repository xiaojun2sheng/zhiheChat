import { ref } from "vue"
import { chat2gpt } from "@/api"

export const useSend = () => {
  const running = ref(false)
  const content = ref("")
  const searchContent = ref("")
  let controller = new AbortController()
  const send = async (data) => {
    // 发送之前进行套餐校验
    controller = new AbortController()
    running.value = true
    content.value = ""
    return chat2gpt({
      data,
      onDownloadProgress: (chunk) => {
        const { value, searchValue } = getOpenAIContent(chunk)
        content.value = value
        searchContent.value = searchValue
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
        console.log(err)
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
    searchContent,
    running,
    send,
    handleStop,
  }
}

function getOpenAIContent(chunk) {
  let value = ""
  let searchValue = ""
  try {
    const list = chunk.split("<|-hold-|>")
    list.forEach((item) => {
      item = item.replace("data:", "")
      if (item && !item.includes("[DONE]")) {
        let val = JSON.parse(item).choices[0].delta.content || ""
        if (val.startsWith("检索 ")) {
          searchValue += val
        } else {
          value += val
        }
      }
    })
  } catch (error) {
  } finally {
    return { value, searchValue }
  }
}
