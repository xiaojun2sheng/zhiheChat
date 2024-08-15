import { request } from "@/utils"
console.log("import.meta.env.", import.meta.env)
const isENV = import.meta.env.DEV
const commonPrefix = isENV ? "/commonapi" : "https://api.chatfire.cn"
const imgPrefix = isENV ? "/imageapi" : "https://api-flux.api4gpt.com"

//  验证码
export const generateCode = () =>
  request({
    url: `/box/code`,
    method: "get",
  })

// 注册
export const register = (data) =>
  request({
    url: `/box/auth/register`,
    method: "post",
    data,
  })

// 登录
export const login = (data) =>
  request({
    url: `/box/auth/login`,
    method: "post",
    data,
  })

// 退出
export const logout = (data) =>
  request({
    url: `/box/auth/logout`,
    method: "post",
    data,
  })
