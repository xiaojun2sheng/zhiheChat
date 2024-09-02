import { ref, onMounted, computed } from "vue"
import { useUser } from "@/hooks/useUser"
import { getAccountPackage } from "@/api/pay"
import { usePayment } from "@/hooks/usePayment"
// import * as wx from 'path/to/wxjsapi'; // 引入微信JS-SDK
import QRCode from "qrcode"

export const usePay = () => {
  const { initAccount } = useUser()
  const { createOrderById } = usePayment()

  const success = ref(false) // 支付成功标记
  const error = ref(false) // 支付失败标记

  const currentPackage = computed(() =>
    packages.value.find((item) => item.checked)
  )
  const total = computed(() => {
    return currentPackage.value
      ? currentPackage.value.quantity + currentPackage.value.give
      : 0
  })

  const selectPrice = (item) => {
    packages.value.forEach((item) => {
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

  const payPopupRef = ref()
  const pay = async () => {
    const { url } = await createOrderById(currentPackage.value.id)
    payPopupRef.value.show({
      url,
      order: currentPackage.value,
    })
  }

  const packages = ref([])
  const initAccountPackage = async () => {
    packages.value = await getAccountPackage()
    packages.value[0].checked = true
  }

  onMounted(() => {
    initAccount()
    initAccountPackage()
  })

  return {
    total,
    payPopupRef,
    packages,
    currentPackage,
    pay,
    initAccount,
    selectPrice,
  }
}
