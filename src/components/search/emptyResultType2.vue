<template>
  <div v-if="isEmpty">
    <h3 class="text-center">검색 결과가 없습니다.</h3>
  </div>
  <slot v-else name="notEmpty2"></slot>
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
  }
})

const isEmpty = computed(() => {
  return props?.searchValue?.length > 0 && props?.searchResultLength === 0
})
</script>
