export const useUtils = () => {
  // 이름 (성 외에 이름 가리기)
  const maskName = (name: string): string => {
    const korRegex = /^[가-힣]+$/ // 한글 이름 검증 정규식
    if (korRegex.test(name)) {
      switch (name.length) {
        case 2:
          return `${name[0]}*` // 2글자: 첫 글자 + *
        case 3:
          return `${name[0]}**` // 3글자: 첫 글자 + **
        case 4:
          return `${name.slice(0, 2)}**` // 4글자: 앞 2글자 + **
        default:
          return `${name[0]}****` // 5글자 이상: 첫 글자 + ****
      }
    }
    return name
  }
  return {
    maskName
  }
}
