<template>
  <div class="tag">
    <div class="flex justify-center items-center">
      <div class="talking">和<span class="name___BePAl">塔罗师</span>聊聊</div>
      <SvgIcon icon="mingcute:close-line"></SvgIcon>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.tag {
  height: 30px;
  padding: 4px 6px 4px 8px;
  background-color: #31313a;
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 10px;
  .talking {
    color: #e0ecffcc;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    text-align: center;
    display: flex;
    gap: 4px;
  }
}
</style>
