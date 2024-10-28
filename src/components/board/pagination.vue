<!-- components/common/Pagination.vue -->
<template>
  <div class="paging">
    <button
      type="button"
      class="btnPrev"
      :class="{ disabled: isPrevDisabled }"
      @click="$emit('changePage', 'prev')"
    >
      이전 페이지
    </button>

    <span
      v-for="(item, idx) in totalPages"
      :key="idx"
      class="paging-number"
      :class="{ active: currentPage === idx }"
      @click.prevent="$emit('changePage', 'go', idx)"
    >
      {{ item + 1 }}
    </span>

    <button
      type="button"
      class="btnNext"
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

const isPrevDisabled = computed(() => props?.currentPage <= 0)
const isNextDisabled = computed(() => props?.currentPage >= props?.totalPages.length - 1)
</script>
