import { ref } from "vue"
import { chat2gpt } from "@/api"
import { set } from "@vueuse/core/index.cjs"

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
        console.log("输出中", chunk)
        if (chunk.includes("{") && chunk.includes("}")) {
          content.value = "系统异常"
        } else {
        }
        content.value = chunk
        console.log("输出中 content.value", content.value)
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

  // 文件流处理
  const readerStream = async (res) => {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = res.body.getReader()
        while (true) {
          const { value, done } = await reader.read()
          let decodeVal = new TextDecoder().decode(value)
          console.log("decodeVal", decodeVal)
          // TODO 异常直接终止
          if (done) break
          content.value += getVal(decodeVal)
        }
        resolve()
      } catch (error) {
        if (error.name === "AbortError") {
          resolve()
        } else {
          console.log(error)
          reject(error)
        }
      }
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

function getVal(val) {
  let content = ""
  try {
    const list = val.split("data: ")
    list.forEach((item) => {
      if (item) content += JSON.parse(item).choices[0].delta.content || ""
    })
  } catch (error) {
  } finally {
    return content
  }
}
