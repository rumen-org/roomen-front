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

// 전역에서 $t 사용을 위한 설정 함수
export function setupI18n(app: App) {
  app.use(i18n)
  app.config.globalProperties.$t = i18n.global.t // 여기서 전역 $t 설정
}

export { i18n }
