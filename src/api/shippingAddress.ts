import axios from 'axios'
import { useUserStore } from '@/stores/loginStores'
const BaseURL = 'http://localhost:8080/api'
const userStore = useUserStore()

export function postShipAddress(address: object) {
  return axios.post(`${BaseURL}/shipAddresses/write`, address, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function getAllShippingAddressesByMemberId(memberId: number) {
  return axios.get(`${BaseURL}/shipAddresses/member/${memberId}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}

export function getShipAddressById(id: number) {
  return axios.get(`${BaseURL}/shipAddresses/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}

export function setDefaultShippingAddress(id: number) {
  return axios.put(
    `${BaseURL}/shipAddresses/${id}/default`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    }
  )
}

// 배송지 삭제
export function deleteShippingAddress(id: number) {
  return axios.delete(`${BaseURL}/shipAddresses/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}

// 배송지 복수 삭제
export function deleteMultipleShippingAddress(ids: number[]) {
  return axios.delete(`${BaseURL}/shipAddresses/addresses/multiple`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    },
    data: ids
  })
}
