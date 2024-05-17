<template>
  <div id="fullpage" ref="onFullpage">
    <div class="quick" :class="activeSection != 0  ? 'themeBk' : ''">
      <ul>
        <li class="menu-point" v-bind:class="{on: activeSection == index}" v-on:click="scrollToSection(index)" v-for="(offset, index) in offsets" v-bind:key="index" ></li>
      </ul>
    </div>
    <section class="fullsection full1"></section>
    <section class="fullsection full2">
      <div class="inner">
        <!-- productSlider -->
        <div class="productSlider">
          <swiper
            :slides-per-view="1"
            @swiper="productSlider"
            :effect="'fade'"
            navigation
          >
            <swiper-slide>
              <div class="sliderTit txtC">
                  <strong ref="strongRef">MIDI DESK</strong>
                  <p>다양한 색 조합으로 나만의 개성을 담은 데스크를 만들어 보세요.</p>
              </div>
              <div class="item">
                  <div class="colorChse left">
                      <ul>
                          <li class="curr cWhite"><a href=""><span class="hide">화이트</span></a></li>
                          <li class="cBlack"><a href=""><span class="hide">블랙</span></a></li>
                          <li class="cGray"><a href=""><span class="hide">그레이</span></a></li>
                          <li class="cBrown"><a href=""><span class="hide">브라운</span></a></li>
                          <li class="cRed"><a href=""><span class="hide">레드</span></a></li>
                          <li class="cYellow"><a href=""><span class="hide">옐로우</span></a></li>
                          <li class="cBeige"><a href=""><span class="hide">베이지</span></a></li>
                          <li class="cBlue"><a href=""><span class="hide">블루</span></a></li>
                          <li class="cGreen"><a href=""><span class="hide">그린</span></a></li>
                          <li class="cPurple"><a href=""><span class="hide">퍼블</span></a></li>
                      </ul>
                  </div>
                  <!-- detailSlider -->
                  <div class="detailSlider" ref="detailSliderRef">
                    <swiper
                    :slides-per-view="1"
                    :spaceBetween="150"
                    @swiper="detailSlider"
                    navigation
                    pagination
                  >
                    <swiper-slide>
                          <picture><img src="@/assets/images/img-product.png" alt=""></picture>
                    </swiper-slide>
                    <swiper-slide>
                      <picture><img src="@/assets/images/img-product.png" alt=""></picture>
                    </swiper-slide>
                    <swiper-slide>
                        <picture><img src="@/assets/images/img-product.png" alt=""></picture>
                    </swiper-slide>
                  </swiper>
                  </div>
                  <!--// detailSlider -->
                  <div class="colorChse right">
                      <ul>
                          <li class="curr cBlack"><a href=""><span class="hide">블랙</span></a></li>
                          <li class="cWhite"><a href=""><span class="hide">화이트</span></a></li>
                          <li class="cGray"><a href=""><span class="hide">그레이</span></a></li>
                          <li class="cBrown"><a href=""><span class="hide">브라운</span></a></li>
                          <li class="cRed"><a href=""><span class="hide">레드</span></a></li>
                          <li class="cYellow"><a href=""><span class="hide">옐로우</span></a></li>
                          <li class="cBeige"><a href=""><span class="hide">베이지</span></a></li>
                          <li class="cBlue"><a href=""><span class="hide">블루</span></a></li>
                          <li class="cGreen"><a href=""><span class="hide">그린</span></a></li>
                          <li class="cPurple"><a href=""><span class="hide">퍼블</span></a></li>
                      </ul>
                  </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="sliderTit txtC">
                  <strong ref="strongRef">MIDI DESK</strong>
                  <p>다양한 색 조합으로 나만의 개성을 담은 데스크를 만들어 보세요.</p>
              </div>
              <div class="item">
                  <div class="colorChse left">
                      <ul>
                          <li class="curr cWhite"><a href=""><span class="hide">화이트</span></a></li>
                          <li class="cBlack"><a href=""><span class="hide">블랙</span></a></li>
                          <li class="cGray"><a href=""><span class="hide">그레이</span></a></li>
                          <li class="cBrown"><a href=""><span class="hide">브라운</span></a></li>
                          <li class="cRed"><a href=""><span class="hide">레드</span></a></li>
                          <li class="cYellow"><a href=""><span class="hide">옐로우</span></a></li>
                          <li class="cBeige"><a href=""><span class="hide">베이지</span></a></li>
                          <li class="cBlue"><a href=""><span class="hide">블루</span></a></li>
                          <li class="cGreen"><a href=""><span class="hide">그린</span></a></li>
                          <li class="cPurple"><a href=""><span class="hide">퍼블</span></a></li>
                      </ul>
                  </div>
                  <!-- detailSlider -->
                  <div class="detailSlider" ref="detailSliderRef">
                    <swiper
                      :slides-per-view="1"
                      :spaceBetween="150"
                      @swiper="detailSlider"
                      navigation
                      pagination
                    >
                      <swiper-slide>
                            <picture><img src="@/assets/images/img-product.png" alt=""></picture>
                      </swiper-slide>
                      <swiper-slide>
                        <picture><img src="@/assets/images/img-product.png" alt=""></picture>
                      </swiper-slide>
                      <swiper-slide>
                          <picture><img src="@/assets/images/img-product.png" alt=""></picture>
                      </swiper-slide>
                    </swiper>
                  </div>
                  <!--// detailSlider -->
                  <div class="colorChse right">
                      <ul>
                          <li class="curr cBlack"><a href=""><span class="hide">블랙</span></a></li>
                          <li class="cWhite"><a href=""><span class="hide">화이트</span></a></li>
                          <li class="cGray"><a href=""><span class="hide">그레이</span></a></li>
                          <li class="cBrown"><a href=""><span class="hide">브라운</span></a></li>
                          <li class="cRed"><a href=""><span class="hide">레드</span></a></li>
                          <li class="cYellow"><a href=""><span class="hide">옐로우</span></a></li>
                          <li class="cBeige"><a href=""><span class="hide">베이지</span></a></li>
                          <li class="cBlue"><a href=""><span class="hide">블루</span></a></li>
                          <li class="cGreen"><a href=""><span class="hide">그린</span></a></li>
                          <li class="cPurple"><a href=""><span class="hide">퍼블</span></a></li>
                      </ul>
                  </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <!--// productSlider -->
        <div class="shopBtn txtC">
          <button type="button" class="btn bgBlack sL w270"><span>SHOP NOW</span></button>
        </div>
      </div>
    </section>
    <section class="fullsection full3">
      <div class="inner">
        <h2>GALLERY</h2>
        <!-- gallSlider -->
        <div class="gallSlider">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <!-- inGallSlider -->
                    <swiper
                      :slides-per-view="1"
                      @swiper="inGallSlider"
                      navigation
                      class="inGallSlider"
                    >
                      <swiper-slide>
                          <picture><img src="@/assets/images/img-gallery01.jpg" alt=""></picture>
                          <strong>MMM STUDIO</strong>
                      </swiper-slide>
                      <swiper-slide>
                          <picture><img src="@/assets/images/img-gallery01.jpg" alt=""></picture>
                          <strong>MMM STUDIO 2</strong>
                      </swiper-slide>
                      <swiper-slide>
                          <picture><img src="@/assets/images/img-gallery01.jpg" alt=""></picture>
                          <strong>MMM STUDIO 3</strong>
                      </swiper-slide>
                    </swiper>
                    <!--// inGallSlider -->
                </div>
                <div class="swiper-slide">
                    <a href="">
                        <picture><img src="@/assets/images/img-gallery04.png" alt=""></picture>
                        <strong>SAN HOUSE</strong>
                    </a>
                </div>
                <div class="swiper-slide">
                    <a href="">
                        <picture><img src="@/assets/images/img-gallery05.jpg" alt=""></picture>
                        <strong>JIBLE STUDIO</strong>
                    </a>
                </div>
                <div class="swiper-slide">
                    <a href="">
                        <picture><img src="@/assets/images/img-gallery06.jpg" alt=""></picture>
                        <strong>SINSUNG CHURCH</strong>
                    </a>
                </div>
            </div>
        </div>
        <!--// gallSlider -->
    </div>
    </section>
  </div>

