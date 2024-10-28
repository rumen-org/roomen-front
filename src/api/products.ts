import axios from 'axios'
const BaseURL = 'http://localhost:8080/api'

export function getAllProductList() {
  return axios.get(`${BaseURL}/product/list`)
}

export function getCategoryProductList(category: string) {
  return axios.get(`${BaseURL}/product/list?category=${category}`)
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
