<template>
  <SkipComponent />
  <HeaderComponent />
  <slot></slot>
  <FooterComponent />
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/common/Header/MainHeader.vue'
import FooterComponent from '@/components/common/footer.vue'
import SkipComponent from '@/components/common/skip.vue'
</script>
