export const useValidate = () => {
  // 숫자만 입력되는지 확인하는 함수
  const validateNumericInput = (value: string) => {
    return value.replace(/[^0-9]/g, '') // 숫자 외의 모든 문자를 제거
  }
  return {
    validateNumericInput
  }
}
