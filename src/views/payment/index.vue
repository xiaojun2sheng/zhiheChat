<template>
  <div class="payment p-4 w-max">
    <h3 class="text-xl mb-4">账户总览</h3>
    <div>
      <span class="text-zinc-400">账户余额：</span>
      <span class="">9999 火币</span>
    </div>
    <n-divider />
    <h3 class="text-xl my-4">账户充值</h3>
    <div class="flex">
      <span class="text-zinc-400">支付金额：</span>
      <div class="grid grid-cols-4 gap-4">
        <n-button
          v-for="item in optons"
          class="px-3 py-6 shadow-sm w-[100px]"
          :type="item.checked ? 'primary' : ''"
          ghost
          @click="selectPrice(item)"
        >
          <div>
            <p class="mb-1">{{ item.price }} 元</p>
            <p>{{ item.price * 100 }} 火币</p>
          </div>
        </n-button>
        <!-- <n-button class="px-3 py-6 shadow-sm">
          <span>10元</span>
        </n-button>
        <n-button class="px-3 py-6 shadow-sm">
          <span>20元</span>
        </n-button>
        <n-button class="px-3 py-6 shadow-sm">
          <span>50元</span>
        </n-button>
        <n-button class="px-3 py-6 shadow-sm">
          <span>100元</span>
        </n-button>
        <n-button class="px-3 py-6 shadow-sm">
          <span>500元</span>
        </n-button>
        <n-button class="px-3 py-6 shadow-sm">
          <span>1000元</span>
        </n-button> -->
        <n-button class="px-3 py-6 shadow-sm">
          <span>其他</span>
        </n-button>
      </div>
    </div>
    <div class="flex mt-4">
      <span class="text-zinc-400">支付方式：</span>
      <n-button class="px-3 py-6 shadow-sm" type="primary" ghost>
        <span>微信</span>
        <template #icon>
          <img src="@/assets/wx.png" />
        </template>
      </n-button>
    </div>
    <n-button class="mt-4 shadow-sm w-full" type="primary" @click="pay">
      确认支付
    </n-button>
  </div>
</template>

<script setup>
import { ref } from "vue"
// import * as wx from 'path/to/wxjsapi'; // 引入微信JS-SDK

const balance = ref("0.00") // 余额显示
const rechargeAmount = ref("") // 充值金额输入
const success = ref(false) // 支付成功标记
const error = ref(false) // 支付失败标记

const optons = ref([
  { price: 1, checked: true },
  { price: 10, checked: false },
  { price: 20, checked: false },
  { price: 50, checked: false },
  { price: 100, checked: false },
  { price: 500, checked: false },
  { price: 1000, checked: false },
])

const selectPrice = (item) => {
  optons.value.forEach((item) => {
    item.checked = false
  })
  item.checked = true
}
// 配置微信JS-SDK
// wx.config({
//   appId: "your-app-id", // 必填，公众号的唯一标识
//   timestamp: "your-timestamp", // 必填，生成签名的时间戳
//   nonceStr: "your-nonceStr", // 必填，生成签名的随机串
//   signature: "your-signature", // 必填，签名
//   jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表
// })
// // 判断当前客户端是否支持微信支付
// wx.checkJsApi({
//   jsApiList: ["chooseWXPay"],
//   success(res) {
//     if (res.checkResult.chooseWXPay) {
//       // 发起支付请求
//       wx.chooseWXPay({
//         timeStamp: "your-timeStamp",
//         nonceStr: "your-nonceStr",
//         package: "prepay_id=your-prepayId", // 必填，需要使用prepay_id才能发起支付
//         signType: "MD5", // 必填，签名类型，默认为MD5
//         paySign: "your-paySign", // 必填，签名
//         success() {
//           success.value = true
//           error.value = false
//         },
//         fail() {
//           success.value = false
//           error.value = true
//         },
//       })
//     } else {
//       alert("您的设备不支持微信支付")
//     }
//   },
// })
// 发起充值
const recharge = async () => {
  try {
    // 在这里调用后端接口获取预支付ID
    // const prepayId = await getPrepayId();
    // 使用prepayId发起支付
    // wx.chooseWXPay({
    //   ...
    //   package: `prepay_id=${prepayId}`,
    //   ...
    // });
  } catch (e) {
    console.error(e)
    error.value = true
    success.value = false
  }
}

const pay = () => {
  const item = optons.value.find((item) => item.checked)
  console.log(item)
}
</script>

<style>
/* 添加相应的CSS样式 */
</style>
