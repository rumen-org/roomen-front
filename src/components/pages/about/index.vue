<template>
  <div id="container">
    <div class="inner">
      <div class="aboutVisual" :style="{height: heightGetter+'px' ? heightGetter+'px' : ''}">
        <img src="@/assets/images/img-about-visual.png" alt="루멘_배경이미지">
        <div>
          <p class="aniOne"><img class="logoImg" src="@/assets/images/logo.png" alt=""></p>
          <strong class="ko aniTwo">당신의 공간엔 당신의 가치를.</strong>
          <p class="ko aniThree">루멘은 가구의 가치를 뛰어넘는 미디데스크 전문 브랜드입니다.<br/>고객님의 개성과 가치가 공간에도 고스란히 담길 수 있기를 바랍니다.</p>
          <strong class="eng aniFour">Your value in your space.</strong>
          <p class="eng aniFive">Roomen is a midi table brand that goes beyond the value of furniture.<br/> We hope that your personality and values ​​can be fully reflected in your space.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

const heightGetter = computed<number>(()=> {return window.outerHeight;})
</script>
<style lang="scss" scoped>
.aboutVisual > img {height: 100%;}
</style>