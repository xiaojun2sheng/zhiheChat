import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      isLogin: !!localStorage.getItem("chatbot-token"),
      user: {},
    }
  },
  getters: {},
  actions: {
    setLogin(isLogin) {
      this.isLogin = isLogin
    },
  },
})
