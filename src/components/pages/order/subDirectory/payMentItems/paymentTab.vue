<template>
  <ul class="w100per">
    <li v-for="(item, i) in props.items" :key="i" :class="{ curr: i === activeItem - 1 }">
      <button @click="getContents(i, item.path)">{{ item.name }}</button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
interface Tab {
  name: string
  path: string
}
// Props
const props = defineProps<{
  items: Tab[]
}>()
// Emits
const emit = defineEmits(['send:value'])
const activeItem = ref<number>(1)

const getContents = (i: number, path: string) => {
  activeItem.value = i + 1
  emit('send:value', path)
}
</script>
