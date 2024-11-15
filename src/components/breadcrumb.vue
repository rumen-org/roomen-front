<template>
  <h2>{{ getBreadcrumbs }}</h2>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
console.log('route', route)
const getBreadcrumbs = computed(() => {
  const segments = route.fullPath.split('/')
  return segments[2] ? segments[2].toUpperCase() : segments[3] ? segments[3].toUpperCase() : ''
})
</script>
