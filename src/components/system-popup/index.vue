<template>
  <NModal
    v-model:show="visible"
    :auto-focus="false"
    preset="dialog"
    title="设置"
    :show-icon="false"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submit"
    @on-negative-click="visible = false"
    style="width: 95%; max-width: 640px"
  >
    <NForm label-width="120px" label-placement="left">
      <!-- <n-form-item label="API Key">
        <NInput
          v-model:value="setting.apiKey"
          placeholder="请输入key，或者联系我们获取"
        ></NInput>
      </n-form-item> -->
      <n-form-item label="模型选择">
        <NSelect
          v-model:value="setting.currentModel"
          :options="setting.presetChatModels"
          placeholder="请选择"
        ></NSelect>
      </n-form-item>
      <!-- <n-form-item label="接口代理地址">
        <NInput
          v-model:value="appStore.baseUrl"
          placeholder="除默认地址外，必须包含 http(s)://"
        ></NInput>
      </n-form-item> -->
      <!-- <n-form-item label="购买">
        <n-button text type="primary" @click="open"> 点击立即购买 </n-button>
      </n-form-item> -->
      <n-form-item label="联系我们">
        <NImage style="width: 100px; height: 100px" :src="WxCode" fit="fit" />
      </n-form-item>
    </NForm>
  </NModal>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useAppStore, useChatStore } from "@/stores"
import WxCode from "@/assets/images/help/weixinqun.jpg"

const appStore = useAppStore()
const chatStore = useChatStore()
const emit = defineEmits(["submit"])

const visible = ref(false)
const setting = reactive({
  apiKey: "",
  presetChatModels: "",
  currentModel: "",
})

const open = () => {
  window.open("https://api.chatfire.cn/")
}

const show = () => {
  setting.apiKey = appStore.apiKey
  setting.presetChatModels = chatStore.presetChatModels
  setting.currentModel = appStore.currentModel
  visible.value = true
}
const close = () => {
  visible.value = false
}
const submit = () => {
  appStore.setSettings(setting)
  close()
}

defineExpose({
  show,
  close,
})
</script>
<style scoped></style>