</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted, watchEffect} from 'vue';

import {useMainStore} from "@/stores/mainPage";
const inMove = ref(false);
const inMoveDelay = 400;
const activeSection = ref(0);
const offsets = ref<number[]>([]);
let touchStartY = 0;
let lastScrollTime = 0;
let touchMoveDetected = false;

const onFullpage = ref<HTMLElement | null>(null);
// const {activeValue} = storeToRefs(useMainStore)
const { setActiveSection } = useMainStore();
const calculateSectionOffsets = () => {
  const sections = document.getElementsByTagName('section');
  const length = sections.length;

  for (let i = 0; i < length; i++) {
    const sectionOffset = sections[i].offsetTop;
    offsets.value.push(sectionOffset);
  }
};

const handleMouseWheel = (evt: Event) => {
  const e = evt as WheelEvent;
  const currentTime = new Date().getTime();
  if (currentTime - lastScrollTime < 500) {
    // 500ms 이내에 다음 스크롤 이벤트를 무시합니다.
    return false;
  }

  if (e.deltaY < 0 && !inMove.value) {
    moveDown();
  } else if (e.deltaY > 0 && !inMove.value) {
    moveUp();
  }

  e.preventDefault();
  return false;
};

const handleMouseWheelDOM = (evt: Event) => {
  const e = evt as WheelEvent;
  const currentTime = new Date().getTime();

  if (currentTime - lastScrollTime < 500) {
    // 500ms 이내에 다음 스크롤 이벤트를 무시합니다.
    return false;
  }
  if (e.detail > 0 && !inMove.value) {
    moveUp();
  } else if (e.detail < 0 && !inMove.value) {
    moveDown();
  }

  return false;
};

