<template>
  <div
    id="fullpage"
    ref="onFullPage"
    @wheel="handleMouseWheel"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div class="quick" :class="quickNavClass">
      <ul>
        <li
          v-for="(section, index) in sections"
          :key="index"
          class="menu-point"
          :class="{ on: activeSection === index }"
          @click="scrollToSection(index)"
        >
          <span class="dp-block blind-text">{{ section }} {{ index + 1 }}</span>
        </li>
      </ul>
    </div>

    <!-- 섹션1 -->
    <section :ref="sections[0]" class="fullsection full1"></section>
    <!-- //섹션1 -->
    <!-- 섹션2 -->
    <section :ref="sections[1]" class="fullsection full2">
      <div class="inner">
        <!-- productSlider -->
        <div class="productSlider">
          <swiper
            ref="main2WrapSwiper"
            :slides-per-view="1"
            :effect="'fade'"
            :loop="true"
            :speed="800"
            :modules="[Navigation, Pagination, EffectFade]"
            :observer="true"
            :observe-parents="true"
            :pagination="{
              el: '._productPaging',
              clickable: true
            }"
            :navigation="{
              enabled: true,
              nextEl: '._productPrev',
              prevEl: '._productNext'
            }"
            @slide-change-transition-start="handleSwiperState(true)"
            @slide-change-transition-end="handleSwiperState(false)"
          >
            <swiper-slide v-for="(pallete, index) in mainPalleteImage" :key="index">
              <div class="sliderTit txtC">
                <strong>{{ pallete.name }}</strong>
                <p>다양한 색 조합으로 나만의 개성을 담은 데스크를 만들어 보세요.</p>
              </div>
              <div class="item">
                <div class="colorChse left">
                  <ul>
                    <li
                      v-for="(item, idx) in leftColors"
                      :key="idx"
                      :class="[item.class, { curr: idx === leftCurr }]"
                    >
                      <a href="javascript:void(0)" @click="changeColor(item.value, 'left', idx)">
                        <span class="hide">{{ item.label }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <!-- detailSlider -->
                <div class="detailSlider">
                  <swiper
                    :slides-per-view="1"
                    :space-between="150"
                    :modules="[Navigation]"
                    :navigation="true"
                  >
                    <swiper-slide v-for="(item, idx) in pallete.items" :key="idx">
                      <picture>
                        <img
                          :src="`${getImageUrl(item.path)}`"
                          :alt="`${item.name}+ 이미지 입니다.`"
                          :style="getColor"
                          class="width-auto"
                        />
                      </picture>
                    </swiper-slide>
                  </swiper>
                </div>
                <!--// detailSlider -->
                <div class="colorChse right">
                  <ul>
                    <li
                      v-for="(item, idx) in rightColors"
                      :key="idx"
                      :class="[item.class, { curr: idx === rightCurr }]"
                    >
                      <a href="javascript:void(0)" @click="changeColor(item.value, 'right', idx)">
                        <span class="hide">{{ item.label }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </swiper-slide>
            <div class="swiperBtn">
              <button class="_productPrev">Prev</button>
              <button class="_productNext">Next</button>
            </div>
            <div class="swiperPaging">
              <span class="_productPaging">1</span>
            </div>
          </swiper>
        </div>

        <!--// productSlider -->
        <div class="shopBtn txtC">
          <button type="button" class="btn bgBlack sL w270"><span>SHOP NOW</span></button>
        </div>
      </div>
    </section>
    <!-- //섹션2 -->
    <!-- 섹션3 -->
    <section :ref="sections[2]" class="fullsection full3">
      <div class="inner">
        <h2>GALLERY</h2>
        <!-- gallSlider -->
        <div class="gallSlider">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <!-- inGallSlider -->
              <swiper
                :slides-per-view="1"
                :space-between="150"
                :modules="[Navigation]"
                :navigation="true"
                class="inGallSlider"
              >
                <swiper-slide>
                  <picture><img src="@/assets/images/img-gallery01.jpg" alt="" /></picture>
                  <strong>MMM STUDIO</strong>
                </swiper-slide>
                <swiper-slide>
                  <picture><img src="@/assets/images/img-gallery01.jpg" alt="" /></picture>
                  <strong>MMM STUDIO 2</strong>
                </swiper-slide>
                <swiper-slide>
                  <picture><img src="@/assets/images/img-gallery01.jpg" alt="" /></picture>
                  <strong>MMM STUDIO 3</strong>
                </swiper-slide>
              </swiper>
              <!--// inGallSlider -->
            </div>
            <div class="swiper-slide">
              <picture><img src="@/assets/images/img-gallery04.png" alt="" /></picture>
              <strong>MMM STUDIO</strong>
            </div>
            <div class="swiper-slide">
              <picture><img src="@/assets/images/img-gallery05.jpg" alt="" /></picture>
              <strong>MMM STUDIO 2</strong>
            </div>
            <div class="swiper-slide">
              <picture><img src="@/assets/images/img-gallery06.jpg" alt="" /></picture>
              <strong>MMM STUDIO 3</strong>
            </div>
          </div>
        </div>
        <!--// gallSlider -->
      </div>
    </section>
    <!-- //섹션3 -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, type Ref } from 'vue'
// Configs
function getImageUrl(name: string) {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}
import { mainPallete, mainPalleteImage } from '@/configs/sidePallete'
const leftColors = computed(() => {
  return mainPallete.left
})
const rightColors = computed(() => {
  return mainPallete.right
})
const leftCurr = ref<number>(1)
const rightCurr = ref<number>(1)

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/swiper-bundle.css'
// Composable
import { useFullPage } from '@/composables/useFullPageEvent'
const main2WrapSwiper = ref<SwiperInstance | null>(null)
// FullPage
const onFullPage = ref<HTMLElement | null>(null)
// Sections
const sections: Ref<HTMLElement | null>[] = [
  ref<HTMLElement | null>(null),
  ref<HTMLElement | null>(null),
  ref<HTMLElement | null>(null)
]
const {
  scrollToSection,
  activeSection,
  // handleMouseWheelDOM,
  quickNavClass,
  handleMouseWheel,
  touchStart,
  handleSwiperState,
  touchMove,
  touchEnd
} = useFullPage(sections)
onMounted(() => {})
onUnmounted(() => {})
const previewColor = ref<string>('000000')
const getColor = computed(() => ({
  filter: `opacity(0.5) drop-shadow(0 0 0 #${previewColor.value})`
}))
const changeColor = (p1: string, p2: string, p3: number) => {
  previewColor.value = p1
  if (p2 === 'left') {
    leftCurr.value = p3
  } else if (p2 === 'right') {
    rightCurr.value = p3
  }
}
</script>
<style scoped>
.dp-block {
  display: inline-block;
  text-indent: -9999px;
}
.detailSlider::v-deep .swiper-button-prev:after,
.detailSlider::v-deep .swiper-button-next:after {
  display: none;
}
.detailSlider {
  overflow: auto;
  overscroll-behavior: contain;

  @media (max-width: 1160px) {
    overflow: auto;
    overscroll-behavior: contain;
    touch-action: pan-x !important;
  }
}
html,
body {
  overflow-y: hidden;
}
</style>
