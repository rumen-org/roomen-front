<template>
  <div id="container">
    <div class="contents">
      <Products />
      <Delivery />
      <Payments />
      <Accept />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Components
import Products from '@/components/pages/order/subDirectory/productInfo.vue'
import Delivery from '@/components/pages/order/subDirectory/deliveryInfo.vue'
import Payments from '@/components/pages/order/subDirectory/paymentInfo.vue'
import Accept from '@/components/pages/order/subDirectory/buttonArea.vue'
</script>
