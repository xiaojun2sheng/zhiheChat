import { defineStore } from "pinia"
import { generateUUID } from "@/utils"
import { useRoute, useRouter } from "vue-router"

export const useChatStore = defineStore({
  id: "chat",
  state: () => {
    return {
      loading: false,
      chatId: "", // 当前 chatId
      chatList: [], // 当前问答列表
      messageList: [], // 当前聊天信息
      chatInfo: {}, // 当前聊天信息
      sendOptions: {
        model: "gpt-3.5-turbo",
      }, // 发送的配置信息
    }
  },
  getters: {
    chat: (state) => {
      return state.chatInfo
    },
  },
  actions: {
    setLoading(loading) {
      this.loading = loading
    },
    // chat 相关
    initChat() {
      const route = useRoute()
      const router = useRouter()
      const chatListJson = localStorage.getItem("chatbot-chat-list") || "[]"
      const list = JSON.parse(chatListJson)
      this.chatList = list
      if (this.chatList.length == 0) this.createChat()
      let t = this.chatList[0]
      if (route.params.id) {
        t = this.chatList.find((i) => i.id == route.params.id)
      }
      router.replace(`/chat/${t.id}`)
      this.setChat(t)
    },
    createChat() {
      const item = {
        id: generateUUID(),
        name: "智能助手",
        headImg: "",
        lastMsg: "",
        updateTime: "",
      }
      this.chatList.push(item)
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList))
    },
    updateChatItem(data) {
      const t = this.chatList.find((item) => item.id === this.chat.id)
      if (t) {
        for (const key in data) {
          t[key] = data[key]
        }
        this.setChat(t)
      }
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList))
    },
    delChat(id) {
      this.chatList = this.chatList.filter((item) => item.id !== id)
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList))
      $message.success("操作成功")
    },
    setChat(data) {
      this.chatId = data.id
      this.chatInfo = convertChat(data) || {}
      function convertChat(data = {}) {
        return {
          ...data,
          title: data.name,
          desc: data.desc || "暂无备注",
          avatar:
            data.headImg ||
            "https://lf3-static.bytednsdoc.com/obj/eden-cn/zu-qz/ljhwZthlaukjlkulzlp/CNS-新封面图片/PPT生成.jpg",
        }
      }
    },
    initMessage(id) {
      this.chatId = id
      const messageMapJson =
        localStorage.getItem("chatbot-chat-message-map") || "{}"
      const map = JSON.parse(messageMapJson)
      this.messageList = map[id]?.filter((t) => t.content) || []
    },
    addMessage(val) {
      this.messageList.push(
        {
          content: val,
          role: "user",
          status: "success",
          datetime: "",
        },
        {
          content: "",
          role: "system",
          status: "loading",
        }
      )
      const messageMapJson =
        localStorage.getItem("chatbot-chat-message-map") || "{}"
      const map = JSON.parse(messageMapJson)
      map[this.chatId] = this.messageList
      localStorage.setItem("chatbot-chat-message-map", JSON.stringify(map))
    },
    // 更新最后一条回复的状态、信息
    updateLastMessage(content, status) {
      if (!this.messageList[this.messageList.length - 1]) return
      if (status) this.messageList[this.messageList.length - 1].status = status
      if (content)
        this.messageList[this.messageList.length - 1].content = content
      const messageMapJson =
        localStorage.getItem("chatbot-chat-message-map") || "{}"
      const map = JSON.parse(messageMapJson)
      map[this.chatId] = this.messageList
      localStorage.setItem("chatbot-chat-message-map", JSON.stringify(map))
    },
    // 文件相关
    setSendOptions(data) {
      this.sendOptions = data
    },
  },
})