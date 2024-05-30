<template>
    <div class="srchArea">
      <input type="text" title="검색" v-show="windowWidth >= 768">
      <button type="button" class="srchBtn" @click="showMobileSearch">
        <span class="hide">검색하기</span>
      </button>
    </div>

    <div class="mSrchArea" v-show="windowWidth < 768" :style="{ display: isMobileSearchOpen ? 'block' : 'none' }">
      <div>
        <button type="button" class="srchBtn">
          <span class="hide">검색하기</span>
        </button>
        <input type="text" title="검색" placeholder="검색">
        <button type="button" class="srchClose" @click="hideMobileSearch">
          <span class="hide">검색 닫기</span>
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const windowWidth = ref(window.innerWidth);
    const isMobileSearchOpen = ref(false);

    const handleResize = () => {
    windowWidth.value = window.innerWidth;
    };

    const showMobileSearch = () => {
    isMobileSearchOpen.value = true;
    };

    const hideMobileSearch = () => {
    isMobileSearchOpen.value = false;
    };

    onMounted(() => {
    window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    });
</script>