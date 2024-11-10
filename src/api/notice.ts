import axios from 'axios'
import { path } from '@/api/urls'

export function getNoticeList(
  page: number | null,
  sort?: string | null,
  searchValue?: string | null
) {
  let url = `${path.notice}/list`
  const required = page !== null && sort !== null
  if (required && searchValue === null) {
    url = `${path.notice}/list?page=${page}&sort=${sort}`
  } else if (required && searchValue !== null && searchValue !== undefined) {
    url = `${path.notice}/list?page=${page}&sort=${sort}&title=${searchValue}`
  }
  return axios.get(`${url}`, {})
}
export function getNoticeDetail(id: number) {
  return axios.get(`${path.notice}/${id}`)
}
export function deleteNotice(id: number) {
  return axios.delete(`${path.notice}/${id}`)
}
export function updateNotice(id: number) {
  return axios.put(`${path.notice}/${id}`, updateNotice)
}
export function writeNotice(data: any) {
  return axios.post(`${path.notice}/`, data)
}
