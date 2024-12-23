<template>
  <div class="conBlock center">
    <span class="checkbox">
      <input id="chk0501" v-model="isCorrect" type="checkbox" />
      <label for="chk0501">결제정보를 확인하였으며, 구매진행에 동의합니다.</label>
    </span>
    <button type="button" class="btn sL w290" @click="checkCustomer">
      ₩ <em>{{ formatPrice(getPrice) }}</em> 결제하기
    </button>
    <Alert />
  </div>
</template>
<script lang="ts" setup>
// Component
import Alert from '@/components/notifications/alert.vue'
// Composable
import { usePayments } from '@/composables/usePayment'
const { setBuyerInfo, requestPay } = usePayments()
import { formatPrice } from '@/composables/useCalculate'
import { useAlert } from '@/composables/useAlert'
const { showAlert } = useAlert()

// Stores
import { useBucketStore } from '@/stores/bucket'
import { usePaymentStore } from '@/stores/payments'
const bucketStore = useBucketStore()
const paymentStore = usePaymentStore()
const { getPrice } = storeToRefs(bucketStore)
const { getCustomer, paymentType } = storeToRefs(paymentStore)
// Models
import { Items } from '@/models/interfaces/Order'
import type { PaymentType } from '@/models/type/typeList'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
const props = defineProps<{
  itemInfo: Items | null
}>()
const emits = defineEmits(['update'])
const paymentData = computed(() => {
  return props?.itemInfo
})

const isCorrect = ref<boolean>(false)
const checkCustomer = () => {
  emits('update', 'paying')
  if (!isCorrect.value) {
    showAlert('동의에 체크하셔야 됩니다.')
    return
  }
  setBuyerInfo(
    getCustomer.value.email,
    getCustomer.value.name,
    getCustomer.value.tel,
    getCustomer.value.addr,
    getCustomer.value.postcode
  )
  const method = paymentType.value
  console.log('method', method)
  handlePayment(method as PaymentType)
}
const handlePayment = async (method: PaymentType) => {
  try {
    if (paymentData.value?.name != null) {
      // 실제 배포시에는 amount에 getPrice.value를 넣어야한다.
      const response = await requestPay(1, paymentData.value?.name, method, 'AO09C')
      console.log('', getPrice.value)
      console.log('Payment successful:', response)
    }
    await submitPayment()
  } catch (error) {
    emits('update', 'waiting')
    console.error('Payment failed:', error)
    showAlert('결제가 취소 되었습니다.')
  }
}
// Router
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const router = useRouter()

const submitPayment = async () => {
  await router.push('/order/complete')
}

onMounted(() => {
  bucketStore.loadItemsFromStorage()
})
onBeforeUnmount(() => {
  paymentStore.initPaymentType()
})
</script>
