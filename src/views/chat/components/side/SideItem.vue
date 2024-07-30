<template>
  <div
    class="side-item hover:bg-gray-800 cursor-pointer flex h-10 items-center gap-2.5 rounded-lg px-2 font-normal"
  >
    <div class="h-6 w-6 flex-shrink-0">
      <slot name="left"></slot>
    </div>
    <div
      class="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-token-text-primary"
    >
      <slot name="content"></slot>
    </div>
    <div class="flex gap-2">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.side-item{
  &:hover{
    background-color: #212121;
  }
}
</style>
