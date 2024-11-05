import axios from 'axios'
const BaseURL = 'http://localhost:8080/api'

export function getAllProductList() {
  return axios.get(`${BaseURL}/product/list`)
}

export function getCategoryProductList(
  category: string,
  page: number | null,
  sort: string | null,
  keyword: string | undefined = ''
) {
  let url = `${BaseURL}/product/list?category=${category}&page=${page}&sort=${sort}`
  if (keyword !== null) {
    url = `${BaseURL}/product/list?category=${category}&page=${page}&sort=${sort}&keyword=${keyword}`
  }
  return axios.get(`${url}`)
}

export function getProductItem(id: number) {
  return axios.get(`${BaseURL}/product/${id}`)
}

export function postProductItem() {
  return axios.get(`${BaseURL}/product/write`)
}

export function putProductItem(id: number) {
  return axios.get(`${BaseURL}/product/modify/${id}`)
}

export function DeleteProductItem(id: number) {
  return axios.get(`${BaseURL}/product/delete/${id}`)
}
