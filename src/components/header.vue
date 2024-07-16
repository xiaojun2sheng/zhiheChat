

<template>
  <div class="header_box">
    <div class="logo">
      Logo
    </div>
    <el-menu
      class="menulist"
      mode="horizontal"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item 
        v-for="menuItem in menuList" 
        :key="menuItem.id"
        :index="menuItem.id"
        @click="jumpPage(menuItem.url)">
        <template #title>
          <span>{{ menuItem.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="user_center">
      userCenter
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuList = [
  { title: '视频', id: 1, url: '/video' },
  { title: '音乐', id: 2, url: '/music' },
  { title: '图片', id: 3, url: '/image' },
  { title: '问答', id: 4, url: '/chat' }
]

const jumpPage = (url) => {
  router.push({
    path: url,
  })
}
</script>

<style lang="less" scoped>
.header_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 100px;
  }
  .menulist {
    width: calc(100% - 200px);
  }
  .user_center {
    width: 100px;
  }
}
</style>
