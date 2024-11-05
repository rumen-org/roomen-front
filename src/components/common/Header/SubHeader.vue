<template>
  <div
    id="header"
    ref="headerRef"
    :class="{ top: windowWidth < 1161 || routePath === '/about', on: isMenuOpen }"
  >
    <!-- inner -->
    <div class="inner">
      <h1><router-link to="/">ROOMEN</router-link></h1>
      <div class="gnb" :style="{ right: isMenuOpen ? '0' : '-100%' }">
        <div class="menu">
          <ul>
            <template v-for="(filteredRoute, index) in filteredRoutes" :key="index">
              <li
                v-if="!filteredRoute.meta?.notGnb"
                :class="filteredRoute.meta?.class ? filteredRoute.meta?.class : ''"
              >
                <template v-if="!filteredRoute.children">
                  <router-link
                    :to="filteredRoute.path ? filteredRoute.path : ''"
                    :class="filteredRoute.children ? 'hasChild' : ''"
                    @click="mobileToggleMenu('single')"
                    >{{ filteredRoute.name }}</router-link
                  >
                </template>
                <template v-else>
                  <button
                    type="button"
                    :class="{
                      curr: !closed[index]
                    }"
                    @click.prevent="toggleBtnIdx(index)"
                  >
                    {{ filteredRoute.name }}
                  </button>
                </template>
                <!-- 2단계 메뉴 렌더링 -->
                <ul v-if="filteredRoute.children">
                  <template
                    v-for="(childRoute, childIndex) in filteredRoute.children"
                    :key="childIndex"
                  >
                    <li v-if="!childRoute.meta?.notGnb" :key="childIndex">
                      <router-link :to="childRoute.path" @click="mobileToggleMenu">{{
                        childRoute.name
                      }}</router-link>
                    </li>
                  </template>
                </ul>
              </li>
            </template>
          </ul>
        </div>
        <div class="util">
          <template v-if="!isAuth && loginItem?.name">
            <router-link
              :to="loginItem?.path || '/'"
              :class="[
                route.path.includes(loginItem.name as string) ? 'nav-active' : '',
                loginItem?.meta?.class ? loginItem.meta.class : ''
              ]"
              @click="mobileToggleMenu('single')"
              >{{ loginItem?.name }}</router-link
            >
          </template>
          <template v-if="isAuth">
            <router-link
              :to="cartItem?.path || '/'"
              :class="cartItem?.meta?.class ? cartItem.meta.class : ''"
              @click="mobileToggleMenu('single')"
              >{{ cartItem?.name }}</router-link
            >
            <LogOut />
            <router-link
              :to="myPageItem?.path || '/'"
              :class="myPageItem?.meta?.class ? myPageItem.meta.class : ''"
              @click="mobileToggleMenu('single')"
              >{{ myPageItem?.name }}</router-link
            >
          </template>
        </div>
        <Languages />
        <SnsList />
      </div>
      <button type="button" class="btnMenu" @click="toggleMenu">
        <em
          ><span class="hide">{{ isMenuOpen ? '메뉴 닫기' : '메뉴 열기' }}</span></em
        >
      </button>
    </div>
    <!--// inner -->
  </div>
</template>
<script setup lang="ts">
// Components
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import LogOut from '@/components/common/logoutBtn.vue'
import Languages from '@/components/common/lang.vue'
import SnsList from '@/components/common/snsList.vue'
// Route
import { useRoute } from 'vue-router'
const route = useRoute()
const routePath = computed(() => {
  return route.path
})
// Composable
import { useUserStore } from '@/stores/loginStores'
import { storeToRefs } from 'pinia'

// Auth
const { isAuthenticated } = storeToRefs(useUserStore())
const isAuth = computed(() => {
  return isAuthenticated.value
})

const windowWidth = ref<number>(0)
const isMobile = ref<boolean>(false)

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value < 1161) {
    isMobile.value = true
  } else if (windowWidth.value > 1160) {
    isMobile.value = false
  }
}
const headerRef = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
// const windowWidth = ref<number>(window.innerWidth);
const mobileToggleMenu = (p?: string | null) => {
  if (p === 'single') {
    closed.value = Array(filteredRoutes.length).fill(true)
  }
  if (windowWidth.value < 1161) {
    toggleMenu()
  }
}
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  console.log('isMenuOpen', isMenuOpen.value)
}

// 2단계 깊이의 라우트만 필터링
const filteredRoutes = route.matched[0].children.filter(child => !child.meta?.notGnb)
const utils = route.matched[0].children.filter(child => child.meta?.utils)
const loginItem = computed(() => {
  return utils.find(item => item.path === '/login')
})
const cartItem = computed(() => {
  return utils.find(item => item.path === '/cart')
})
const myPageItem = computed(() => {
  return utils.find(item => item.path === '/mypage')
})
const closed = ref(Array(filteredRoutes.length).fill(true))
const toggleBtnIdx = (index: number) => {
  for (let i = 0; i < closed.value.length; i++) {
    if (i !== index) {
      closed.value[i] = true
    }
  }
  // Toggle the clicked button
  closed.value[index] = !closed.value[index]
}
onMounted(() => {
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    userStore.checkTokenValidity() // 페이지 로드 시 토큰 유효성 확인
  }
  handleResize()
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped></style>
