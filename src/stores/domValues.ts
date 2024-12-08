import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
export const useDomValues = defineStore('domValues', {
  state: () => ({
    footerHeight: ref<number>(0),
    footerOffsetTop: ref<number>(0)
  }),
  getters: {
    getFooterHeight: state => state.footerHeight
  },
  actions: {
    setFooterValues(p1: number, p2: number) {
      this.footerHeight = p1
      this.footerOffsetTop = p2
    },
    setFooterOffsetTop(p1: number) {
      this.footerOffsetTop = p1
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDomValues, import.meta.hot))
}
