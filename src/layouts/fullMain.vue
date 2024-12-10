<template>
  <SkipComponent />
  <HeaderComponent />
  <slot></slot>
  <FooterComponent />
</template>
<script setup lang="ts">
// Components
import HeaderComponent from '@/components/common/Header/MainHeader.vue'
import FooterComponent from '@/components/common/footer.vue'
import SkipComponent from '@/components/common/skip.vue'
// Meta
import { useHead } from '@unhead/vue'
useHead({
  title: '루멘 | 가치를 만드는 회사',
  meta: [
    { name: 'charset', content: () => 'UTF-8' },
    { name: 'viewport', content: () => 'width=device-width, initial-scale=1, user-scalable=no' },
    { name: 'description', content: () => '당신의 공간엔 당신의 가치를.' },
    { name: 'og:title', content: '루멘 | 가치를 만드는 회사' },
    { name: 'og:description', content: '당신의 공간엔 당신의 가치를.' },
    {
      name: 'og:image',
      content: () => 'https://thunderous-creponne-c05035.netlify.app/assets/favicon-cuZUg_HZ.ico'
    },
    { name: 'og:url', content: 'https://thunderous-creponne-c05035.netlify.app/' },
    { name: 'og:type', content: 'website' }
  ]
})
</script>
