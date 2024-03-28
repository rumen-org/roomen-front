<template>
  <SkipComponent/>
  <HeaderComponent />
  <router-view></router-view>
  <FooterComponent/>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/common/header.vue'
import SkipComponent from '@/components/common/skip.vue'
import FooterComponent from '@/components/common/footer.vue'
</script>