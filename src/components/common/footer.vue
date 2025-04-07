<template>
  <scrollTop />
  <footer id="footer" ref="footerRef">
    <div class="inner">
      <p>
        <a href=""><span class="hide">ROOMEN</span></a>
      </p>
      <a href="https://www.instagram.com/jible_studio/" class="insta"
        ><span class="hide">인스타그램</span></a
      >
      <div>
        <div>
          <span
            >{{ t('common.footer.job') }} : <em>{{ t('common.footer.name') }}</em></span
          >
          <span>010-3583-9144 {{ refHeight }}</span>
          <span>jyk719@gmail.com</span>
        </div>
        <div>
          <address>{{ t('common.footer.addr') }}</address>
          <span
            >{{ t('common.footer.business').split(': ')[0] }}
            <em>{{ t('common.footer.business').split(': ')[1] }}</em>
          </span>
          <span
            >{{ t('common.footer.commerceNum').split(': ')[0] }}
            <em>{{ t('common.footer.commerceNum').split(': ')[1] }}</em></span
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
// I18n
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// Components
import scrollTop from '@/components/button/scrollTop.vue'

// Route
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce, throttle } from 'lodash'
const route = useRoute()

// Stores
import { useDomValues } from '@/stores/domValues'
const useDomStore = useDomValues()
// Ref, Ref-height
const footerRef = ref<HTMLElement | null>(null)
const refHeight = ref<number>(0)
const refOffsetTop = ref<number>(0)
const getRefHeight = debounce(() => {
  refHeight.value = footerRef?.value?.offsetHeight ?? 0
  refOffsetTop.value = footerRef?.value?.offsetTop ?? 0
  useDomStore.setFooterValues(refHeight.value, refOffsetTop.value)
}, 400)
const getRefScroll = throttle(() => {
  refOffsetTop.value = footerRef?.value?.offsetTop ?? 0
  useDomStore.setFooterOffsetTop(refOffsetTop.value)
}, 200)
onMounted(() => {
  if (route.fullPath && route.fullPath.includes('product')) {
    getRefHeight()
    window.addEventListener('resize', getRefHeight)
    window.addEventListener('scroll', getRefScroll)
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', getRefHeight)
  window.removeEventListener('resize', getRefScroll)
})
</script>
