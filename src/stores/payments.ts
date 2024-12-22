import { acceptHMRUpdate, defineStore } from 'pinia'
import { Customer } from '@/models/interfaces/Payment'
export const usePaymentStore = defineStore('payment', {
  state: () => ({
    customer: {
      email: '',
      name: '',
      tel: '',
      addr: '',
      postcode: ''
    } as Customer,
    backTo: ''
  }),
  getters: {
    getCustomer(state) {
      return state.customer
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
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot))
}
