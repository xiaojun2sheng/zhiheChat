import { request } from "@/utils"
console.log("import.meta.env.", import.meta.env)
const isENV = import.meta.env.DEV
const commonPrefix = isENV ? "/commonapi" : "https://api.chatfire.cn"
// 创建可灵视频
const createVideoKling = (data) =>
  request({
    // url: `${commonPrefix}/tasks/kling`,
    url: `/box/chat/kling`,
    method: "post",
    data,
  })

// 获取视频
const getVideoKling = (url) =>
  request({
    url: `${commonPrefix}/tasks/${url}`,
    method: "get",
  })

const klingApi = {
  createVideo: createVideoKling,
  getVideo: getVideoKling,
}

// vidu
const createVideoVidu = (data) =>
  request({
    // url: `${commonPrefix}/tasks/vidu`,
    url: `/box/chat/vidu`,
    method: "post",
    data,
  })

const getVideoVidu = (task_id) =>
  request({
    // url: `${commonPrefix}/tasks/${task_id}`,
    url: `/box/chat/task/${task_id}`,
    method: "get",
  })

const videoViduUpscale = (data) =>
  request({
    // url: `${commonPrefix}/tasks/vidu-upscale`,
    url: `/box/chat/viduUpscale`,
    method: "post",
    data,
  })

const viduApi = {
  createVideo: createVideoVidu,
  getVideo: getVideoVidu,
  videoUpscale: videoViduUpscale,
}

export { klingApi, viduApi }
