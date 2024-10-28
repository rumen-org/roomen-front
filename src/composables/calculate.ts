export const getOriginPrice = (price: number, discountPer: number): number => {
  const discountAmount = (price * discountPer) / 100
  return price - discountAmount
}

export const formatPrice = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
