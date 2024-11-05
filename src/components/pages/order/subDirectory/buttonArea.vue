<template>
  <div class="conBlock center">
    <span class="checkbox">
      <input id="chk0501" type="checkbox" />
      <label for="chk0501">결제정보를 확인하였으며, 구매진행에 동의합니다.</label>
    </span>
    <button type="button" class="btn sL w290" @click="() => handlePayment('card')">
      ₩ <em>{{ formatPrice(getPrice) }}</em> 결제하기
    </button>
  </div>
</template>
<script lang="ts" setup>
import { usePayments } from '@/composables/usePayment'

const { requestPay } = usePayments()

const handlePayment = async (method: 'card' | 'trans' | 'vbank' | 'phone') => {
  try {
    const response = await requestPay(1004, '당근 10kg', method)
    console.log('Payment successful:', response)
    await submitPayment()
  } catch (error) {
    console.error('Payment failed:', error)
  }
}
// Router
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const router = useRouter()
// Stores
import { useBucketStore } from '@/stores/bucket'
const bucketStore = useBucketStore()
const { getPrice } = storeToRefs(bucketStore)
// Composable
import { formatPrice } from '@/composables/calculate'

const submitPayment = async () => {
  await router.push('/order/complete')
}

onMounted(() => {
  bucketStore.loadItemsFromStorage()
})
</script>
