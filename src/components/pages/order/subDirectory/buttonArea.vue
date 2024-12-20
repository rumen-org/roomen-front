<template>
  <div class="conBlock center">
    <span class="checkbox">
      <input id="chk0501" type="checkbox" />
      <label for="chk0501">결제정보를 확인하였으며, 구매진행에 동의합니다.</label>
    </span>
    <button type="button" class="btn sL w290" @click="() => handlePayment('card')">
      ₩ <em>{{ formatPrice(getPrice) }}</em> 결제하기
    </button>

    {{ paymentData }}
  </div>
</template>
<script lang="ts" setup>
import { usePayments } from '@/composables/usePayment'
import { Items } from '@/models/interfaces/Order'
const { requestPay } = usePayments()

import { computed, onMounted } from 'vue'
const props = defineProps<{
  itemInfo: Items | null
}>()
const paymentData = computed(() => {
  return props?.itemInfo
})
const handlePayment = async (method: 'card' | 'trans' | 'vbank' | 'phone') => {
  try {
    if (paymentData.value?.name != null) {
      const response = await requestPay(getPrice.value, paymentData.value?.name, method)
      console.log('Payment successful:', response)
    }
    await submitPayment()
  } catch (error) {
    console.error('Payment failed:', error)
  }
}
// Router
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const router = useRouter()
// Stores
import { useBucketStore } from '@/stores/bucket'
const bucketStore = useBucketStore()
const { getPrice } = storeToRefs(bucketStore)
// Composable
import { formatPrice } from '@/composables/useCalculate'

const submitPayment = async () => {
  await router.push('/order/complete')
}

onMounted(() => {
  bucketStore.loadItemsFromStorage()
})
</script>
