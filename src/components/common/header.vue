<template>
  <div id="header" ref="headerRef"  :class="{ top: getActiveSection === 0 || windowWidth >= 1161,on: isMenuOpen }">
    <!-- inner -->
    <div class="inner">
      <h1><router-link to="/">ROOMEN</router-link></h1>
      <div class="gnb" :style="{ right: isMenuOpen ? '0' : '-100%' }">
        <div class="menu">
          <ul>
            <template v-for="(route, index) in filteredRoutes" :key="index">
              <li v-if="!route.meta?.notGnb" :class="route.meta?.class ? route.meta.class : ''">
                <router-link :to="route.path ? route.path : ''">{{ route.name }}</router-link>
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
          <template v-for="(util, idx) in utils" :key="idx"><router-link :to="util.path" :class="util?.meta?.class ? util.meta.class : ''">{{util.name}}</router-link></template>
        </div>
<!--        <div class="lang">-->
<!--          <a href="" class="curr">KR</a>-->
<!--          <a href="">EN</a>-->
<!--        </div>-->
            <Languages/>
        <a href="https://www.instagram.com/jible_studio/" class="insta"><span class="hide">인스타그램</span></a>
      </div>
      <button type="button" class="btnMenu" @click="toggleMenu"><em><span class="hide">{{ isMenuOpen ? '메뉴 닫기' : '메뉴 열기' }}</span></em></button>
    </div>
    <!--// inner -->
  </div>
</template>
<script setup lang="ts">
import Languages from '@components/common/lang.vue'
import {useRoute} from "vue-router";
const route = useRoute();
import { useMainStore } from "@/stores/mainPage";
import { storeToRefs } from "pinia";
import {watchEffect, ref, onMounted, onBeforeMount} from "vue";
const { getActiveSection } = storeToRefs(useMainStore());

const windowWidth = ref<number>(0);
const headerRef = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);
// const windowWidth = ref<number>(window.innerWidth);
//
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log('isMenuOpen',isMenuOpen.value)
};
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  // if (windowWidth < 1161) {
  //
  // }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);

  if (window.innerWidth < 1161) {
    const menuLinks = headerRef.value?.querySelectorAll('.menu > ul > li > a');
    if (menuLinks) {
      menuLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const ulHeight = (link.nextElementSibling as HTMLElement)?.clientHeight;
          if (link.classList.contains('curr')) {
            link.classList.remove('curr');
            (link.nextElementSibling as HTMLElement)!.style.height = '0';
          } else {
            menuLinks.forEach((otherLink: Element) => {
              if (otherLink !== link) {
                otherLink.classList.remove('curr');
                (otherLink.nextElementSibling as HTMLElement)!.style.height = '0';
              }
            });
            link.classList.add('curr');
            (link.nextElementSibling as HTMLElement)!.style.height = `${ulHeight}px`;
          }
        });
      });
    }
  }
});
onBeforeMount(() => {
  window.removeEventListener('resize', handleResize);
})

watchEffect(() => {
  console.log('activeSectionRef:', getActiveSection.value);
});
// 2단계 깊이의 라우트만 필터링
const filteredRoutes = route.matched[0].children
    .filter(child => !child.meta?.notGnb);
const utils = route.matched[0].children
    .filter(child => child.meta?.utils)



</script>


<style scoped></style>
