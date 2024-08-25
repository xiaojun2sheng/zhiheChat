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
    progress.value = 0
    progressFlost = 0
    code = setInterval(() => {
      progressFlost += step
      progress.value = parseInt(progressFlost)
    }, 1500)
  }

  const clearCountDown = () => {
    clearInterval(code)
  }

  watch(
    () => progress.value,
    () => {
      if (progress.value == 30) step = 0.5
      else if (progress.value == 50) step = 0.35
      else if (progress.value == 60) step = 0.25
      else if (progress.value == 80) step = 0.125
      else if (progress.value == 85) step = 0.075
      else if (progress.value == 90) step = 0.025
      else if (progress.value == 95) step = 0.0125
      else if (progress.value == 97) step = 0.0075
      else if (progress.value == 98) step = 0.00375
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
