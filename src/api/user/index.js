import { request } from "@/utils"

//  查询用户信息
export const queryUser = () =>
  request({
    url: `/box/system/user/getById`,
    method: "get",
  })

//  查询账户信息
export const getAccount = () =>
  request({
    url: `/box/system/account/getInfo`,
    method: "get",
  })


