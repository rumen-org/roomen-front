import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { ResponsiveType } from '@/models/type/typeList'
export const useWindowResponsive = defineStore('windowResponsive', {
  state: () => ({
    widthValue: ref<number>(0),
    windowState: ref<ResponsiveType>('desktop')
  }),
  getters: {
    getWidthValue: state => state.widthValue,
    getWindowState: state => state.windowState
  },
  actions: {
    setWidthValue(p: number) {
      this.widthValue = p
    },
    setWindowState(state: ResponsiveType) {
      this.windowState = state
    },
    initCurrentLanguage() {
      this.widthValue = 0
      this.windowState = 'desktop'
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWindowResponsive, import.meta.hot))
}