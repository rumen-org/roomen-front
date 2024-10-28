import { defineStore } from 'pinia'

interface SignUpState {
  // Step 1 데이터
  isThirdPartyAgree: boolean
  isEmailAgree: boolean
  isSmsAgree: boolean
  isEmailVerified: boolean

  // Step 2 데이터
  memberId: string
  name: string
  phone: string
  address: string
  email: string
  password: string
  role: string
}

export const useSignUpStore = defineStore('signUp', {
  // State 정의
  state: (): SignUpState => ({
    isThirdPartyAgree: false,
    isEmailAgree: false,
    isSmsAgree: false,
    isEmailVerified: false,
    memberId: '',
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    role: ''
  }),

  // Getters (옵션)
  getters: {
    // 전체 스텝 데이터 반환
    getSignUpData: (state): SignUpState => state
  },

  // Actions 정의
  actions: {
    // Step 1 데이터 설정
    setStep1(step1Data: Partial<SignUpState>) {
      Object.assign(this, step1Data)
    },

    // Step 2 데이터 설정
    setStep2(step2Data: Partial<SignUpState>) {
      Object.assign(this, step2Data)
    },

    // 모든 스텝 초기화
    clearStepAll() {
      Object.assign(this, {
        isThirdPartyAgree: false,
        isEmailAgree: false,
        isSmsAgree: false,
        isEmailVerified: false,
        memberId: '',
        name: '',
        phone: '',
        address: '',
        email: '',
        password: '',
        role: ''
      })
    }
  }
})
