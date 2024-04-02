<template>
  <div id="fullpage">
    <div class="quick">
      <ul>
        <li class="menu-point" v-bind:class="{on: activeSection == index}" v-on:click="scrollToSection(index)" v-for="(offset, index) in offsets" v-bind:key="index" ></li>
      </ul>
    </div>
    <section class="fullsection full1" pageNum="1"></section>
    <section class="fullsection full2" pageNum="2"><span>2 PAGE</span></section>
    <section class="fullsection full3" pageNum="3"><span>3 PAGE</span></section>
  </div>

</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted, watchEffect} from 'vue';

import {useMainStore} from "@/stores/mainPage";
const inMove = ref(false);
const inMoveDelay = 400;
const activeSection = ref(0);
const offsets = ref([]);
let touchStartY = 0;
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

const handleMouseWheel = (e) => {
  if (e.deltaY < 0 && !inMove.value) {
    moveDown();
  } else if (e.deltaY > 0 && !inMove.value) {
    moveUp();
  }

  e.preventDefault();
  return false;
};

const handleMouseWheelDOM = (e) => {
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

const scrollToSection = (id, force = false) => {
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

const touchStart = (e) => {
  e.preventDefault();

  touchStartY = e.touches[0].clientY;
};

const touchMove = (e) => {
  if (inMove.value) return false;
  e.preventDefault();

  const currentY = e.touches[0].clientY;

  if (touchStartY < currentY) {
    moveDown();
  } else {
    moveUp();
  }

  touchStartY = 0;
  return false;
};
watchEffect(() => {
  setActiveSection(activeSection.value);
});
onMounted(() => {
  setActiveSection(activeSection.value);
  calculateSectionOffsets();

  window.addEventListener('DOMMouseScroll', handleMouseWheelDOM); // Mozilla Firefox
  window.addEventListener('mousewheel', handleMouseWheel, { passive: false }); // Other browsers

  window.addEventListener('touchstart', touchStart, { passive: false }); // mobile devices
  window.addEventListener('touchmove', touchMove, { passive: false }); // mobile devices
});

onUnmounted(() => {
  window.removeEventListener('DOMMouseScroll', handleMouseWheelDOM); // Mozilla Firefox
  window.removeEventListener('mousewheel', handleMouseWheel, { passive: false }); // Other browsers

  window.removeEventListener('touchstart', touchStart); // mobile devices
  window.removeEventListener('touchmove', touchMove); // mobile devices
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
</style>