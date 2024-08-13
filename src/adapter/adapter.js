class Adapter {
  constructor(service) {
    this.service = service
  }

  getReq(prompt) {
    // 这里应该是向service发送请求的逻辑，返回一个对象，包含请求所需的参数
    throw new Error("getReq方法必须被实现")
  }

  getResource(res) {
    // 这里应该是从res中提取资源的逻辑
    throw new Error("getResource方法必须被实现")
  }
  createVideoTask(value){
    // 这里应该是从res中提取资源URL的逻辑
    throw new Error("createVideoTask 方法必须被实现")
  }
  upscaleVideoTask(value){
    // 这里应该是从res中提取资源URL的逻辑
    throw new Error("createVideoTask 方法必须被实现")
  }

  getVideoUrl(id) {
    // 这里应该是从res中提取资源URL的逻辑
    throw new Error("getResourceUrl方法必须被实现")
  }


}

export default Adapter
