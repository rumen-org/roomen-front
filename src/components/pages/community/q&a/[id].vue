<template>
  <tr v-if="props.answer" class="bgGray">
    <td></td>
    <td class="mNone"></td>
    <td class="txtL subject">
      <div class="conDetail">
        <p>{{ answer.content }}</p>
      </div>
    </td>
    <td>{{ answer.author }}</td>
    <td>{{ formatDate(answer.createdDate) }}</td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { propsType } from '@/models/interfaces/Qna'
const props = defineProps<{ answer: propsType }>()
// Composable
import { useFormatDate } from '@/composables/useDateType'
const { formatDate } = useFormatDate()
</script>

<style scoped>
.conDetail {
  display: block;
  overflow: hidden;
  width: 100%;
  font-weight: 300;
  text-align: left;
  padding: 10px 5px;
  height: 60px;
  font-size: 16px;
}
.conDetail img {
  display: block;
}
</style>
