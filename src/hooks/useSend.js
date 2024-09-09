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
      onDownloadProgress: (event) => {
        const chunk = event.event.target.responseText
        // console.log("输出中", chunk)

        // const t = getOpenAIContent(chunk)
        // console.log("输出中", t)
        // content.value += t
        // if (chunk.includes("[DONE]")) {
        //   console.log("输出结束")
        //   running.value = false
        // }
        if (
          chunk.startsWith("{") &&
          chunk.includes("{") &&
          chunk.includes("}")
        ) {
          try {
            const { msg } = JSON.parse(chunk)
            content.value = msg
          } catch (e) {
            console.log("流异常", e)
            content.value = "系统异常"
          } finally {
            return
          }
        } else {
        }
        content.value = chunk
      },
      signal: controller.signal,
    })
      .then(async (res) => {
        // setTimeout(() => {
        //   console.log("输出结束")
        //   return Promise.resolve(res)
        // }, 1000)
      })
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
  let content = ""
  try {
    const list = chunk.split("data:")
    list.forEach((item) => {
      if (item) content += JSON.parse(item).choices[0].delta.content || ""
    })
  } catch (error) {
  } finally {
    return content
  }
}
