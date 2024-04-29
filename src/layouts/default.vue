<template>
  <SkipComponent/>
  <div id="wrap" :class="route.path ? routePath : ''">
    <SubHeaderComponent />
    <slot></slot>
    <FooterComponent/>
  </div>

</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import SubHeaderComponent from '@/components/common/Header/SubHeader.vue'
import SkipComponent from '@/components/common/skip.vue'
import FooterComponent from '@/components/common/footer.vue'
import {computed, ref, watchEffect} from "vue";
const route = useRoute()
const routePath = ref<string>('')
watchEffect(()=>{
  routePath.value = route.path.replace(/^\/+/, '');
})
const heightGetter = computed<number>(()=> {return window.outerHeight;
})
// const getBrowserHeight = ref<number>(heightGetter.value);
console.log('route',route.path,heightGetter)
</script>