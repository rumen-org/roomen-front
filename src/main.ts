import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { createI18n } from 'vue-i18n'
import enUs from '@/locales/en/main.json'
import koKr from '@/locales/ko/main.json'

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages: {
    'ko-KR': koKr,
    'en-US': enUs,
  },
  silentTranslationWarn: true,
  datetimeFormats: {
    'ko-KR': {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timezone: 'Asia/Seoul'
      }
    }
  },
})
app.use(i18n)
app.use(createPinia())
app.use(router)
app.mount('#app')
