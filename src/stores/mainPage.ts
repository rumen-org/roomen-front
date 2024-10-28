import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    activeValue: 0
  }),
  getters: {
    getActiveSection(state) {
      return state.activeValue
    }
  },
  actions: {
    setActiveSection(section: number) {
      this.activeValue = section
    }
  }
})
