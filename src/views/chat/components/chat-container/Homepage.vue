<template>
  <div class="homepage py-10 flex flex-col justify-center items-center">
    <img src="@/assets/logo.png" alt="" />
    <div class="hot">
      <ul class="list">
        <li class="item" v-for="item in list" @click="emit('hot-item-select', item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue"
import { getHot } from "@/api"

const emit = defineEmits(["hot-item-select"])
const props = defineProps({})

onMounted(() => {
  initHot()
})
const list = ref([])
const initHot = async () => {
  const res = await getHot()
  // console.log(res)
  let t = res.split("\n").splice(0, 20)
  try {
    t = t.map((val) => val.replaceAll(/^\d+./g, "").trim())
  } catch (e) {
    //TODO handle the exception
  }
  list.value = t
}
</script>
<style lang="scss" scoped>
.homepage {
  img {
    width: 170px;
    height: 150px;
  }
  .hot {
    margin-top: 20px;
    height: 220px;
    overflow-y: auto;
    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .item {
      color: #ffffff;
      padding: 10px 15px;
      border-radius: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      min-width: 1px;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      border: 1px solid #45454e;
      &:hover {
        background-color: #3a3a44;
      }
    }
  }
}
</style>
