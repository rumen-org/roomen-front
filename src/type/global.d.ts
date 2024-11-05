export {}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: { oncomplete: (data: PostcodeData) => void }) => { open: () => void }
    }
  }
}

interface PostcodeData {
  zonecode: string // 우편번호
  roadAddress: string // 도로명 주소
  jibunAddress: string // 지번 주소
  buildingName?: string // 건물명 (선택적)
  autoRoadAddress?: string // 자동 완성된 도로명 주소 (선택적)
  autoJibunAddress?: string // 자동 완성된 지번 주소 (선택적)
}
export {}

declare global {
  interface Window {
    IMP: any
  }
}
