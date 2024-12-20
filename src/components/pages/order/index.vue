<template>
  <div id="container">
    <div class="contents">
      <Products @update="sendItem" />
      <Delivery />
      <Payments />
      <Accept :item-info="itemValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const itemValue = ref<Items | null>(null)
const sendItem = (p: Items) => {
  itemValue.value = p
  console.log('p', p)
}
// Components
import Products from '@/components/pages/order/subDirectory/productInfo.vue'
import Delivery from '@/components/pages/order/subDirectory/deliveryInfo.vue'
import Payments from '@/components/pages/order/subDirectory/paymentInfo.vue'
import Accept from '@/components/pages/order/subDirectory/buttonArea.vue'
import type { Items } from '@/models/interfaces/Order'
</script>
