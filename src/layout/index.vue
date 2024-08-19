<template>
  <div class="h-full w-full p-2">
    <Header></Header>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
import Header from "./header.vue"

defineProps({})
</script>

<style lang="scss" scoped>
.main {
  height: calc(100% - 60px);
}
</style>
