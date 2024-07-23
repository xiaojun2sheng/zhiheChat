import { defineStore } from "pinia"
export const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      theme: "auto",
    }
  },
  getters: {},
  actions: {},
})
