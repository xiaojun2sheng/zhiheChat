
<template>
  <Layout v-if="!isLogin"></Layout>
  <div class="pagerouter">
    <router-view></router-view>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Layout from './components/layout.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

let isLogin = ref(false)
router.beforeEach((to, from, next) => {
  isLogin.value = to.path == '/login'
  next()
});

</script>

<style scoped lang="scss">
.pagerouter {
  height: 100%;
}
</style>
