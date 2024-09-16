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
export const generateImageApi = (data) =>
  request({
    // url: `${commonPrefix}/v1/images/generations`,
    url: `/box/chat/image`,
    method: "post",
    data,
  })

// 换脸
export const generateFaceswap = (data) =>
  request({
    // url: `${commonPrefix}/tasks/faceswap`,
    url: `box/chat/faceSwap`,
    method: "post",
    data,
  })

// https://api.chatfire.cn/tasks/pcedit
/**
 * 工具
 * {
"变清晰": "3",
"去水印": "1",
"提取线稿": "15",
"智能抠图": "9",
"涂抹消除": "10",
"背景替换": "12",
"AI扩图": "4",
"AI重绘": "6",
"AI相似图": "7",
"风格转换": "14"
}
 * @param {*} data 
 * @returns 
 */
export const generateImagePcedit = (data) =>
  request({
    url: `/box/chat/pcedit`,
    method: "post",
    data,
  })

// 证件照
export const generateImageIDPhoto = (data) =>
  request({
    url: `/box/chat/idPhoto`,
    method: "post",
    data,
  })
