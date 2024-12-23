<template>
  <ul class="w100per">
    <li v-for="(item, i) in props.items" :key="i" :class="{ curr: i === activeItem - 1 }">
      <button @click="getContents(i, item.path, item.type)">{{ item.name }}</button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Tab } from '@/models/interfaces/Payment'

// Stores
import { usePaymentStore } from '@/stores/payments'
const paymentStore = usePaymentStore()
// Props
const props = defineProps<{
  items: Tab[]
}>()
// Models
import type { PaymentType } from '@/models/type/typeList'
// Emits
const emit = defineEmits(['send:value'])
const activeItem = ref<number>(1)

const getContents = (i: number, path: string, type: PaymentType) => {
  activeItem.value = i + 1
  emit('send:value', path)
  paymentStore.setPaymentType(type)
  console.log('path', path, 'Stores:', paymentStore.$state.paymentType)
}
</script>
