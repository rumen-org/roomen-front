<template>
  <div id="header" :class="{ top: getActiveSection === 0 }">
    <!-- inner -->
    <div class="inner">
      <h1><router-link to="/">ROOMEN</router-link></h1>
      <div class="gnb">
        <div class="menu">
          <ul>
            <template v-for="(route, index) in filteredRoutes" :key="index">
              <li v-if="!route.meta?.notGnb" :class="route.meta?.class ? route.meta.class : ''">
                <router-link :to="route.path">{{ route.name }}</router-link>
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
        <div class="lang">
          <a href="" class="curr">KR</a>
          <a href="">EN</a>
        </div>
        <a href="" class="insta"><span class="hide">인스타그램</span></a>
      </div>
      <button type="button" class="btnMenu"><em><span class="hide">메뉴 열기</span></em></button>
    </div>
    <!--// inner -->
  </div>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
const route = useRoute();
import { useMainStore } from "@/stores/mainPage";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
const { getActiveSection } = storeToRefs(useMainStore());

watchEffect(() => {
  console.log('activeSectionRef:', getActiveSection.value);
});
// 2단계 깊이의 라우트만 필터링
const filteredRoutes = route.matched[0].children
    .filter(child => !child.meta?.notGnb);
const utils = route.matched[0].children
    .filter(child => child.meta?.utils)
</script>