import { acceptHMRUpdate, defineStore } from 'pinia'
import { CallFIndId, CallFIndPw } from '@/models/interfaces/Accounts'
export const useFindAccountStore = defineStore({
  id: 'findAccount',
  state: () => ({
    isState: '',
    resultFindId: {
      MaskedId: '',
      createdAt: ''
    },
    resultFindPw: {
      memberId: '',
      contact: '',
      type: '',
      value: ''
    }
  }),
  getters: {
    getResultId(state) {
      return state.resultFindId
    },
    getResultPw(state) {
      return state.resultFindPw
    }
  },
  actions: {
    setFindIdResult(item: CallFIndId) {
      this.isState = 'resultById'
      this.resultFindId = item
    },
    setFindPwResult(item: CallFIndPw) {
      this.isState = 'resultByPw'
      this.resultFindPw = item
    },
    clearIdItem() {
      this.isState = ''
      this.resultFindId = { MaskedId: '', createdAt: '' }
      this.resultFindPw = { memberId: '', contact: '', type: '', value: '' }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFindAccountStore, import.meta.hot))
}
