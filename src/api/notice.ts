import axios from 'axios'
const BaseURL = 'http://localhost:8080/api'

export function getNoticeList(
  page: number | null,
  sort?: string | null,
  searchValue?: string | null
) {
  let url = `${BaseURL}/notice/list`
  const required = page !== null && sort !== null
  if (required && searchValue === null) {
    url = `${BaseURL}/notice/list?page=${page}&sort=${sort}`
  } else if (required && searchValue !== null && searchValue !== undefined) {
    url = `${BaseURL}/notice/list?page=${page}&sort=${sort}&title=${searchValue}`
  }
  return axios.get(`${url}`, {})
}
export function getNoticeDetail(id: number) {
  return axios.get(`${BaseURL}/notice/${id}`)
}
export function deleteNotice(id: number) {
  return axios.delete(`${BaseURL}/notice/${id}`)
}
export function updateNotice(id: number) {
  return axios.put(`${BaseURL}/notice/${id}`, updateNotice)
}
export function writeNotice(data: any) {
  return axios.post(`${BaseURL}/notice/`, data)
}
