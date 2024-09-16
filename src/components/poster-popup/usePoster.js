import { ref, watch } from "vue"
import html2canvas from "html2canvas"
import markdownit from "markdown-it"
import hljs from "highlight.js/lib/core"

export const usePoster = () => {
  const md = markdownit({
    html: false, // 在源码中启用 HTML 标签
    linkify: true, // 将类似 URL 的文本自动转换为链接。
    typographer: true, // 启用一些语言中立的替换 + 引号美化
    highlight: function (str, lang) {
      const html = hljs.highlightAuto(str).value
      const val = `<pre class="code-body">
          <code class="hljs">${html}</code>
        </pre>`
      return val
    },
  })

  const visible = ref(false)
  const finallyPosterHtml = ref("")
  const posterHtml = ref("")
  const renderHtml = ref("")
  const loading = ref(true)

  const canvasRef = ref()
  const canvasImage = ref("")

  const toImage = () => {
    html2canvas(canvasRef.value, {
      dpi: 300, // 解决生产图片模糊
      useCORS: true,
      allowTaint: false,
      logging: false,
      scale: 2,
      windowHeight: 400,
    })
      .then((canvas) => {
        canvasImage.value = canvas.toDataURL("image/png")
        window.$message.success("卡片生成成功，试试右击复制分享吧～")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const show = () => {
    visible.value = true
    initPoster()
  }
  const close = () => {
    visible.value = false
  }

  const inputValue = ref("")
  const initPoster = () => {
    const myHeaders = new Headers()
    let content = `# 角色\n你是一位新潮评论家，你年轻、批判，又深刻；\n你言辞犀利而幽默，擅长一针见血得表达隐喻，对现实的批判讽刺又不失文雅；\n你的行文风格和"Oscar Wilde" "鲁迅" "林语堂"等大师高度一致\n\n# 任务\n## 金句诠释\n用特殊视角来全新得诠释给定的汉语词汇；\n敏锐得抓住给定的词汇的本质，用“辛辣的讽刺”“一针见血的评论”的风格构造包含隐喻又直达本质的「金句」\n例如：“委婉”： "刺向他人时, 决定在剑刃上撒上止痛药。"\n\n## 输出结果【词汇卡片】\n - 输出 Html 代码\n - 整体设计合理使用留白，整体排版要有呼吸感\n - 设计原则：干净 简洁 纯色 典雅\n - 配色：下面的色系中随机选择一个[\n    "柔和粉彩系",\n    "深邃宝石系",\n    "清新自然系",\n    "高雅灰度系",\n    "复古怀旧系",\n    "明亮活力系",\n    "冷淡极简系",\n    "海洋湖泊系",\n    "秋季丰收系",\n    "莫兰迪色系"\n  ]\n - 卡片样式：\n    (字体 . ("KaiTi, SimKai" "Arial, sans-serif"))\n    (颜色 . ((背景 "#FAFAFA") (标题 "#333") (副标题 "#555") (正文 "#333")))\n    (尺寸 . ((卡片宽度 "auto") (卡片高度 "auto, >宽度") (内边距 "20px")))\n    (布局 . (竖版 弹性布局 居中对齐))))\n - 卡片元素：\n    (标题 "火宝新语🔥")\n    (分隔线)\n    (词语 ${inputValue.value})\n    (拼音)\n    (英文翻译)\n    (法语翻译)\n    (俄语翻译)\n    (朝鲜语翻译)\n    (emoji：（尝试用几个 emoji 表情表达词汇）)\n    (解释：(按现代诗排版))\n\n### 结果示例：\n\`\`\`\n<!DOCTYPE html>\n<html lang="zh">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>火宝新语🔥</title>\n    <link href="https://fonts.lug.ustc.edu.cn/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@300;400&display=swap" rel="stylesheet">\n    <style>\n        :root {\n            /* 莫兰迪色系：使用柔和、低饱和度的颜色 */\n            --primary-color: #B6B5A7; /* 莫兰迪灰褐色，用于背景文字 */\n            --secondary-color: #9A8F8F; /* 莫兰迪灰棕色，用于标题背景 */\n            --accent-color: #C5B4A0; /* 莫兰迪淡棕色，用于强调元素 */\n            --popup-background-color: #E8E3DE; /* 莫兰迪米色，用于页面背景 */\n            --text-color: #5B5B5B; /* 莫兰迪深灰色，用于主要文字 */\n            --light-text-color: #8C8C8C; /* 莫兰迪中灰色，用于次要文字 */\n            --divider-color: #D1CBC3; /* 莫兰迪浅灰色，用于分隔线 */\n        }\n        body, .n-card__content {\n            margin: 0;\n            padding: 0;\n            height: 100%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n font-family: \'Noto Sans SC\', sans-serif;\n            color: var(--text-color); /* 使用莫兰迪深灰色作为主要文字颜色 */\n        }\n        .card {\n            width: 300px;\n            height: auto;\n            background-color: #F2EDE9; /* 莫兰迪浅米色，用于卡片背景 */\n            border-radius: 20px;\n            box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n            overflow: hidden;\n            position: relative;\n            display: flex;\n            flex-direction: column;\n        }\n        .header {\n            background-color: var(--secondary-color); /* 使用莫兰迪灰棕色作为标题背景 */\n            color: #F2EDE9; /* 浅色文字与深色背景形成对比 */\n            padding: 20px;\n            text-align: left;\n            position: relative;\n            z-index: 1;\n        }\n        h1 {\n            font-family: \'Noto Serif SC\', serif;\n            font-size: 20px;\n            margin: 0;\n            font-weight: 700;\n        }\n        .content {\n            padding: 30px 20px;\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n        }\n        .word {\n            text-align: left;\n            margin-bottom: 20px;\n        }\n        .word-main {\n            font-family: \'Noto Serif SC\', serif;\n            font-size: 36px;\n            color: var(--text-color); /* 使用莫兰迪深灰色作为主要词汇颜色 */\n            margin-bottom: 10px;\n            position: relative;\n        }\n        .word-main::after {\n            content: \'\';\n            position: absolute;\n            left: 0;\n            bottom: -5px;\n            width: 50px;\n            height: 3px;\n            background-color: var(--accent-color); /* 使用莫兰迪淡棕色作为下划线 */\n        }\n        .word-sub {\n            font-size: 14px;\n            color: var(--light-text-color); /* 使用莫兰迪中灰色作为次要文字颜色 */\n            margin: 5px 0;\n        }\n        .divider {\n            width: 100%;\n            height: 1px;\n            background-color: var(--divider-color); /* 使用莫兰迪浅灰色作为分隔线 */\n            margin: 20px 0;\n        }\n        .explanation {\n            font-size: 18px;\n            line-height: 1.6;\n            text-align: left;\n            flex-grow: 1;\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n        }\n        .quote {\n            position: relative;\n            padding-left: 20px;\n            border-left: 3px solid var(--accent-color); /* 使用莫兰迪淡棕色作为引用边框 */\n        }\n        .background-text {\n            position: absolute;\n            font-size: 150px;\n            color: rgba(182, 181, 167, 0.15); /* 使用莫兰迪灰褐色的透明版本作为背景文字 */\n            z-index: 0;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n            font-weight: bold;\n        }\n    </style>\n</head>\n<body>\n    <div class="card">\n        <div class="header">\n            <h1>火宝新语🔥</h1>\n        </div>\n        <div class="content">\n            <div class="word">\n                <div class="word-main">金融杠杆</div>\n                <div class="word-sub">Jīn Róng Gàng Gǎn</div>\n                <div class="word-sub">Financial Leverage</div>\n                <div class="word-sub">levier financier</div>\n                <div class="word-sub">Финансовый рычаг</div>\n                <div class="word-sub">금융 레버리지</div>\n                <div class="word-sub">💰🏋️‍♂️💹</div>\n            </div>\n            <div class="divider"></div>\n            <div class="explanation">\n                <div class="quote">\n                    <p>\n                        借鸡生蛋，<br>\n                        只不过这蛋要是金的，<br>\n                        鸡得赶紧卖了还债。\n                    </p >\n                </div>\n            </div>\n        </div>\n        <div class="background-text">杠杆</div>\n    </div>\n</body>\n</html>\n\`\`\`\n### 注意：\n1. 分隔线与上下元素垂直间距相同，具有分割美学。\n2. 卡片(.card)不需要 padding ，允许子元素“火宝新语🔥”的色块完全填充到边缘，具有设计感。\n\n# 词汇 ${inputValue.value}\n`
    var raw = JSON.stringify({
      messages: [
        {
          role: "user",
          content,
        },
      ],
      chat_id: "eqI1A0z",
      model: "Pro/THUDM/glm-4-9b-chat",
      temperature: 0.7,
      top_k: 50,
      top_p: 0.7,
      max_tokens: 4096,
      frequency_penalty: 0,
    })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    const isENV = import.meta.env.DEV
    fetch(
      `${isENV ? "" : "https://xy.siliconflow.cn/"}/siliconflow/api/chat`,
      requestOptions
    )
      .then((response) => {
        readerStream(response)
      })

      .catch((error) => console.log("error", error))

    const readerStream = async (res) => {
      return new Promise(async (resolve, reject) => {
        try {
          const reader = res.body.getReader()
          while (true) {
            loading.value = true
            const { value, done } = await reader.read()
            let decodeVal = new TextDecoder().decode(value)
            if (done) {
              window.$message.success("立即为您生成卡片")
              setTimeout(() => {
                toImage()
              }, 1000)
              loading.value = false
              break
            }
            posterHtml.value += decodeVal
            // 替换字符
            posterHtml.value = posterHtml.value.replaceAll(
              "智说新语",
              "火宝新语🔥"
            )
            posterHtml.value = posterHtml.value.replaceAll(
              "body, html",
              ".n-dialog__content"
            )
            posterHtml.value = posterHtml.value.replaceAll(
              "  .header",
              "  .n-dialog__content .header"
            )
            renderHtml.value = md.render("生成中\n" + posterHtml.value)

            finallyPosterHtml.value = posterHtml.value
            let list = finallyPosterHtml.value.split("\n")
            list.pop()
            list.shift()
            finallyPosterHtml.value = list.join("\n")
            loading.value = false

            // 滚动到底部
            const dom = document.querySelector(".container__content")
            dom.scrollTop = dom.scrollHeight
          }
          resolve()
        } catch (error) {
          if (error.name === "AbortError") {
            resolve()
          } else {
            console.log(error)
            reject(error)
          }
        }
      })
    }
  }

  return {
    canvasImage,
    canvasRef,
    toImage,
    loading,
    renderHtml,
    posterHtml,
    finallyPosterHtml,
    visible,
    show,
    close,
    initPoster,
  }
}
