import { klingApi, viduApi } from "@/api/index"

const klingAdapter = {
  getReq: (prompt) => {
    return {
      prompt,
      aspect_ratio: "16:9",
      camera: {
        horizontal: 0,
        pan: 0,
        roll: 0,
        tilt: 0,
        type: "empty",
        vertical: 0,
        zoom: 0,
      },
      cfg: 0.5,
      duration: 5,
      negative_prompt: "",

      tail_image_url: "",
      url: "",
    }
  },
  getResource: (res) => {
    return res?.data?.works[0]?.resource
  },
  getResourceUrl: (res) => {
    return res?.data?.works[0]?.resource?.resource
  },
  service: klingApi,
}
const viduAdapter = {
  getReq: (prompt) => {
    return {
      prompt,
      style: "general",
      aspect_ratio: "16:9",
      duration: 4,
    }
  },

  getResource: (res) => {
    return res?.creations[0]
  },
  getResourceUrl: (res) => {
    return res?.creations[0]?.uri
  },
  service: viduApi,
}

const videoAdapters = {
  kling: klingAdapter,
  vidu: viduAdapter,
}

export { videoAdapters }
