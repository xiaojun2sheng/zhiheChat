<template>
  <NModal
    v-model:show="visible"
    class="payment-dialog"
    :auto-focus="false"
    preset="dialog"
    title="支付订单"
    :show-icon="false"
    :mask-closable="false"
    :close-on-esc="false"
    style="width: 480px"
  >
    <div class="payment-popup flex justify-center gap-4">
      <canvas id="codeCanvas" class="rounded-lg"></canvas>
      <div class="details text-xs">
        <p class="title flex gap-2">
          <img class="shrink-0" src="@/assets/wx.png" />
          请用微信扫码支付金额:
          <span class="dollar">¥</span><span class="v">{{order.amount}}</span> 元
        </p>
        <p class="desc clickable">
          支付即视您已同意
          <a
            href="/docs/payment-policy"
            target="_blank"
            style="margin-left: 0px"
            >《火宝AI付费服务协议》</a
          >
        </p>
      </div>
    </div>
  </NModal>
</template>

<script setup>
import { ref } from "vue"
import QRCode from "qrcode"

const emit = defineEmits(["submit"])
const visible = ref(false)
const codeSuccess = ref(false)

const drawCodeImage = (qrcodeUrl) => {
  const canvas = document.getElementById("codeCanvas")
  QRCode.toCanvas(canvas, qrcodeUrl, function (error) {
    if (error) console.error(error)
    console.log("success!")
    codeSuccess.value = true
  })
}
const order = ref()
const show = (data) => {
  order.value = data.order
  visible.value = true
  setTimeout(() => {
    drawCodeImage(data.url)
  }, 500)
}
const close = () => {
  visible.value = false
}

defineExpose({
  show,
})
</script>
<style lang="scss" scoped>
.payment-popup {
}
</style>
<style lang="scss">
.payment-dialog {
  background: url("@/assets/pay-bg.png");
  background-size: contain !important;
  background-repeat: no-repeat;
}
</style>
