import { ref, watch } from "vue"
import { useChatStore } from "@/stores"

export const useAgent = (sendRef) => {
  const agentPanelRef = ref()
  const sendContent = ref("")
  const chatStore = useChatStore()
  watch(
    () => sendRef.value?.sendContent,
    (newVal) => {
      console.log("useCommand", newVal)
      if (newVal === "@") {
        showAgent()
      }
    }
  )
  watch(
    () => chatStore.agent,
    (newVal) => {
      if (sendRef.value?.sendContent === "@" && newVal) {
        sendRef.value.sendContent = ""
        sendRef.value.handleFocus()
      }
    },
    { deep: true }
  )
  const showAgent = () => {
    agentPanelRef.value.show()
  }
  const switchAgentPanel = () => {
    agentPanelRef.value.switchShow()
  }
  return { switchAgentPanel, sendContent, agentPanelRef }
}
