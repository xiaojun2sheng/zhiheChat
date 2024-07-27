<template>
  <div class="w-[260px] h-full">
    <img v-if="url" class="rounded-lg" :src="url" />
    <div
      v-else
      class="rounded-lg loading-container w-full h-full flex justify-center items-center"
    >
      <n-spin :show="!url">
        <template #description> 生成中 </template>
      </n-spin>
    </div>
  </div>
</template>
<script setup>
defineProps({
  url: String,
})
</script>
<style lang="scss" scoped>
.loading-container {
  background-color: #191d21dd;
  color: #c5c7d5;
}
</style>
