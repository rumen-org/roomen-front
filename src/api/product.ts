import axios from 'axios'
import { path } from '@/api/urls'

export function getAllProductList() {
  return axios.get(`${path.product}/list`)
}

export function getCategoryProductList(
  category: string,
  page: number | null,
  sort: string | null,
  keyword: string | undefined = ''
) {
  let url = `${path.product}/list?category=${category}&page=${page}&sort=${sort}`
  if (keyword !== null) {
    url = `${path.product}/list?category=${category}&page=${page}&sort=${sort}&keyword=${keyword}`
  }
  return axios.get(`${url}`)
}

export function getProductItem(id: number) {
  return axios.get(`${path.product}/${id}`)
}

export function postProductItem() {
  return axios.get(`${path.product}/write`)
}

export function putProductItem(id: number) {
  return axios.get(`${path.product}/modify/${id}`)
}

export function DeleteProductItem(id: number) {
  return axios.get(`${path.product}/delete/${id}`)
}
