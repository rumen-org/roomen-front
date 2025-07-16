<template>
  <div id="container">
    <div class="contents">
      <!-- contents-top-area -->
      <div class="contents-top-area mV2">
        <BackButton />
        <h2 class="ko">주문서</h2>
        <!-- <em>{{ t('messages.text1') }}</em>-->
      </div>
      <!--// contents-top-area -->
      <Products @update="sendItem" />
      <Delivery :call-info="payState" />
      <Payments />
      <Accept :item-info="itemValue" @update="getPayState" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Components
import Products from '@/components/pages/order/subDirectory/productInfo.vue'
import Delivery from '@/components/pages/order/subDirectory/deliveryInfo.vue'
import Payments from '@/components/pages/order/subDirectory/paymentInfo.vue'
import Accept from '@/components/pages/order/subDirectory/buttonArea.vue'
// Models
import type { Items } from '@/models/interfaces/Order'
import type { PayState } from '@/models/type/typeList'
import BackButton from '@components/button/backButton.vue'

const itemValue = ref<Items | null>(null)
const payState = ref<PayState>('waiting')
const getPayState = (p: PayState) => {
  payState.value = p
  console.log('onEmits')
}
const sendItem = (p: Items) => {
  itemValue.value = p
  console.log('p', p)
}
</script>
