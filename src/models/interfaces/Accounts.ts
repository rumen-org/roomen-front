// Type Import
import { FindUserType } from '@/models/type/typeList'
// 계정 정보 찾기 Result
export interface FindId {
  name: string
  type: FindUserType
  value: string
}
export interface FindPw {
  memberId: string
  name: string
  type: FindUserType
  value: string
}
// 계정 정보찾기 요청
export interface MaskedAccount {
  MaskedIds: string
  CreatedAt: string // Date 객체로 변환할 수 있습니다.
}

export interface CallFIndId {
  count: number
  account: MaskedAccount[]
}
export interface CallFIndPw {
  memberId: string
  contact: string
  type: string
  value: string
}
// 회원가입
export interface SignUpParams {
  step1: Partial<RegisterStep1>
  step2: Partial<RegisterStep2>
}
export interface RegisterStep1 {
  isThirdPartyAgree: boolean
  isEmailAgree: boolean
  isSmsAgree: boolean
  isEmailVerified: boolean
}
export interface RegisterStep2 {
  memberId: string
  name: string
  phone: string
  email: string
  password: string
  role: string
  verificationCode: number | null
}
export interface RegisterAll {
  isThirdPartyAgree: boolean
  isEmailAgree: boolean
  isSmsAgree: boolean
  isEmailVerified: boolean
  memberId: string
  name: string
  phone: string
  email: string
  password: string
  role: string
  // verificationCode: number
}
export interface DuplicateCheckType {
  memberIdExists: boolean
  emailExists: boolean
}
export interface duplicateParams {
  memberId: string | null
  email: string | null
}
