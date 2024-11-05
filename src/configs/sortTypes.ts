export const sortTypes_default = {
  items: [
    { sortValue: 'desc', sortLabel: '최신 순' },
    { sortValue: 'asc', sortLabel: '오래된 순' }
  ],
  default: 'desc'
}
export const sortType_product = {
  items: [
    { sortValue: 'releaseDate', sortLabel: '신상품 순' },
    { sortValue: 'priceAsc', sortLabel: '낮은가격 순' },
    { sortValue: 'priceDesc', sortLabel: '높은가격 순' }
  ],
  default: 'releaseDate'
}
// 신상품순 : newArrivals, 구상품순?: oldestFirst
