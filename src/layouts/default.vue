<template>
  <SkipComponent/>
  <SubHeaderComponent />
  <slot></slot>
  <FooterComponent/>
</template>

<script lang="ts" setup>
import SubHeaderComponent from '@/components/common/Header/SubHeader.vue'
import SkipComponent from '@/components/common/skip.vue'
import FooterComponent from '@/components/common/footer.vue'
</script>