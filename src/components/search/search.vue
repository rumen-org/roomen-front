<template>
  <div class="search-area">
    <input v-model="searchValue" type="text" title="검색" @keyup.enter="onSearch" />
    <button type="button" class="srchBtn" @click="onSearch">
      <span class="hide">검색하기</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{ searchValue: string }>()
const emits = defineEmits(['update:searchValue', 'search'])

const searchValue = ref(props.searchValue) // 입력 값 유지

const onSearch = () => {
  emits('update:searchValue', searchValue.value) // 부모 컴포넌트에 검색어 전달
  emits('search') // 검색 이벤트 발생
}
</script>
