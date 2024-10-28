<template>
  <tr v-if="isEmpty">
    <td :colspan="colSpans" class="text-center">검색 결과가 없습니다.</td>
  </tr>
  <slot v-else name="notEmpty"> </slot>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  searchValue: {
    type: String,
    default: ''
  },
  searchResultLength: {
    type: Number,
    default: 0
  },
  colSpans: {
    type: Number,
    default: 3
  }
})

const isEmpty = computed(() => {
  return props?.searchValue?.length > 0 && props?.searchResultLength === 0
})
</script>
