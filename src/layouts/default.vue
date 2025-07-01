<template>
  <SkipComponent />
  <div id="wrap" :class="[ routePath, { bgGray: isGrayPage } ]">
    <SubHeaderComponent />
    <slot></slot>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import SubHeaderComponent from '@/components/common/Header/SubHeader.vue'
import SkipComponent from '@/components/common/skip.vue'
import FooterComponent from '@/components/common/footer.vue'
import { computed, ref, watchEffect } from 'vue'
const route = useRoute()
const routePath = ref<string>('')
watchEffect(() => {
  const segments = route.path.split('/').filter(Boolean) // 빈 값 제거
  routePath.value = segments[segments.length - 1] || ''  // 마지막 segment만
})
const heightGetter = computed<number>(() => {
  return window.outerHeight
})

const isGrayPage = computed(() =>
  ['/community/gallery', '/login/findID', '/login/findPW'].includes(route.path)
)
// const getBrowserHeight = ref<number>(heightGetter.value);
console.log('route', route.path, heightGetter)
</script>
