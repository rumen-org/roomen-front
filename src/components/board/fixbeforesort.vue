<template>
  <div class="sorting">
    <ul>
      <li :class="{ curr: props.sortBy == 'latest' }">
        <button type="button" @click="sortByLatest">최신 순</button>
      </li>
      <li :class="{ curr: props.sortBy == 'oldest' }">
        <button type="button" @click="sortByOldest">오래된 순</button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  sortBy: String
})
const emits = defineEmits(['update:sortBy'])
const sortByLatest = () => {
  emits('update:sortBy', 'latest')
}
const sortByOldest = () => {
  emits('update:sortBy', 'oldest')
}
</script>
