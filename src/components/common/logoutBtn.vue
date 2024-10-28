<template>
  <button @click="logout">LOGOUT</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/loginStores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
  try {
    userStore.logout()
    // 로그아웃 후 루트 페이지로 리다이렉트
    if (router.currentRoute.value.path === '/') {
      // 현재 경로가 루트일 경우 페이지를 새로 고침
      await router.replace('/')
    } else {
      // 현재 경로가 루트가 아닐 경우 루트 페이지로 리다이렉트
      await router.push('/')
    }
  } catch (error) {
    console.error('로그아웃 실패:', error)
    // 로그아웃 실패 시 사용자에게 알림
    alert('로그아웃 실패: ' + (error || '알 수 없는 오류'))
  }
}
</script>
