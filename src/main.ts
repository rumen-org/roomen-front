import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { createI18n } from 'vue-i18n'
import msg from '@/locales/index'
import '@/assets/style/style.scss'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
type MessageSchema = typeof msg.ko
import VueDOMPurifyHTML from 'vue-dompurify-html';

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
// if (process.env.NODE_ENV === 'development'){
//   worker.start()
// }

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(PerfectScrollbarPlugin)
app.use(VueDOMPurifyHTML)
app.mount('#app')
