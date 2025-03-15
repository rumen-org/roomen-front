// composable/usePayments.ts
import { onMounted, ref } from 'vue'

interface PaymentResponse {
  success: boolean
  error_msg?: string
  imp_uid?: string
  merchant_uid?: string
}
interface BuyerInfo {
  email: string
  name: string
  tel: string
  addr: string
  postcode: string
}

export function usePayments() {
  const IMP = ref<typeof window.IMP | null>(null)
  const buyerInfo = ref<BuyerInfo | null>(null)

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
  const setBuyerInfo = (
    email: string,
    name: string,
    tel: string,
    addr: string,
    postcode: string
  ) => {
    buyerInfo.value = { email, name, tel, addr, postcode }
  }

  const requestPay = (
    amount: number,
    name: string,
    payMethod: 'card' | 'trans' | 'vbank' | 'phone',
    customerUid: string
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
          buyer_email: buyerInfo.value?.email,
          buyer_name: buyerInfo.value?.name,
          buyer_tel: buyerInfo.value?.tel,
          buyer_addr: buyerInfo.value?.addr,
          buyer_postcode: buyerInfo.value?.postcode,
          customer_uid: customerUid
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
    setBuyerInfo,
    requestPay
  }
}
