import { createPinia } from "pinia"
import { useAppStore } from "./appStore"
import { useUserStore } from "./userStore"
import { useChatStore } from "./chatStore"
import { useHistoryStore } from "./historyStore"
const store = createPinia()

export default store

export { useAppStore, useUserStore, useChatStore, useHistoryStore }
