export interface propsType {
  author: string
  createdDate: string
  content: string
}
export interface QnaContent {
  id: number
  title: string
  content: string
  images: string[]
  creDate: string // ISO 8601 날짜 형식
  author: string
  hasReply: boolean
  qnaType: number
  secret: boolean
  replies?: propsType[]
}
export interface QnAList {
  id: number
  qnaType: number
  title: string
  creDate: string
  secret: boolean
  hasReply: boolean
  password: string
  author: string
  content: string
  memberId: number
}
export interface Item {
  id: number
  secret: boolean
}
