<script setup>
import { NConfigProvider } from "naive-ui"
import { zhCN, dateZhCN } from "naive-ui"
import NaiveProvider from "@/components/common/NaiveProvider/index.vue"
import { useTheme } from "@/hooks/useTheme"
import Layout from "@/layout/index.vue"
import { useAppStore } from "@/stores"

const { theme, themeOverrides } = useTheme()
const appStore = useAppStore()

appStore.resolveSettings()
</script>

<template>
  <n-config-provider
    class="h-full w-full"
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <NaiveProvider>
      <Layout></Layout>
    </NaiveProvider>
  </n-config-provider>
</template>

<style scoped></style>
