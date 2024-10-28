import { ref, onMounted } from 'vue'

interface PostcodeData {
  zonecode: string // 우편번호
  roadAddress: string // 도로명 주소
  jibunAddress: string // 지번 주소
  buildingName?: string // 건물명 (선택적)
  autoRoadAddress?: string // 자동 완성된 도로명 주소 (선택적)
  autoJibunAddress?: string // 자동 완성된 지번 주소 (선택적)
}

export function useAddress() {
  const postcode = ref<string>('')
  const roadAddress = ref<string>('')
  const jibunAddress = ref<string>('')
  const detailAddress = ref<string>('')
  const extraAddress = ref<string>('')
  const guideText = ref<string>('')
  const isScriptLoaded = ref<boolean>(false)

  // Daum Postcode 스크립트 로드
  const loadDaumPostcodeScript = () => {
    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.onload = () => {
      isScriptLoaded.value = true
    }
    document.head.appendChild(script)
  }

  // 주소 찾기 실행
  const execDaumPostcode = () => {
    if ((window as any).daum?.Postcode) {
      new (window as any).daum.Postcode({
        oncomplete: (data: PostcodeData) => {
          postcode.value = data.zonecode
          roadAddress.value = data.roadAddress
          jibunAddress.value = data.jibunAddress
          extraAddress.value = data.buildingName ? ` (${data.buildingName})` : ''
          guideText.value = data.autoRoadAddress ? `지번 주소: ${data.autoJibunAddress}` : ''
        }
      }).open()
    } else {
      console.error('Daum Postcode 스크립트가 로드되지 않았습니다.')
    }
  }

  onMounted(loadDaumPostcodeScript)

  return {
    postcode,
    roadAddress,
    jibunAddress,
    detailAddress,
    extraAddress,
    guideText,
    isScriptLoaded,
    execDaumPostcode
  }
}
