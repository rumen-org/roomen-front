<template>
    <button type="button" class="scrollTop" @click="scrollToTop"><span class="hide">위로 이동</span></button>
  </template>
  <script setup lang="ts">
    import {ref} from 'vue';

    const scrollTop = ref(0);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  </script>