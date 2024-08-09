<template>
  <div class="h-full w-full">
    <Header></Header>
    <div class="p-2">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
import Header from "./header.vue"

defineProps({})
</script>

<style scoped></style>
