<template>
  <tr class="bgGray answer">
    <td></td>
    <td></td>
    <td class="txtL subject" v-html="props.itemBox.answerContents">
    </td>
    <td>{{ itemBox.adminName }}</td>
    <td>{{ itemBox.answerDtm }}</td>
  </tr>
</template>


<script setup lang="ts">
import {useRoute} from 'vue-router'
const routes = useRoute().params
console.log('routes',routes)
interface items {
  number: number,
  id: string,
  type: string,
  title: string,
  private: string,
  password: string,
  regUser: string,
  regDtm: string,
  content: string,
  answerYn: string,
  answerContents: string,
  adminName: string,
  answerDtm: string
}
const props = defineProps<{ itemId: string, itemBox: items }>();

</script>