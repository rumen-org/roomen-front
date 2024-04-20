<template>
  <div id="fullpage" ref="onFullpage">
    <div class="quick" :class="activeSection != 0  ? 'themeBk' : ''">
      <ul>
        <li class="menu-point" v-bind:class="{on: activeSection == index}" v-on:click="scrollToSection(index)" v-for="(offset, index) in offsets" v-bind:key="index" ></li>
      </ul>
    </div>
    <section class="fullsection full1"></section>
    <section class="fullsection full2"><span>2 PAGE</span></section>
    <section class="fullsection full3"><span>3 PAGE</span></section>
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
</script>

<style scoped>
#fullpage {position:relative; top:0; z-index:9; width:100%; height:100%; }
#fullpage span {display:block; position:absolute; top:50%; left:50%; font-weight:bold; font-size:4em; transform:translate(-50%,-50%)}
.fullsection {position:relative; width:100%; height:100%; min-height: 100vh;}
.full1 {background:url("@/assets/images/img-visual.jpg")no-repeat center / auto}
.full2 {background:#fff}
.full2 span {color:#000}
.full3 {background:rgba(230, 230, 230, 1)}
.quick {position:fixed; right:20px; top:50%; transform:translateY(-50%); z-index:9999}
.quick li {margin-bottom:10px; width:10px; height:10px; border-radius:15px; border:2px solid #fff; cursor:pointer}
.quick .on {background:#fff}
.quick.themeBk li {border-color: #000;}
.quick.themeBk .on {background: #000;}
</style>