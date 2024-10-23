<template>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script setup lang="ts">
import { onMounted} from "vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


// 추후 mypage의 DashBoard 추가 가능성 고려하여 index에서 replace 경로처리함.
onMounted(() => {
  if (route.path === '/mypage') {
    router.replace('/mypage/orders');
  }
})
</script>
