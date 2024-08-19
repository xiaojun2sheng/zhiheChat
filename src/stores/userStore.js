import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      isLogin: !!localStorage.getItem("chatbot-token"),
      account: {
        token: 0,
      }, // 账户信息
      user: {}, // 用户信息
    }
  },
  getters: {},
  actions: {
    setLogin(isLogin) {
      this.isLogin = isLogin
    },
  },
})
