import { useAppStore } from "@/stores"

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer sk-94piBrPZi2DriPw23142114aFeDc4c73Bd350aA64fBd6d0d`,
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
