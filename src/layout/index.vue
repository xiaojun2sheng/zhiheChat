<template>
    <div class="h-full w-full p-2">
      <Header></Header>
      <RouterView></RouterView>
    </div>
  </template>
  <script setup>
  import Header from "./header.vue"
  
  defineProps({})
  </script>
  
  <style scoped></style>
  