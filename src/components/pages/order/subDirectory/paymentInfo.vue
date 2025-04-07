<template>
  <dl class="section-title mt-70">
    <dt>결제 정보</dt>
    <dd><span class="blind">제목 하단 선</span></dd>
  </dl>
  <!-- tab-area -->
  <div class="tab-area topLine mt-30">
    <PaymentTab :items="tabs" @send:value="getContents" />
    <div class="tab-contents">
      <component :is="currentComponents"></component>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
// Components
import PaymentTab from '@/components/pages/order/subDirectory/payMentItems/paymentTab.vue'
import withoutPassBook from '@/components/pages/order/subDirectory/payMentItems/withoutPassBook.vue'
import useCard from '@/components/pages/order/subDirectory/payMentItems/useCard.vue'
import takeBankTransfer from '@/components/pages/order/subDirectory/payMentItems/takeBankTransfer.vue'
// Config
import { payment } from '@/configs/tabs'
const tabs = computed(() => {
  return payment
})
const componentsMap: Record<string, unknown> = {
  withoutPassBook: withoutPassBook,
  useCard: useCard,
  takeBankTransfer: takeBankTransfer
}
const current = ref<string>('withoutPassBook')
const getContents = (p: string) => {
  current.value = p
}
const currentComponents = computed(() => {
  return componentsMap[current.value]
})
</script>
