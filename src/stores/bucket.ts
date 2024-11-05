import { acceptHMRUpdate, defineStore } from 'pinia'

interface BucketItems {
  id: number
  name: string
  subName: string
  quantity: number
  basicPrice: number
  options: string
  totalPrice: number
  productId: string
  imgUrl: string
}

export const useBucketStore = defineStore({
  id: 'bucket',
  state: () => ({
    items: JSON.parse(localStorage.getItem('buckets') || '[]') as BucketItems[]
  }),
  getters: {
    getItems(state): BucketItems[] {
      return state.items
    },
    getPrice(state): number {
      return state.items.reduce(
        (total: number, item: BucketItems) => total + item.totalPrice * item.quantity,
        0
      )
    },
    totalItems(state): number {
      return state.items.length
    }
  },
  actions: {
    setItems(newItem: BucketItems) {
      this.items.push(newItem)
      this.equalToStorage()
    },
    removeItems(id: number) {
      this.items = this.items.filter(item => item.id !== id)
      this.equalToStorage()
    },
    setItemQuantity(id: number, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
        this.equalToStorage()
      }
    },
    clearAllItems() {
      this.items = []
      localStorage.removeItem('buckets')
    },
    equalToStorage() {
      localStorage.setItem('buckets', JSON.stringify(this.items))
    },
    loadItemsFromStorage() {
      this.items = JSON.parse(localStorage.getItem('buckets') || '[]')
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBucketStore, import.meta.hot))
}
