<template>
  <div class="h-full w-full p-2 flex flex-col">
    <Header></Header>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
import Header from "./header.vue"
import { onMounted } from "vue"

onMounted(() => {
})
defineProps({})
</script>

<style lang="scss" scoped>
.main {
  height: calc(100% - 35px);
}
</style>
