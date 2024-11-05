// composables/usePayments.ts
import { onMounted, ref } from 'vue'

interface PaymentResponse {
  success: boolean
  error_msg?: string
  imp_uid?: string
  merchant_uid?: string
}

export function usePayments() {
  const IMP = ref<typeof window.IMP | null>(null)

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  }

  const initPayment = async () => {
    try {
      // jQuery와 iamport.payment.js 로드
      await loadScript('https://code.jquery.com/jquery-1.12.4.min.js')
      await loadScript('https://cdn.iamport.kr/js/iamport.payment-1.2.0.js')

      IMP.value = window.IMP
      IMP.value?.init('imp67011510') // 가맹점 식별코드
    } catch (error) {
      console.error('Payment script loading failed:', error)
    }
  }

  const generateMerchantUid = (): string => {
    const now = new Date()
    return `IMP${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`
  }

  const requestPay = (
    amount: number,
    name: string,
    payMethod: 'card' | 'trans' | 'vbank' | 'phone' // 결제 수단 타입 추가
  ): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
      if (!IMP.value) {
        return reject(new Error('IMP is not initialized'))
      }

      IMP.value.request_pay(
        {
          pg: 'kcp',
          pay_method: payMethod, // 선택한 결제 수단을 전달
          merchant_uid: generateMerchantUid(),
          name,
          amount,
          buyer_email: 'Iamport@chai.finance',
          buyer_name: '아임포트 기술지원팀',
          buyer_tel: '010-1234-5678',
          buyer_addr: '서울특별시 강남구 삼성동',
          buyer_postcode: '123-456'
        },
        (rsp: PaymentResponse) => {
          if (rsp.success) {
            resolve(rsp)
          } else {
            reject(new Error(rsp.error_msg || 'Payment failed'))
          }
        }
      )
    })
  }

  onMounted(async () => {
    await initPayment()
  })

  return {
    requestPay
  }
}
