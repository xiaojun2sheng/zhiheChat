// import { login } from "@/api/user"
import { useUserStore } from "@/store/user"

export const useLogin = () => {
  const userStore = useUserStore()
  
  const login = () => {
    // login().then((res) => {
    //   console.log(res)
    // })
  }
  const logout = () => {
    // logout().then((res) => {
    //   console.log(res)
    // })
  }

  return {
    login,
    logout,
  }
}
