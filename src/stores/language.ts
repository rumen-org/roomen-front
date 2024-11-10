import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: ref<string>(localStorage.getItem('language') || 'ko')
  }),
  getters: {
    getCurrentLanguage: state => {
      return state.currentLanguage
    }
  },
  actions: {
    setCurrentLanguage(p: string) {
      this.currentLanguage = p
      localStorage.setItem('language', p)
    },
    initCurrentLanguage() {
      this.currentLanguage = 'ko'
      localStorage.removeItem('language')
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
}
