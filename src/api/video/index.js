import { request } from "@/utils"

// 创建可灵视频
const createVideoKling = (data) =>
  request({
    url: "/tasks/kling",
    method: "post",
    data,
  })

// 获取视频
const getVideoKling = (url) =>
  request({
    url: `/tasks/${url}`,
    method: "get",
  })

const klingApi = {
  createVideoKling,
  getVideoKling,
}

// vidu
const createVideoVidu = (data) =>
  request({
    url: "/tasks/vidu",
    method: "post",
    data,
  })

const getVideoVidu = (task_id) =>
  request({
    url: `/tasks/${task_id}`,
    method: "get",
  })

const videoViduUpscale = (data) =>
  request({
    url: `/tasks/vidu-upscale`,
    method: "post",
    data,
  })

const viduApi = {
  createVideoVidu,
  getVideoVidu,
  videoViduUpscale,
}

export { klingApi, viduApi }
