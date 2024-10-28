import axios from 'axios'
const BaseURL = 'http://localhost:8080/api'
import { useUserStore } from '@/stores/loginStores'

export function getQNAList(page: number | null, sort?: string | null, searchValue?: string | null) {
  let url = `${BaseURL}/qna/list`
  const required = page !== null && sort !== null
  if (required && searchValue === null) {
    url = `${BaseURL}/qna/list?page=${page}&sort=${sort}`
  } else if (required && searchValue !== null && searchValue !== undefined) {
    url = `${BaseURL}/qna/list?page=${page}&sort=${sort}&title=${searchValue}`
  }
  return axios.get(`${url}`, {})
}
export function getQNADetailPrivate(id: number, password: string) {
  const userStore = useUserStore()

  return axios.get(`${BaseURL}/qna/${id}?password=${password}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}` // 로그인 시 토큰을 헤더에 포함
    }
  })
}

export function getQNADetail(id: number) {
  const userStore = useUserStore()

  return axios.get(`${BaseURL}/qna/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}` // 로그인 시 토큰을 헤더에 포함
    }
  })
}

export function writeQNA(data: any) {
  const userStore = useUserStore()

  return axios.post(`${BaseURL}/qna/write`, data, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'content-type': 'multipart/form-data'
    }
  })
}

export function updateQNA(data: FormData) {
  const userStore = useUserStore()

  return axios.put(`${BaseURL}/qna/update`, data, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'content-type': 'multipart/form-data'
    }
  })
}

export function deleteQNA(id: number) {
  const userStore = useUserStore()

  return axios.delete(`${BaseURL}/qna/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}
