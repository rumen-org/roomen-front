export const shippingAddress = {
  title: '선택, 배송지명, 수령인, 주소, 휴대전화 항목으로 구성된 배송지관리 목록표',
  class: '',
  colGroups: [
    { width: '50px', className: 'mw300' },
    { width: '200px', className: 'mw100', span: 2 },
    { width: '270px', className: '' },
    { width: '270px', className: '' },
    { width: '200px', className: 'mw100' }
  ],
  tHead: [
    { type: 'th', text: '상품정보', cSpan: 1, rSpan: 1, class: '' },
    { type: 'td', text: '주문일자', cSpan: 1, rSpan: 1, class: '' },
    { type: 'th', text: '주문번호', cSpan: 1, rSpan: 1, class: '' },
    { type: 'td', text: '주문금액(수량)', cSpan: 1, rSpan: 1, class: '' },
    { type: 'td', text: '주문금액(수량)', cSpan: 1, rSpan: 1, class: '' }
  ]
}
interface ColGroup {
  style?: string
  span?: number
  className?: string
}

// THeadItem 인터페이스 정의
interface THeadItem {
  type: 'th' | 'td'
  text: string
  cSpan?: number
  rSpan?: number
  class?: string
  scope?: 'col' | 'row'
}

// TableData 인터페이스 정의
interface TableData {
  title: string
  class: string
  colGroups: {
    col: ColGroup[]
  }
  tHead: THeadItem[]
}
export const purchaseHistory: TableData = {
  title: '상품정보, 주문일자, 주문번호, 주문금액(수량), 주문상태 항목으로 구성된 주문내역 목록표',
  class: '',
  colGroups: {
    col: [
      { style: '600px', className: 'mw300' },
      { style: '200px', className: 'mw100' },
      { style: '270px', className: '' },
      { style: '200px', className: 'mw100' },
      { style: '270px', className: 'mw150' }
    ]
  },
  tHead: [
    { type: 'th', text: '상품정보' },
    { type: 'th', text: '주문일자' },
    { type: 'th', text: '주문번호' },
    { type: 'th', text: '주문금액(수량)' },
    { type: 'th', text: '주문상태' }
  ]
}
