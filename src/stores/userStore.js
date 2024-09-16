import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      showLogin: false, // 是否显示登录框
      isLogin: !!localStorage.getItem("chatbot-token"),
      account: {
        token: 0,
      }, // 账户信息
      user: {}, // 用户信息
    }
  },
  getters: {},
  actions: {
    setShowLogin(showLogin) {
      this.showLogin = showLogin
    },
    setLogin(isLogin) {
      this.isLogin = isLogin
    },
    setUser(data) {
      this.user = data
    },
    setAccountToken(data) {
      this.account.token = data
    },
  },
})
