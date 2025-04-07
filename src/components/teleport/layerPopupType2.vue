<template>
  <div v-if="isOpen" class="layer w700">
    <div ref="popupRef">
      <slot name="type2Layer" />
      <a href="javascript:void(0);" class="m-close"><span class="hide">닫기</span></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineModel } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { ref } from 'vue'
const isOpen = defineModel<boolean>('isOpen', { required: true })
const popupRef = ref<HTMLElement | null>(null)
useClickOutside(popupRef, () => {
  if (isOpen.value && popupRef.value) {
    isOpen.value = false
  }
})
</script>
