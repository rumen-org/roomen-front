import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import msg from '@/locales/index'

type MessageSchema = typeof msg.ko

const i18n = createI18n<[MessageSchema], 'ko' | 'en'>({
  legacy: false,
  globalInjection: true,
  locale: 'ko', // 기본 언어
  fallbackLocale: 'en',
  messages: {
    ko: msg.ko,
    en: msg.en
  },
  silentTranslationWarn: true,
  datetimeFormats: {
    ko: {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Asia/Seoul'
      }
    },
    en: {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timeZone: 'America/New_York'
      }
    }
  }
})

export { i18n } // i18n 객체를 export 추가
