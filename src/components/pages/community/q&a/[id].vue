<template>
  <tr v-if="props.content && props.adminName" class="bgGray answer">
    <td></td>
    <td></td>
    <td class="conDetail">{{ props.content }}</td>
    <td>{{ props.adminName }}</td>
    <td>{{ formatDate(props.answerDtm) }}</td>
  </tr>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';
interface AnswerComponentProps {
  adminName: string; // 추가한 속성
  answerDtm: string; // 추가한 속성
  content: string;
}
const props = defineProps<AnswerComponentProps>();
const formatDate = (value: string) => {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  return `${date.getFullYear().toString().slice(2,4)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}
</script>

<style scoped>
.conDetail {display: block; overflow: hidden; width: 100%; padding: 3rem 0; font-weight: 300;}
.conDetail img {display: block;}
</style>