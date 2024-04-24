<template>
  <div class="lang">
    <button type="button" :class="{ curr: languageType == 'ko' }" @click="setLang('ko')">KR</button>
    <button type="button" :class="{ curr: languageType == 'en' }" @click="setLang('en')">EN</button>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const languageType = ref('ko');
const setLang = (v: string) => {
  languageType.value = v
}
</script>