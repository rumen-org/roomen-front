<template>
  <button type="button" class="scrollTop" @click="scrollToTop"><span class="hide">위로 이동</span></button>
  <div id="footer">
    <div class="inner">
      <p><a href=""><span class="hide">ROOMEN</span></a></p>
      <a href="https://www.instagram.com/jible_studio/" class="insta"><span class="hide">인스타그램</span></a>
      <div>
        <div>
          <span>대표 : <em>김준영</em></span>
          <span>010-3583-9144</span>
          <span>jyk719@gmail.com</span>
        </div>
        <div>
          <address>서울시 양천구 목동로29길 16 로데오휘버스</address>
          <span>사업자등록번호 <em>111-11-11111</em></span>
          <span>통신판매신고번호 <em>제2024-00-0000호</em></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  const scrollTop = ref(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onScroll = () => {
    scrollTop.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>