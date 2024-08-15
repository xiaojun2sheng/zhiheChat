<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="登录"
    :show-icon="false"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submit"
    @on-negative-click="visible = false"
    style="width: 95%; max-width: 640px"
  >
    <div class="max-w-[100%] sm:max-w-[800px] py-12">
      <NForm class="px-4 sm:px-12" label-width="120px" label-placement="left">
        <n-form-item label="">
          <NInput
            v-model:value="user.username"
            placeholder="请输入用户名"
          ></NInput>
        </n-form-item>
      </NForm>
    </div>
  </NModal>
</template>

<script setup>
import { useLogin } from "./useLogin"

const { visible, user, show, close, submit } = useLogin()
const emit = defineEmits(["submit"])

defineExpose({
  show,
  close,
})
</script>
<style scoped></style>
