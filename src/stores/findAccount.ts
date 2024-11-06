import { acceptHMRUpdate, defineStore } from 'pinia'
import { CallFIndId, CallFIndPw, MaskedAccount } from '@/models/interfaces/Accounts'
export const useFindAccountStore = defineStore({
  id: 'findAccount',
  state: () => ({
    isState: '',
    resultFindId: {
      count: 0,
      account: [] as MaskedAccount[]
    },
    resultFindPw: {
      memberId: '',
      contact: '',
      type: '',
      value: ''
    }
  }),
  getters: {
    getResultId(state): CallFIndId {
      return state.resultFindId
    },
    getResultPw(state): CallFIndPw {
      return state.resultFindPw
    }
  },
  actions: {
    setFindIdResult(item: CallFIndId) {
      this.isState = 'resultById'
      this.resultFindId.count = item.count
      this.resultFindId.account = item.account
    },
    setFindPwResult(item: CallFIndPw) {
      this.isState = 'resultByPw'
      this.resultFindPw = item
    },
    clearIdItem() {
      this.isState = ''
      this.resultFindId = { count: 0, account: [] } // 초기화
      this.resultFindPw = { memberId: '', contact: '', type: '', value: '' }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFindAccountStore, import.meta.hot))
}
