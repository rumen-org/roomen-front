<template>
  <div class="sorting">
    <ul>
      <li v-for="(item, idx) in items" :key="idx" :class="{ curr: currState === idx }">
        <button type="button" @click="getSort(item.sortValue, idx)">{{ item.sortLabel }}</button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
type SortType = {
  sortValue: string
  sortLabel: string
}

// props와 기본값 설정
withDefaults(
  defineProps<{
    items: SortType[] // items는 SortType의 배열
  }>(),
  {}
)

const emits = defineEmits(['update:value'])

const currState = ref<number>(0)

const getSort = (item: any, i: number) => {
  currState.value = i
  emits('update:value', item)
}
</script>
