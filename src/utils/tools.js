export const positionDomViewBottom = (className = "_message_list") => {
  setTimeout(() => {
    let container = document.getElementsByClassName(className)[0]
    if (!container) return
    container.scrollTop = container.scrollHeight
  })
}

// 获取assets静态资源
export const getAssetsFile = (url) => {
  return new URL(url, import.meta.url).href
}
// 判断是否 undefined null 空字符
const isEmpty = (val) => {
  return val === undefined || val === null || val === ""
}

export const generateUUID = () => {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now() // 使用 performance.now() 生成更短的 UUID
  }
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

export const copy = async (val) => {
  // 添加一个input元素放置需要的文本内容
  const copyInput = document.createElement("input")
  copyInput.value = val
  document.body.appendChild(copyInput)
  // 选中并复制文本到剪切板
  copyInput.select()
  document.execCommand("copy")
  document.body.removeChild(copyInput)
  window.$message.success("复制成功")
}

export const base64ToImage = (base64String, callback) => {
  // 创建一个新的Image对象
  var img = new Image()

  // 设置图像加载完成后的回调函数
  img.onload = function () {
    // 创建一个新的canvas元素
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d")

    // 设置canvas的大小为图像的大小
    canvas.width = img.width
    canvas.height = img.height

    // 将图像绘制到canvas上
    ctx.drawImage(img, 0, 0)

    // 将canvas转换为Blob对象
    canvas.toBlob(function (blob) {
      // 创建一个新的File对象
      var file = new File([blob], "image.png", { type: blob.type })

      // 调用回调函数，并传入File对象
      callback(file)
    }, "image/png") // 指定文件类型，例如'image/jpeg'或'image/png'
  }

  // 设置图像的源为Base64字符串
  img.src = base64String

  // 如果图像的源是Base64字符串，可能需要设置crossOrigin属性
  if (img.crossOrigin === "anonymous") {
    img.crossOrigin = ""
  }
}
