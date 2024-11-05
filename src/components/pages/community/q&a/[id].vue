<template>
  <tr v-if="props.answer" class="bgGray answer">
    <td></td>
    <td class="mNone"></td>
    <td class="conDetail">{{ answer.content }}</td>
    <td>{{ answer.author }}</td>
    <td>{{ formatDate(answer.createdDate) }}</td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface propsType {
  author: string
  createdDate: string
  content: string
}
const props = defineProps<{ answer: propsType }>()
const formatDate = (value: string) => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return `${date.getFullYear().toString().slice(2, 4)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
}
</script>

<style scoped>
.conDetail {
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 3rem 0;
  font-weight: 300;
}
.conDetail img {
  display: block;
}
</style>
