import axios from 'axios'
import { useUserStore } from '@/stores/loginStores'
const BaseURL = 'http://localhost:8080/api'
const userStore = useUserStore()

// 내 계정 정보조회
export function getMyInformation() {
  return axios.get(`${BaseURL}/account/info`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
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
// 회원가입

// 아이디, 이메일 중복체크
export function duplicateCheck(memberId: string | null, email: string | null) {
  let params
  if (memberId === null || email === undefined) {
    params = null
    return
  } else {
    params = `?memberId=${memberId ?? ''}&email=${email ?? ''}`
  }
  return axios.get(`${BaseURL}/account/duplicate-check${params}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}
