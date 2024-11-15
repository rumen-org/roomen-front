import axios from 'axios'
import { useUserStore } from '@/stores/loginStores'
const BaseURL = 'http://18.206.213.208:8080/api'
const userStore = useUserStore()
// Types
import {
  FindId,
  FindPw,
  type duplicateParams,
  type RegisterAll
} from '@/models/interfaces/Accounts'

// 내 계정 정보조회
export function getMyInformation() {
  return axios.get(`${BaseURL}/account/info`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}
// 휴대전화번호 인증 - phone, verificationCode
export function authPhoneNumber(phone: string, code?: string | null) {
  let data
  if (code === undefined || code === null) data = { phone } // phone을 JSON 객체로 만듬
  if (code !== undefined && code !== null) data = { phone, verificationCode: code }
  return axios.post(`${BaseURL}/account/verify-phone`, data, {
    headers: {
      'Content-type': 'application/json'
    }
  })
}

// 회원가입
export function onRegistor(params: RegisterAll) {
  return axios.post(`${BaseURL}/account/register`, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 계정 정보 수정
export function updateInformation(userData: any) {
  return axios.put(`${BaseURL}/account/update`, userData, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}
// 계정 탈퇴
export function deleteAccount() {
  return axios.delete(`${BaseURL}/account/delete`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}
// 계정 비밀번호 변경
export function updateAccountPassword(passwords: any) {
  return axios.put(`${BaseURL}/account/changePassword`, passwords, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}
// 아이디, 이메일 중복체크
export function duplicateCheck(p: duplicateParams) {
  let params
  if (p.memberId !== null && p.email !== null) {
    params = `?memberId=${p.memberId}&email=${p.email}`
  } else if (p.memberId !== null || p.email !== null) {
    params = `?memberId=${p.memberId ?? ''}&email=${p.email ?? ''}`
  }
  return axios.get(`${BaseURL}/account/duplicate-check${params}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 아이디 찾기
export function findMemberId(params: FindId) {
  return axios.post(`${BaseURL}/account/findId`, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 비밀번호 찾기
export function findMemberPw(params: FindPw) {
  return axios.post(`${BaseURL}/account/findPw`, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
