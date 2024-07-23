<template>
  <div class="message_list">
    <div v-if="messageList.length > 0">
      <div v-for="item in messageList" :key="item" class="message_item">
        <div v-if="item.role == 'user'" class="user_box">
          <el-avatar> user </el-avatar>
          <div class="msg_content">
            {{ item.content }}
          </div>
        </div>
        <div v-else class="gpt_box">
          <el-avatar> GPT </el-avatar>
          <div class="msg_content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <n-empty v-else description="empty" />
  </div>
</template>
<script setup>
import { computed, ref } from "vue"

const props = defineProps({
  msgList: {
    type: Array,
    default: [],
  },
})

const messageList = computed(() => {
  return props.msgList
})
</script>

<style scoped lang="scss">
.message_list {
  width: 100%;
  .message_item {
    width: 100%;
    margin-bottom: 8px;
    .el-avatar {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
    .msg_content {
      width: calc(90% - 40px);
      border: 1px solid #e6e8eb;
      border-radius: 8px;
      padding: 8px;
    }
    .user_box {
      display: flex;
    }
    .gpt_box {
      display: flex;
    }
  }
}
</style>
