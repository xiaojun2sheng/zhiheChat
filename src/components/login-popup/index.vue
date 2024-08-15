<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="登录"
    :show-icon="false"
    style="width: 95%; max-width: 640px"
  >
    <div class="max-w-[100%] sm:max-w-[800px] py-12">
      <NForm class="px-4 sm:px-12" label-width="80px" label-placement="left">
        <n-form-item label="用户名">
          <NInput
            v-model:value="loginInfo.username"
            placeholder="请输入用户名"
          ></NInput>
        </n-form-item>
        <n-form-item label="密码">
          <NInput
            v-model:value="loginInfo.password"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
          ></NInput>
        </n-form-item>
        <n-form-item v-if="!isLogin" label="确认密码">
          <NInput
            v-model:value="loginInfo.confirmPassword"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
          ></NInput>
        </n-form-item>
        <n-form-item label="验证码">
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
        <n-button @click="visible = false">取消</n-button>
        <n-button @click="isLogin = !isLogin">
          {{ isLogin ? "去注册" : "去登录" }}
        </n-button>
        <n-button type="primary" @click="submit"> {{ btnText }} </n-button>
      </div>
    </div>
  </NModal>
</template>

<script setup>
import { useLogin } from "./useLogin"

const {
  btnText,
  isLogin,
  visible,
  codeImg,
  loginInfo,
  refreshCode,
  show,
  close,
  submit,
} = useLogin()
const emit = defineEmits(["submit"])

defineExpose({
  show,
  close,
})
</script>
<style scoped></style>
