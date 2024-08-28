import { ref } from "vue"
import { agentList } from "@/utils"
export const useAgent = () => {
  const agents = ref(agentList)
  return {
    agents,
  }
}
