import {acceptHMRUpdate, defineStore} from "pinia";

interface BucketItems {
    id: number;
    name: string;
    subName: string;
    quantity: number;
    basicPrice: number;
    options: string;
    totalPrice: number;
    productId: string;
    imgUrl: string;
}
export const useBucketStore = defineStore({

    id: 'bucket',
    state: () => ({
        items: [] as BucketItems[],
    }),
    getters: {
        getItems(state): BucketItems[] {
            return state.items;
        },
        getPrice(state): number {
            // return state.items ? state.items.totalPrice : 0;
            return state.items.reduce((total: number, item: BucketItems) =>
                total + item.totalPrice, 0
            );
        },
        totalItems(state): number {
            return state.items.length;
        }

    },
    actions: {
        setItems(newItem: BucketItems) {
            this.items.push(newItem);
            // this.activeValue = section;
        },
        removeItems(id: number) {
            this.items = this.items.filter(item => item.id !== id);
        },
        setItemQuantity(id: number, quantity: number) {
            const item = this.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                // item.totalPrice = item.totalPrice * quantity;
            }
        },
        clearAllItems() {
            this.items = []
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBucketStore, import.meta.hot));
}
