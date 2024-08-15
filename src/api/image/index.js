import { request } from "@/utils"
console.log("import.meta.env.", import.meta.env)
const isENV = import.meta.env.DEV
const commonPrefix = isENV ? "/commonapi" : "https://api.chatfire.cn"
// 生成图片
export const generateImageTask = (data) =>
  request({
    // url: `${commonPrefix}/v1/images/generations`,
    url: `/box/chat/image`,
    method: "post",
    data,
  })

// 换脸
export const generateFaceswap = (data) =>
  request({
    url: `${commonPrefix}/tasks/faceswap`,
    method: "post",
    data,
  })
