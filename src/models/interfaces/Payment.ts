import type { PaymentType } from '@/models/type/typeList'
export interface Customer {
  email: string
  name: string
  tel: string
  addr: string
  postcode: string
}
export interface memberInfoItem {
  address: string
  phone: string
  name: string
  email: string
}
export interface toggleItem {
  name: string
  phoneFrontNumber: string
  phoneMiddleNumber: string
  phoneEndNumber: string
  email: string
}
export interface toggleAddressType {
  getPostCode: string
  getRoadAddress: string
  getDetailAdress: string
}
export interface Tab {
  name: string
  path: string
  type: PaymentType
}
