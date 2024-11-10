import axios from 'axios'
import { useUserStore } from '@/stores/loginStores'
import { path } from '@/api/urls'
const userStore = useUserStore()

export function getCartItems() {
  return axios.get(`${path.cart}/items`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`, // 로그인 시 토큰을 헤더에 포함
      'Content-Type': 'application/json'
    }
  })
}

export function getCartItemList() {
  return axios.get(`${path.cart}/items/list`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`, // 로그인 시 토큰을 헤더에 포함
      'Content-Type': 'application/json'
    }
  })
}

export function postCartItems(cartItems: Array<object> | object) {
  return axios.post(`${path.cart}/items`, JSON.stringify(cartItems), {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function putCartItem(id: number, cartItems: Array<object> | object) {
  console.log('onPut', id, cartItems)
  return axios.put(`${path.cart}/items/${id}`, JSON.stringify(cartItems), {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}
// 단일 요소 삭제시
export function deleteCartItem(id: number) {
  return axios.delete(`${path.cart}/items/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}` // 로그인 시 토큰을 헤더에 포함
    }
  })
}
// 복수 요소 삭제시
export function deleteMultipleCartItems(ids: number[]) {
  return axios.delete(`${path.cart}/items/multiple`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    },
    data: ids
  })
}
