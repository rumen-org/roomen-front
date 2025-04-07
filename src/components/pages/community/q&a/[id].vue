<template>
  <tr v-if="props.answer" class="bg-gray">
    <td></td>
    <td class="m-none"></td>
    <td class="txt-l subject">
      <div class="contents-detail">
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
