import { acceptHMRUpdate, defineStore } from 'pinia'
import { Customer } from '@/models/interfaces/Payment'
import type { PaymentType } from '@/models/type/typeList'
export const usePaymentStore = defineStore('payment', {
  state: () => ({
    customer: {
      email: '',
      name: '',
      tel: '',
      addr: '',
      postcode: ''
    } as Customer,
    backTo: '',
    paymentType: ''
  }),
  getters: {
    getCustomer(state) {
      return state.customer
    },
    getPaymentType(state) {
      return state.paymentType
    }
  },
  actions: {
    setCustomer(p: Customer) {
      this.customer = p
    },
    initCustomer() {
      this.customer = {
        email: '',
        name: '',
        tel: '',
        addr: '',
        postcode: ''
      }
    },
    setPaymentType(p: PaymentType) {
      this.paymentType = p
    },
    initPaymentType() {
      this.paymentType = 'vbank'
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot))
}
