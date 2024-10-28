export const sortTypes_default = {
  items: [
    { sortValue: 'desc', sortLabel: '최신 순' },
    { sortValue: 'asc', sortLabel: '오래된 순' }
  ],
  default: 'desc'
}
export const sortType_product = {
  items: [
    { sortValue: 'new', sortLabel: '신상품 순' },
    { sortValue: 'highPrice', sortLabel: '신상품 순' },
    { sortValue: 'lowPrice', sortLabel: '신상품 순' }
  ],
  default: 'new'
}
// 신상품순 : newArrivals, 구상품순?: oldestFirst
