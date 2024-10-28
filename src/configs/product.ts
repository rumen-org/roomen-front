export const commonRadios = [
  { label: '흰색', value: 'white', color: 'ffffff' },
  { label: '빨간색', value: 'red', color: '191919' },
  { label: '회색', value: 'gray', color: 'c6c6c6' }, // 'red'를 'gray'로 수정
  { label: '나무', value: 'wood', color: 'ImageWood' },
  { label: '살구색', value: 'cream', color: 'dec9a6' },
  { label: '핫핑크', value: 'hotPink', color: 'ea5d5d' },
  { label: '하늘색', value: 'skyBlue', color: '2362c0' },
  { label: '노란색', value: 'yellow', color: 'fdd33f' },
  { label: '진녹색', value: 'deepGreen', color: '2d8d53' },
  { label: '연보라', value: 'lightPurple', color: '743c97' }
]

export const shippingOption = {
  label: '배송 방법',
  id: 'select1',
  options: [
    { label: '[필수] 주문시 결제', value: '' },
    { label: '무료 배송', value: 'free' },
    { label: '유료 배송', value: 'paid' },
    { label: '빠른 배송', value: 'express' }
  ]
}

export const shippingOption2 = {
  label: '배송 지역',
  id: 'select2',
  options: [
    { label: '[필수] 주문시 결제', value: '' },
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '대구', value: 'daegu' },
    { label: '인천', value: 'incheon' },
    { label: '광주', value: 'gwangju' },
    { label: '대전', value: 'daejeon' },
    { label: '울산', value: 'ulsan' },
    { label: '세종', value: 'sejong' },
    { label: '경기', value: 'gyeong-gi' },
    { label: '강원', value: 'Gangwon' },
    { label: '충북', value: 'chungbuk' },
    { label: '충남', value: 'chungnam' },
    { label: '전북', value: 'jeonbuk' },
    { label: '전남', value: 'jeonnam' },
    { label: '경북', value: 'gyoungbuk' },
    { label: '충남', value: 'gyoungnam' },
    { label: '제주', value: 'jeju' }
  ]
}
