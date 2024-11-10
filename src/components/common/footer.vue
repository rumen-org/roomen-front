<template>
  <scrollTop />
  <div id="footer">
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
          <span>010-3583-9144</span>
          <span>jyk719@gmail.com</span>
        </div>
        <div>
          <address>{{ t('common.footer.addr') }}</address>
          <span
            >{{ t('common.footer.business').split(0, ': ')[0] }}
            <em>{{ t('common.footer.business').split(': ')[1] }}</em>
          </span>
          <span
            >{{ t('common.footer.commerceNum').split(0, ': ')[0] }}
            <em>{{ t('common.footer.commerceNum').split(': ')[1] }}</em></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// I18n
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// Components
import scrollTop from '@/components/button/scrollTop.vue'
</script>
