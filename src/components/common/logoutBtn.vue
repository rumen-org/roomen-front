<template>
  <button class="" @click="logout">LOGOUT</button>
</template>
<script setup lang="ts">
import { useUserStore } from '@/mocks/stores/loginStores';
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const logout = () => {
  userStore.logout()
  if (router.currentRoute.value.path === '/') {
    window.location.reload();
  } else {
    router.push('/');
  }
}
</script>