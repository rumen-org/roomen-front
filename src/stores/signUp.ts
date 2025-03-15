import { acceptHMRUpdate, defineStore } from 'pinia'
import { RegisterStep1, RegisterStep2, type SignUpParams } from '@/models/interfaces/Accounts'
export const useSignUpStore = defineStore('signUp', {
  // State 정의
  state: () => ({
    step1: {
      isThirdPartyAgree: false,
      isEmailAgree: false,
      isSmsAgree: false,
      isEmailVerified: false
    } as RegisterStep1,
    step2: {
      memberId: '',
      name: '',
      phone: '',
      email: '',
      password: '',
      role: '',
      verificationCode: 0
    } as RegisterStep2
  }),

  // Getters (옵션)
  getters: {
    getAllData(state) {
      return state
    }
  },
  // Actions 정의
  actions: {
    // Step 데이터 설정
    setSteps(params: SignUpParams) {
      // step1과 step2의 데이터를 각각 업데이트
      this.step1 = { ...this.step1, ...params.step1 }
      this.step2 = { ...this.step2, ...params.step2 }
    },

    // 모든 스텝 초기화
    clearStepAll() {
      this.step1 = {
        isThirdPartyAgree: false,
        isEmailAgree: false,
        isSmsAgree: false,
        isEmailVerified: false
      } as RegisterStep1
      this.step2 = {
        memberId: '',
        name: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        role: '',
        verificationCode: 0
      } as RegisterStep2
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSignUpStore, import.meta.hot))
}
