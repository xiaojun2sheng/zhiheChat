import { useAppStore } from "@/stores"

function getHeaders() {
  const appStore = useAppStore()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${appStore.key}`
  }
}

// gpt 问答
export const chat2gpt = async (data, { signal }) => {
  return fetch(`${import.meta.env.VITE_APP_BASE_API}/v1/chat/completions`, {
    method: "post",
    signal,
    body: JSON.stringify(data),
    headers: getHeaders(),
  })
}
