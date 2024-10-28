import { defineStore } from 'pinia'

interface QnaContent {
  id: number
  secret: boolean
  images: string[]
  qnaType: number
  title: string
  content: string
}

interface State {
  qnaContent: QnaContent | null
}
export const useModifyQnaStore = defineStore('qnaStore', {
  state: (): State => ({
    qnaContent: null
  }),
  actions: {
    setQnaContent(contents: QnaContent): void {
      this.qnaContent = contents
    },
    clearQnaContent() {
      this.qnaContent = null
    }
  }
})
