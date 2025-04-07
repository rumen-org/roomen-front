<!-- components/common/Pagination.vue -->
<template>
  <div class="paging">
    <button
      type="button"
      class="btn-prev"
      :class="{ disabled: isPrevDisabled }"
      @click="$emit('changePage', 'prev')"
    >
      이전 페이지
    </button>

    <span
      v-for="(item, idx) in visiblePages"
      :key="idx"
      class="paging-number"
      :class="{ active: currentPage === idx }"
      @click.prevent="$emit('changePage', 'go', idx)"
    >
      {{ item + 1 }}
    </span>

    <button
      type="button"
      class="btn-next"
      :class="{ disabled: isNextDisabled }"
      @click="$emit('changePage', 'next')"
    >
      다음 페이지
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

// Props 받아서 페이징 상태 관리
const props = defineProps<{
  currentPage: number
  totalPages: number[]
}>()
const visiblePages = computed(() => {
  const total = props.totalPages.length
  const maxPages = 5
  // 전체 페이지가 5 이하일 때는 전체 페이지 반환
  if (total <= maxPages) return props.totalPages
  const half = Math.floor(maxPages / 2)
  let start = Math.max(0, props.currentPage - half)
  let end = start + maxPages
  // 마지막 부분 처리
  if (end > total) {
    end = total
    start = end - maxPages
  }
  return props.totalPages.slice(start, end)
})
const isPrevDisabled = computed(() => props?.currentPage <= 0)
const isNextDisabled = computed(() => props?.currentPage >= props?.totalPages.length - 1)
</script>
