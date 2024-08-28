<template>
    <div class="payment p-4 w-full w-max">
      <h3 class="text-xl mb-4">账户总览</h3>
      <div>
        <span class="label">账户余额：</span>
        <span class="">{{ userStore.account.token }} 火币</span>
      </div>
      <n-divider />
      <h3 class="text-xl my-4">账户充值</h3>
      <div class="flex">
        <span class="label">支付金额：</span>
        <div class="grid grid-cols-4 gap-4">
          <n-button
            v-for="item in packages"
            class="px-3 py-6 shadow-sm w-[100px]"
            :type="item.checked ? 'primary' : ''"
            ghost
            @click="selectPrice(item)"
          >
            <div>
              <p class="mb-1">{{ item.amount }} 元</p>
              <p>{{ item.quantity }}火币</p>
            </div>
          </n-button>
          <!-- <n-button class="px-3 py-6 shadow-sm">
            <span>其他</span>
          </n-button> -->
        </div>
      </div>
      <div class="flex mt-4" v-if="currentPackage">
        <span class="label">总计：</span>
        <span
          >{{ total }} ({{ currentPackage.quantity }} +
          {{ currentPackage.give }}赠送)</span
        >
      </div>
      <div class="flex mt-4">
        <span class="label">支付方式：</span>
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
      <PayPopup ref="payPopupRef"></PayPopup>
</template>

<script setup>
import { ref } from "vue"
import { useUserStore } from "@/stores"
import { usePay } from "./usePay"
import PayPopup from './PayPopup.vue'

const userStore = useUserStore()
const { payPopupRef, total, currentPackage, packages, initAccount, pay, selectPrice } = usePay()
</script>

<style lang="scss" scoped>
.label {
  width: 80px;
  display: inline-block;
  color: rgb(161 161 170);
}
</style>
