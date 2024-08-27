import { request } from "@/utils"

//  查询用户信息
export const createOrder = (params) =>
  request({
    url: `/box/system/order/create`,
    method: "get",
    params
  })

//  查询充值套餐信息
export const getAccountPackage = () =>
  request({
    url: `/box/system/option/list`,
    method: "get",
  })

//  签到
export const signIn = () =>
  request({
    url: `/box/system/order/signIn`,
    method: "get",
  })
