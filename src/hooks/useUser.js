import { queryUser, getAccount } from "@/api/user"
import { useUserStore } from "@/stores/userStore"

export const useUser = () => {
  const userStore = useUserStore()

  const initUser = async () => {
    const res = await queryUser()
    userStore.setUser(res)
    initAccount()
  }
  const initAccount = async () => {
    const res = await getAccount()
    userStore.setAccountToken(res)
  }
  return { initUser, initAccount }
}
