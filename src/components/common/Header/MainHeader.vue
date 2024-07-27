<template>
  <div id="header" ref="headerRef" :class="{ top:  getActiveSection === 0 && windowWidth >= 1161,on: isMenuOpen }">
    <!-- inner -->
    <div class="inner">
      <h1><router-link to="/">ROOMEN</router-link></h1>
      <div class="gnb" :style="{ right: isMenuOpen ? '0' : '-100%' }">
        <div class="menu">
          <ul>
            <template v-for="(route, index) in filteredRoutes" :key="index">
              <li v-if="!route.meta?.notGnb" :class="route.meta?.class ? route.meta.class : ''">
                <template v-if="!route.children">
                  <router-link :to="route.path ? route.path : ''" :class="route.children ? 'hasChild' : ''">{{ route.name }}</router-link>
                </template>
                <template v-else>
                  <button type="button" @click.prevent="toggleBtnIdx(index)" :class="{'curr' : !closed[index]}">{{ route.name }}</button>
                </template>
                <!-- 2단계 메뉴 렌더링 -->
                <ul v-if="route.children">
                  <template v-for="(childRoute, childIndex) in route.children" :key="childIndex">
                    <li v-if="!childRoute.meta?.notGnb">
                      <router-link :to="childRoute.path">{{ childRoute.name }}</router-link>
                    </li>
                  </template>
                </ul>
              </li>
            </template>
          </ul>
        </div>
        <div class="util">
<!--          notGnb: true, utils: true-->
<!--          <template v-for="(util, idx) in utils" :key="idx"><router-link :to="util.path" :class="util?.meta?.class ? util.meta.class : ''">{{util.name}}</router-link></template>-->
          <template v-if="!isAuthenticated">
            <router-link :to="loginItem?.path" :class="loginItem?.meta?.class ? loginItem.meta.class : ''">{{ loginItem?.name }}</router-link>
          </template>
          <template
              v-if="isAuthenticated && cartItem && myPageItem"
          >
            <router-link :to="cartItem.path" :class="cartItem?.meta?.class ? cartItem.meta.class : ''">{{ cartItem?.name }}</router-link>
            <LogOut />
            <router-link :to="myPageItem.path" :class="myPageItem?.meta?.class ? myPageItem.meta.class : ''">{{ myPageItem?.name }}</router-link>
          </template>
        </div>
            <Languages/>
            <SnsList/>
      </div>
      <button type="button" class="btnMenu" @click="toggleMenu"><em><span class="hide">{{ isMenuOpen ? '메뉴 닫기' : '메뉴 열기' }}</span></em></button>
    </div>
    <!--// inner -->
  </div>
</template>
<script setup lang="ts">
import Languages from '@/components/common/lang.vue'
import { useRoute } from "vue-router";
const route = useRoute();
import { useMainStore } from "@/stores/mainPage";
import { useUserStore } from '@/mocks/stores/loginStores';
// const userStore = useUserStore();
import { storeToRefs } from "pinia";
import {watchEffect, ref, onMounted, watch, onBeforeUnmount, onBeforeMount, computed} from "vue";
import LogOut from '@/components/common/logoutBtn.vue'
import SnsList from "@/components/common/snsList.vue";

const { isAuthenticated } = storeToRefs(useUserStore());
const { getActiveSection } = storeToRefs(useMainStore());



const windowWidth = ref<number>(0);
const headerRef = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);
// const windowWidth = ref<number>(window.innerWidth);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log('isMenuOpen',isMenuOpen.value)
};
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
onBeforeMount(()=>{
  window.addEventListener('resize', handleResize);
})
onMounted(() => {
  window.addEventListener('resize', handleResize);
  if (window.innerWidth > 1160) {
    console.log('onPc');
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
})
watch(getActiveSection,(e)=> {
  console.log('getActiveSection',e)
},{
  immediate: true
})
watchEffect(() => {
  console.log('isAuthenticated',isAuthenticated);
  console.log('windowWidth',windowWidth.value)
  windowWidth.value = window.innerWidth;
});
// 2단계 깊이의 라우트만 필터링
const filteredRoutes = route.matched[0].children
    .filter(child => !child.meta?.notGnb);
const utils = route.matched[0].children
    .filter(child => child.meta?.utils)
const loginItem = computed(()=>{
  return utils.find(item=> item.path === '/login')

})
const cartItem = computed(()=>{
  return utils.find(item=> item.path === '/cart')
})
const myPageItem = computed(()=>{
  return utils.find(item=> item.path === '/mypage')
})
const closed = ref(Array(filteredRoutes.length).fill(true));
const toggleBtnIdx = (index: number) => {
  for (let i = 0; i < closed.value.length; i++) {
    if (i !== index) {
      closed.value[i] = true;
    }
  }
  closed.value[index] = !closed.value[index];
};


</script>


<style scoped>
</style>
