import { ref, onUnmounted, watch } from "vue"

export const useCountDown = () => {
  // 百分比进度整数
  const progress = ref(0)
  // 百分比进度小数
  let progressFlost = 0
  // 每次进度增加 0.5%
  let step = 1
  let code
  const initCountDown = () => {
    code = setInterval(() => {
      progressFlost += step
      progress.value = parseInt(progressFlost)
    }, 1000)
  }

  const clearCountDown = () => {
    clearInterval(code)
  }

  watch(
    () => progress.value,
    () => {
      if (progress.value == 30) step *= 0.6
      else if (progress.value == 60) step *= 0.6
      else if (progress.value == 80) step *= 0.6
      else if (progress.value >= 100) clearCountDown()
    }
  )

  onUnmounted(() => {
    clearCountDown()
  })
  return {
    progress,
    initCountDown,
    clearCountDown,
  }
}
