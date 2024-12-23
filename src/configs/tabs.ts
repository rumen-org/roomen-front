import type { Tab } from '@/models/interfaces/Payment'

export const payment: Tab[] = [
  { name: '무통장 입금', path: 'withoutPassBook', type: 'vbank' },
  { name: '카드 결제', path: 'useCard', type: 'card' },
  { name: '실시간 계좌이체', path: 'takeBankTransfer', type: 'trans' }
]
