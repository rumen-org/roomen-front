import axios from 'axios'
import { useUserStore } from '@/stores/loginStores'
import { path } from '@/api/urls'
const userStore = useUserStore()

export function postShipAddress(address: object) {
  return axios.post(`${path.shipAddr}/write`, address, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function getAllShippingAddressesByMemberId(memberId: number) {
  return axios.get(`${path.shipAddr}/member/${memberId}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}
// 기본 배송지 조회
export function getMyDefaultAddress() {
  return axios.get(`${path.shipAddr}/default`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}

export function getShipAddressById(id: number) {
  return axios.get(`${path.shipAddr}/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}

export function setDefaultShippingAddress(id: number) {
  return axios.put(
    `${path.shipAddr}/${id}/default`,
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
  return axios.delete(`${path.shipAddr}/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
}

// 배송지 복수 삭제
export function deleteMultipleShippingAddress(ids: number[]) {
  return axios.delete(`${path.shipAddr}/addresses/multiple`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    },
    data: ids
  })
}
