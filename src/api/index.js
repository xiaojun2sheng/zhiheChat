import { request } from "@/utils"
export * from './chat-stream'
export * from './video'


// 生成图片
export const createImgeApi = (config = {}) =>
  request({
    url: "/v1/images/generations",
    method: "post",
    ...config,
  })




// 聊天
export const chatCompletionsApi = (config = {}) =>
  request({
    url: "/v1/chat/completions",
    method: "post",
    ...config,
  })

// 文字转语音
export const textToVoice = (config = {}) =>
  request({
    url: "/v1/audio/speech",
    method: "post",
    ...config,
  })

// 优化提示词
// api.chatfire.cn/tools/prompter?Prompt=
export const betterPromptApi = (prompt) => {
  return request({
    url: "/tools/v1/prompter",
    method: "get",
    params: {
      Prompt: prompt,
    },
  })
}
