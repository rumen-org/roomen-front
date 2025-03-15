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

export interface BucketItems {
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

export interface ProductType {
  id: number // 상품 ID
  name: string // 상품명
  imgPath: string // 메인 이미지 경로
  price: number // 가격
  discountPer: number // 할인율
  subTitle: string // 부제목
  category: string // 카테고리
  label: string | null // 라벨 (null 허용)
  otherInfo: string | null // 기타 정보 (null 허용)
  shippingCost: number | null // 배송비 (null 허용)
  content: string // 상세 설명
  inStock: boolean // 재고 여부
  images: string[] // 추가 이미지 배열
}

export interface SelectedOption {
  color1: string
  color2: string
  select1: string
  select2: string
}
export interface GetItem {
  id: number
  name: string
  subName: string
  quantity: number
  basicPrice: number
  options: string
  totalPrice: number
  imgUrl: string
}
