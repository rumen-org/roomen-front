<template>
  <div>
    {{ route }}
    test
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = computed(() => {
  return useRoute().params.item;
})
const thisLocation = useRoute();
console.log('this_location',thisLocation)
console.log('useRoute();',useRoute())
console.log('route',route)
onMounted( async () => {
  console.log('useRoute();',useRoute())
})
</script>