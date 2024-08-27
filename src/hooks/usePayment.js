import { createOrder } from "@/api/pay"

export const usePayment = () => {
  const createOrderById = async (id) => {
    return await createOrder({ optionId: id })
  }
  return { createOrderById }
}
