export interface ProductsType {
  id: number
  name: string
  imgPath: string
  price: number
  discountPer: number
  subTitle: string
  category: string
  label: string | null
  otherInfo: string | null
  shippingCost: number | null
  content: string
  inStock: boolean
  images: string[]
  releaseDate: Date
}
