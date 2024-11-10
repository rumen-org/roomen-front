import axios from 'axios'
import { path } from '@/api/urls'
import { useUserStore } from '@/stores/loginStores'

export function getQNAList(page: number | null, sort?: string | null, searchValue?: string | null) {
  let url = `${path.qna}/list`
  const required = page !== null && sort !== null
  if (required && searchValue === null) {
    url = `${path.qna}/list?page=${page}&sort=${sort}`
  } else if (required && searchValue !== null && searchValue !== undefined) {
    url = `${path.qna}/list?page=${page}&sort=${sort}&title=${searchValue}`
  }
  return axios.get(`${url}`, {})
}
export function getQNADetailPrivate(id: number, password: string) {
  const userStore = useUserStore()

  return axios.get(`${path.qna}/${id}?password=${password}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}` // 로그인 시 토큰을 헤더에 포함
    }
  })
}

export function getQNADetail(id: number) {
  const userStore = useUserStore()

  return axios.get(`${path.qna}/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}` // 로그인 시 토큰을 헤더에 포함
    }
  })
}

export function writeQNA(data: any) {
  const userStore = useUserStore()

  return axios.post(`${path.qna}/write`, data, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'content-type': 'multipart/form-data'
    }
  })
}

export function updateQNA(data: FormData) {
  const userStore = useUserStore()

  return axios.put(`${path.qna}/update`, data, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'content-type': 'multipart/form-data'
    }
  })
}

export function deleteQNA(id: number) {
  const userStore = useUserStore()

  return axios.delete(`${path.qna}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}
