<script setup>
import { defineComponent, h } from "vue"
import {
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
} from "naive-ui"

function registerNaiveTools() {
  const w = window
  w.$loadingBar = useLoadingBar()
  w.$dialog = useDialog()
  w.$message = useMessage()
  w.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  name: "NaiveProviderContent",
  setup() {
    registerNaiveTools()
  },
  render() {
    return h("div")
  },
})
</script>

<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <slot />
          <NaiveProviderContent />
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>
