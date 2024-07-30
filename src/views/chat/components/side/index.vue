<template>
  <SideItem>
    <template #left>
      <SvgIcon
        class="mr-2"
        :width="25"
        :height="25"
        icon="arcticons:openai-chatgpt"
      ></SvgIcon>
    </template>
    <template #content>ChatGpt</template>
    <template #right
      ><SvgIcon class="mr-2" :width="18" :height="18" icon="uil:edit"></SvgIcon>
    </template>
  </SideItem>
</template>

<script setup>
import SideItem from "./SideItem.vue"

</script>
<style lang="scss" scoped></style>
