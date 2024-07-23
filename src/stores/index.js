import { createPinia } from "pinia"
import { useAppStore } from "./appStore"
const store = createPinia()

export default store

export { useAppStore }
