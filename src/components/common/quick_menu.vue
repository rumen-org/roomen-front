<template>
  <div class="quick" :class="quickNavClass">
    <ul>
      <li
        v-for="(section, index) in sections"
        :key="index"
        class="menu-point"
        :class="{ on: activeSection === index }"
        @click="sendEmits(index)"
      >
        <span class="dp-block blind-text">{{ section }} {{ index + 1 }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

defineProps<{
  sections: Ref<HTMLElement | null>[]
  quickNavClass: string | null
  activeSection: number
}>()
const emits = defineEmits(['update:value'])
const sendEmits = (i: number) => {
  emits('update:value', i)
}
</script>
