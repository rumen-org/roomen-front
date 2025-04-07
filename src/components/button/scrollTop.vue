<template>
  <button type="button" class="scroll-top" @click="scrollToTop">
    <span class="hide">위로 이동</span>
  </button>
</template>
<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