const moveDown = () => {
  inMove.value = true;
  activeSection.value--;

  if (activeSection.value < 0) activeSection.value = offsets.value.length - 1;

  scrollToSection(activeSection.value, true);
};

const moveUp = () => {
  inMove.value = true;
  activeSection.value++;

  if (activeSection.value > offsets.value.length - 1) activeSection.value = 0;

  scrollToSection(activeSection.value, true);
};

const scrollToSection = (id: number, force = false) => {
  if (inMove.value && !force) return false;

  activeSection.value = id;
  inMove.value = true;

  // get section and scroll into view if it exists
  const section = document.getElementsByTagName('section')[id];
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    inMove.value = false;
  }, inMoveDelay);
};

const touchStart = (evt: Event) => {
  const e = evt as TouchEvent;
  touchMoveDetected = false
  // e.preventDefault();
  if (e.cancelable) {
    e.preventDefault();
    console.log('cancelable')
  }
  console.log('touchMoveDetectedOnStart', touchMoveDetected)
  touchStartY = e.touches[0].clientY;
  return false;
};

const touchMove = (evt: Event) => {
  const e = evt as TouchEvent;
  if (inMove.value) return false;
  const currentY = e.touches[0].clientY;
  const swipeUp = touchStartY > currentY;
  const swipeDown = touchStartY < currentY;
  const isScrolling = Math.abs(currentY - touchStartY) > 1; // 스크롤 방지 거리 조정

  if (isScrolling) {
    touchMoveDetected = true;
    if (!e.cancelable) {
      e.preventDefault();
    }
    if (swipeUp) {
      moveUp();
      console.log('moveUp')
    } else if (swipeDown) {
      moveDown();
      console.log('moveDown')
    }
  }
  console.log('touchMoveDetectedOnMove', touchMoveDetected)
  touchStartY = 0;

  return false;

};
const touchEnd = (evt: Event) => {
  const e = evt as TouchEvent;

  if (!touchMoveDetected) {
    // If no scrolling detected, prevent the click event
    e.stopPropagation();
  }
  const touchEndY = e.changedTouches[0].clientY;
  const touchDeltaY = Math.abs(touchStartY - touchEndY);

  // 일정 거리 이내에서 터치를 시작했고, 시간이 너무 오래 걸리지 않았다면 클릭으로 처리
  if (touchDeltaY < 20) {
    e.stopPropagation();
  }
  console.log('touchMoveDetectedOnEnd', touchMoveDetected)
};


watchEffect(() => {
  setActiveSection(activeSection.value);
});
onMounted(() => {
  // setActiveSection(activeSection.value);
  calculateSectionOffsets();
  const tags = document.querySelector('#fullpage');
  tags?.addEventListener('DOMMouseScroll', handleMouseWheelDOM as EventListener);
  tags?.addEventListener('mousewheel', handleMouseWheel as EventListener, { passive: false });
  tags?.addEventListener('touchstart', touchStart as EventListener, { passive: false });
  tags?.addEventListener('touchmove', touchMove as EventListener, { passive: false });
  tags?.addEventListener('touchend', touchEnd as EventListener, { passive: false });

});

onUnmounted(() => {
  const tags = document.querySelector('#fullpage');
  tags?.removeEventListener('DOMMouseScroll', handleMouseWheelDOM); // Mozilla Firefox
  tags?.removeEventListener('mousewheel', handleMouseWheel); // Other browsers
  tags?.removeEventListener('touchstart', touchStart); // mobile devices
  tags?.removeEventListener('touchmove', touchMove); // mobile devices
  tags?.removeEventListener('touchend', touchEnd); // mobile devices


});

// section3 inner slider
import { Navigation, Pagination, EffectFade } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css'; 

const windowWidth = ref<number>(0);
const detailSliderRef = ref<HTMLElement | null>(null);
const strongRef = ref(0);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  console.log(strongRef.value.offsetWidth)
  // titWidthRef.value.style.width = `${titWidth}px`;
});
// watchEffect(() => {
//   console.log(titWidth.clientWidth);
// });

</script>
