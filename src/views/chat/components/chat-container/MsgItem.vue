<template>
  <div class="msg-item">
    <div v-if="position == 'left'" :class="['msg-item__box', 'msg-item__left']">
      <div class="left_content">
        <div class="flex gap-2">
          <img src="@/assets/logo.png" />
          <div class="bg-[#2f2f2f] content">
            <div v-html="searchContentHtml"></div>
            <div v-html="contentHtml"></div>
          </div>
        </div>
        <div v-if="status == 'loading'" class="loading">
          <NSpin :size="15"></NSpin>
        </div>
        <div class="flex gap-2 mt-2 ml-10">
          <SvgIcon
            :width="15"
            :height="15"
            hover
            icon="icon-park-outline:copy"
            @click="handlerAction('copy')"
          ></SvgIcon>
          <SvgIcon
            :width="15"
            :height="15"
            hover
            icon="bx:like"
            @click="handlerAction"
          ></SvgIcon>
          <SvgIcon
            :width="15"
            :height="15"
            hover
            icon="bx:dislike"
            @click="handlerAction"
          ></SvgIcon>
        </div>
      </div>
    </div>
    <div
      v-if="position == 'right'"
      :class="['msg-item__box', 'msg-item__right']"
    >
      <div class="content" v-html="contentHtml"></div>
      <!-- <img :src="userStore.avatar" /> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useUserStore } from "@/stores"
import { copy } from "@/utils"
import markdownit from "markdown-it"
import hljs from "highlight.js/lib/core"

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

const emit = defineEmits(["stop-stream", "on-refresh"])

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  role: String,
  position: String,
})

const userStore = useUserStore()
const contentHtml = computed(() => {
  const val = props.item.userContent || props.item.content
  return md.render(val)
})
const searchContentHtml = computed(() => {
  let val = props.item?.searchContent || ""
  if (val) {
    val = val
      .replaceAll('检索 ', "<|-prefix-|>")
      .replaceAll('...', "")
      .replaceAll(/\(http/g, "<|-suffix-|>\(http")
    val = val.replaceAll("<|-prefix-|>", "[").replaceAll("<|-suffix-|>", "]")
  }
  return (val && md.render(val)) || ""
})
const status = computed(() => props.item.status)

const handlerAction = (type) => {
  const val = props.item.userContent || props.item.content
  if (type == "copy") {
    copy(val)
    $message.success("复制成功")
  } else {
    $message.success("感谢你的反馈")
  }
}
</script>
<style lang="scss" scoped>
.left_content {
  position: relative;
  overflow: auto;
  .loading {
    position: absolute !important;
    width: 20px;
    height: 20px;
    top: 5px !important;
    right: 5px !important;
  }
}
.msg-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    object-fit: cover;
  }
  .msg-item__box {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    max-width: 70%;
    .content {
      padding: 10px 16px;
      border-radius: 10px;
      word-break: break-all;
      min-height: 37px;
      min-width: 60px;
      // white-space: pre;
    }
    &.msg-item__left {
      align-self: flex-start;
      // z-index: -1;
    }
    &.msg-item__right {
      align-self: flex-end;
      border-radius: 10px;
      background-color: #28499d;
      .content {
      }
    }
  }
}
.stop-btn {
  margin-top: 10px;
  cursor: pointer;
  width: max-content;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: #262626;
}

:deep(.github-markdown-body) {
  padding: 16px 20px 0;
  font-size: 14px;
}

</style>
