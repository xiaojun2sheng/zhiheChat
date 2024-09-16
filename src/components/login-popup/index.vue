<template>
  <NModal
    v-model:show="userStore.showLogin"
    :auto-focus="false"
    preset="dialog"
    :title="isLogin ? '登录' : '注册'"
    :show-icon="false"
    :mask-closable="false"
    style="width: 95%; max-width: 640px"
  >
    <div class="max-w-[100%] sm:max-w-[800px] py-12">
      <NForm
        ref="formRef"
        class="px-4 sm:px-12"
        :model="loginInfo"
        :rules="rules"
        label-width="80px"
        label-placement="left"
        :show-require-mark="false"
      >
        <n-form-item label="用户名" path="username">
          <NInput
            v-model:value="loginInfo.username"
            placeholder="请输入用户名"
          ></NInput>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <NInput
            v-model:value="loginInfo.password"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
          ></NInput>
        </n-form-item>
        <n-form-item v-if="!isLogin" label="确认密码" path="confirmPassword">
          <NInput
            v-model:value="loginInfo.confirmPassword"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
          ></NInput>
        </n-form-item>
        <n-form-item label="验证码" path="code">
          <div class="flex h-[40px] w-full">
            <NInput
              v-model:value="loginInfo.code"
              placeholder="请输入验证码"
            ></NInput>
            <img
              class="cursor-pointer"
              :src="codeImg"
              alt=""
              @click="refreshCode"
            />
          </div>
        </n-form-item>
      </NForm>
      <div class="flex justify-end pr-12 gap-4">
        <n-button text @click="isLogin = !isLogin">
          {{ isLogin ? "去注册" : "去登录" }}
        </n-button>
        <n-button @click="close">取消</n-button>
        <n-button type="primary" @click="submit"> {{ btnText }} </n-button>
      </div>
    </div>
  </NModal>
</template>

<script setup>
import { useInit } from "./useInit"
import { useUserStore } from "@/stores"

const userStore = useUserStore()

const {
  btnText,
  isLogin,
  codeImg,
  rules,
  loginInfo,
  formRef,
  refreshCode,
  show,
  close,
  submit,
} = useInit()
const emit = defineEmits(["submit"])

defineExpose({
  show,
  close,
})
</script>
<style scoped></style>
