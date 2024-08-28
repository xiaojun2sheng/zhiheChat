import { ref } from "vue"
export const useAgent = () => {
  const list = [
    {
      name: "提示词专家",
      modelId: "prompter",
      avatar:
        "https://kimi-img.moonshot.cn/prod-chat-kimi/avatar/kimiplus/prompt.png",
      intro: "零门槛成为提示词大师，更好地向火宝提问",
      creator: "火宝",
    },
    {
      name: "塔罗牌",
      modelId: "", // taro
      avatar:
        "https://kimi-img.moonshot.cn/prod-chat-kimi/avatar/kimiplus/taro.png",
      intro: "有事没事测一测，不花钱",
      creator: "火宝",
    },
    {
      name: "翻译通",
      modelId: "", // translate
      avatar:
        "https://kimi-img.moonshot.cn/prod-chat-kimi/avatar/kimiplus/translate.png",
      intro: "一键中英互译，直译意译，样样精通",
      creator: "火宝",
    },
  ]
  const agents = ref(list)
  return {
    agents,
  }
}
