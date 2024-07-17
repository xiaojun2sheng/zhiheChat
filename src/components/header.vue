

<template>
  <div class="header_box" hadow="always">
    <div class="logo">
      Logo
    </div>
    <el-menu
      class="menulist"
      mode="horizontal"
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
    <UserCenter></UserCenter>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserCenter from './userCenter.vue'

const router = useRouter()

const menuList = [
  { title: '视频', id: '1', url: '/video' },
  { title: '音乐', id: '2', url: '/music' },
  { title: '图片', id: '3', url: '/image' },
  { title: '问答', id: '4', url: '/chat' }
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
  height: 55px;
  .logo {
    width: 100px;
  }
  .menulist {
    width: calc(100% - 200px);
  }
}
</style>
