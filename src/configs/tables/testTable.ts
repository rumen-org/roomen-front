export const tableConfig = {
  title: '상품정보, 주문일자, 주문번호, 주문금액(수량), 주문상태 항목으로 구성된 주문내역 목록표',
  class: 'my-table',
  colGroups: [
    { width: '50px', className: '' },
    { width: '200px', span: 2, className: 'mw100' },
    { width: '270px', className: '' },
    { width: 'width: 200px', className: 'mw100' }
  ],
  tHead: [
    { type: 'th', text: '헤더1', cSpan: 1, rSpan: 1, class: 'header-class' },
    { type: 'td', text: '설명1', cSpan: 1, rSpan: 1, class: 'header-class' },
    { type: 'th', text: '헤더2', cSpan: 1, rSpan: 1, class: 'header-class' },
    { type: 'td', text: '설명2', cSpan: 1, rSpan: 1, class: 'header-class' }
  ],
  tBody: [
    [
      { type: 'th', text: '본문1', cSpan: 1, rSpan: 1, class: 'body-class' },
      { type: 'td', text: '본문 내용1', cSpan: 1, rSpan: 1, class: 'body-class' }
    ],
    [
      { type: 'th', text: '본문2', cSpan: 1, rSpan: 1, class: 'body-class' },
      { type: 'td', text: '본문 내용2', cSpan: 1, rSpan: 1, class: 'body-class' }
    ]
  ]
}
