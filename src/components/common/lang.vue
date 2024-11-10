<template>
  <div class="lang">
    <button type="button" :class="{ curr: currentLanguage == 'ko' }" @click="setLang('ko')">
      KR
    </button>
    <button type="button" :class="{ curr: currentLanguage == 'en' }" @click="setLang('en')">
      EN
    </button>
  </div>
</template>
<script setup lang="ts">
// I18n
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
// Store
import { useLanguageStore } from '@/stores/language'
import { storeToRefs } from 'pinia'
const languageStore = useLanguageStore()
const { currentLanguage } = storeToRefs(languageStore)

const setLang = (p: string) => {
  languageStore.setCurrentLanguage(p)
  locale.value = p
}
</script>
