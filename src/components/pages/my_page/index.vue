<template>
  <!--  <router-view :key="$route.fullPath"></router-view>-->
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.fullPath === '/mypage') {
    router.replace('/mypage/purchaseHistory')
  }
})
</script>
