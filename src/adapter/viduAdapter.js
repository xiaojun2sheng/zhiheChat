import { viduApi } from "@/api/index"
import Adapter from "./adapter.js"

class ViduAdapter extends Adapter {
  constructor() {
    super(viduApi)
    this.taskId = ""
    this.creationId = ""
  }

  getReq(prompt, url = "") {
    const req = {
      prompt,
      url,
      style: "general",
      aspect_ratio: "16:9",
      duration: 4,
    }
    return req
  }

  getResource(res) {
    return res?.creations[0]
  }

  async createVideoTask(value, url) {
    const res = await this.service.createVideo(this.getReq(value, url))
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
  async upscaleVideoTask() {
    debugger
    await this.service.videoUpscale({
      task_id: '2387604066483419',
      creation_id: '2387604895872796',
    })
  }
}
export default ViduAdapter
