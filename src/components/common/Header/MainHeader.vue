<template>
  <div
    id="header"
    ref="headerRef"
    :class="{ top: getActiveSection === 0 && windowWidth >= 1161, on: isMenuOpen }"
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
                :class="filteredRoute.meta?.class ? filteredRoute.meta.class : ''"
              >
                <template v-if="!filteredRoute.children">
                  <router-link
                    :to="filteredRoute.path ? filteredRoute.path : ''"
                    :class="filteredRoute.children ? 'hasChild' : ''"
                    @click="mobileToggleMenu"
                    >{{ filteredRoute.name }}</router-link
                  >
                </template>
                <template v-else>
                  <button
                    type="button"
                    :class="{ curr: !closed[index] }"
                    @click.prevent="toggleBtnIdx(index)"
                  >
                    {{ filteredRoute.name }}
                  </button>
                </template>
                <!-- 2단계 메뉴 렌더링 -->
                <ul v-if="filteredRoute.children">
                  <template v-for="(childRoute, childIndex) in filteredRoute.children">
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
          <template v-if="!isAuth">
            <router-link
              :to="loginItem?.path || '/'"
              :class="loginItem?.meta?.class ? loginItem.meta.class : ''"
              @click="mobileToggleMenu"
              >{{ loginItem?.name }}</router-link
            >
          </template>
          <template v-if="isAuth && cartItem && myPageItem">
            <router-link
              :to="cartItem.path"
              :class="cartItem?.meta?.class ? cartItem.meta.class : ''"
              @click="mobileToggleMenu"
              >{{ cartItem?.name }}</router-link
            >
            <LogOut />
            <router-link
              :to="myPageItem.path"
              :class="myPageItem?.meta?.class ? myPageItem.meta.class : ''"
              @click="mobileToggleMenu"
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
import { debounce } from 'lodash'

import Languages from '@/components/common/lang.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useMainStore } from '@/stores/mainPage'
import { useUserStore } from '@/stores/loginStores'
import { useWindowResponsive } from '@/stores/windowResponsive'
// const userStore = useUserStore();
import { storeToRefs } from 'pinia'
import { ref, onMounted, onBeforeUnmount, onBeforeMount, computed } from 'vue'
import LogOut from '@/components/common/logoutBtn.vue'
import SnsList from '@/components/common/snsList.vue'

const { isAuthenticated } = storeToRefs(useUserStore())
const { getActiveSection } = storeToRefs(useMainStore())
const winWidthStore = useWindowResponsive()
const { windowState } = storeToRefs(winWidthStore)
const isAuth = computed(() => {
  return isAuthenticated.value
})

const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)
const headerRef = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
const mobileToggleMenu = () => {
  if (windowWidth.value < 1161) {
    toggleMenu()
  }
}
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const handleResize = debounce(() => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  winWidthStore.setWidthValue(windowWidth.value)
  winWidthStore.setHeightValue(windowHeight.value)
  if (windowWidth.value < 1161) {
    winWidthStore.setWindowState('mobile')
  } else if (windowWidth.value > 1161) {
    winWidthStore.setWindowState('desktop')
  }
}, 200)

onBeforeMount(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onMounted(() => {
  window.addEventListener('resize', handleResize)
  const userStore = useUserStore()
  if (userStore.isAuthenticated) {
    userStore.checkTokenValidity() // 페이지 로드 시 토큰 유효성 확인
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

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
  closed.value[index] = !closed.value[index]
}
</script>

<style scoped></style>
