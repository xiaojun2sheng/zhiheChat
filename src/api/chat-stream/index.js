import { request } from "@/utils"
function getHeaders() {
  const token = localStorage.getItem("chatbot-token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    'no-cors': true,
    mode: 'no-cors',
  }
}

// gpt 问答
// export const chat2gpt = async (data, { signal }) => {
//   // return fetch(`${import.meta.env.VITE_APP_BASE_API}/v1/chat/completions`, {
//   // return fetch(`/box/chat/ask`, {
//   return fetch(`https://agi.chatfire.cn/box/chat/ask`, {
//     method: "post",
//     signal,
//     body: JSON.stringify(data),
//     headers: getHeaders(),
//   })
// }

export const chat2gpt = (data) =>
  request({
    url: `/box/chat/ask`,
    method: "post",
    headers: {
      'Accept': 'text/event-stream',
      responseType: 'stream',
    },
    data,
  })