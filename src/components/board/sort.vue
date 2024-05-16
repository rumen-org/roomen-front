<template>
  <div class="sorting">
    <ul>
      <li :class="{ 'curr': props.sortBy == 'latest' }"><button @click="sortByLatest" type="button">최신 순</button></li>
      <li :class="{ 'curr': props.sortBy == 'oldest' }"><button @click="sortByOldest" type="button">오래된 순</button></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  sortBy: String
});
const emits = defineEmits(['update:sortBy']);
const sortByLatest = () => {
  emits('update:sortBy', 'latest');
};
const sortByOldest = () => {
  emits('update:sortBy', 'oldest');
};
</script>