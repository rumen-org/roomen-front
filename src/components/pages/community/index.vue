<template>
  <router-view :key="$route.fullPath"></router-view>
<!--  <router-view :key="fullPath"></router-view>-->
</template>

<script setup lang="ts">
// import { useRoute} from 'vue-router'
// import {computed} from "vue";
// const route = useRoute();
// const fullPath = computed(()=>{
//   return route.fullPath
// })

</script>