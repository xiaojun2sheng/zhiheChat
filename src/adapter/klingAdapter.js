import { klingApi } from "@/api/index"
import Adapter from "./adapter.js"
class KLingAdapter extends Adapter {
  constructor() {
    super(klingApi)
  }

  getReq(prompt) {
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
  }

  getResource(res) {
    return res?.data?.works[0]?.resource
  }

  getResourceUrl(res) {
    return res?.data?.works[0]?.resource
  }
  async createVideoTask(value) {
    const res = await this.service.createVideo(this.getReq(value))
    return res.id
  }
  async getVideoUrl(id) {
    const res = await this.service.getVideo(id)
    const resource = this.getResource(res)
    let url = resource?.resource

    return url
  }
}
export default KLingAdapter
