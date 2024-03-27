import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { createI18n } from 'vue-i18n'
import msg from '@/locales/index'

type MessageSchema = typeof msg.ko

const i18n = createI18n<[MessageSchema], 'ko' | 'en'>({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  // messages: {
  //   'ko': koKr,
  //   'en': enUs,
  // },
  messages: {
    'ko': msg.ko,
    'en': msg.en
  },
  silentTranslationWarn: true,
  datetimeFormats: {
    'ko': {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Asia/Seoul',
      }
    },
    'en': {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timeZone: 'America/New_York'
      }
    }
  },
})
const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.mount('#app')
