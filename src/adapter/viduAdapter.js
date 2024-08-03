import { viduApi } from "@/api/index"
import Adapter from "./adapter.js"

class ViduAdapter extends Adapter {
  constructor() {
    super(viduApi)
    this.taskId = ""
    this.creationId = ""
  }

  getReq(prompt) {
    return {
      prompt,
      style: "general",
      aspect_ratio: "16:9",
      duration: 4,
    }
  }

  getResource(res) {
    return res?.creations[0]
  }

  async createVideoTask(value) {
    const res = await this.service.createVideo(this.getReq(value))
    return res.id
  }
  async getVideoUrl(id) {
    const res = await this.service.getVideo(id)
    const creation = this.getResource(res)
    let url = ""
    if (creation) {
      this.taskId = creation.task_id
      this.creationId = creation.id
      url = creation.uri
    }
    return url
  }
}
export default ViduAdapter
