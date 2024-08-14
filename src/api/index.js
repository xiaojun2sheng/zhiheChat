import { request } from "@/utils"
export * from "./chat-stream"
export * from "./video"
export * from "./image"
console.log("import.meta.env.", import.meta.env)
const isENV = import.meta.env.DEV
const commonPrefix = isENV ? "/commonapi" : "https://api.chatfire.cn"
const imgPrefix = isENV ? "/imageapi" : "https://api-flux.api4gpt.com"

// 文件上传
export const uploadFile = (data) =>
  request({
    url: `${commonPrefix}/v1/files`,
    method: "post",
    data,
  })

// 任务获取
export const getTaskById = (id) =>
  request({
    url: `${commonPrefix}/tasks/${id}`,
    method: "get",
  })

// 文字转语音
export const textToVoice = (config = {}) =>
  request({
    url: `${commonPrefix}/v1/audio/speech`,
    method: "post",
    ...config,
  })

// 优化提示词
export const betterPromptApi = (prompt) => {
  return request({
    url: `${commonPrefix}/tools/v1/prompter`,
    method: "get",
    params: {
      Prompt: prompt,
    },
  })
}
