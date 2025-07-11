import { ref } from 'vue'

export function useValidate() {
  const errors = ref<Record<string, string>>({})
  const validateEmpty = (event: FocusEvent, fieldName: string): boolean => {
    const target = event.target as HTMLInputElement
    const isEmpty = target.value.trim() === ''
    setError(fieldName, !isEmpty, `${fieldName} 값을 입력해주세요.`)
    return !isEmpty
  }

  const validateKoreanName = (event: FocusEvent): boolean => {
    const target = event.target as HTMLInputElement
    const nameRegex = /^[가-힣]{2,6}$/
    const isValid = nameRegex.test(target.value)
    setError('name', isValid, '이름은 2~6자의 한글로 입력해주세요.')
    return isValid
  }

  const validateEmail = (event: FocusEvent): boolean => {
    const target = event.target as HTMLInputElement
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValid =
      emailRegex.test(target.value) && target.value.length >= 5 && target.value.length <= 254
    setError('email', isValid, '유효한 이메일 주소를 입력해주세요.')
    return isValid
  }

  const validatePassword = (event: FocusEvent): boolean => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const hasUpperCase = /[A-Z]/.test(value) ? 1 : 0
    const hasLowerCase = /[a-z]/.test(value) ? 1 : 0
    const hasNumbers = /[0-9]/.test(value) ? 1 : 0
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value) ? 1 : 0
    const isLengthValid = value.length >= 8 && value.length <= 16

    const isValid = isLengthValid && hasUpperCase + hasLowerCase + hasNumbers + hasSpecialChar >= 2
    setError(
      'password',
      isValid,
      '* 8-16자 대소문자, 숫자, 특수문자 중 2가지를 사용하세요.'
    )
    return isValid
  }

  // 숫자만
  const validateNumericInput = (event: KeyboardEvent): void => {
    const key = event.key
    const targets = event?.target as HTMLInputElement
    const isNumber = /^[0-9]$/.test(key)
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Enter'
    ]
    console.log('numbericLength', targets?.value.length)
    if (!isNumber && !allowedKeys.includes(key)) {
      event.preventDefault() // 숫자가 아닌 키 입력 방지
    }
  }
  // 아이디
  const validateId = (event: FocusEvent): boolean => {
    const target = event.target as HTMLInputElement
    const idRegex = /^[a-z0-9]{6,12}$/
    const isValid = idRegex.test(target.value)
    setError('id', isValid, '* 6-12자 영문과 숫자만 입력 가능합니다.')
    return isValid
  }

  const setError = (field: string, isValid: boolean, message: string) => {
    errors.value[field] = isValid ? '' : message
  }

  return {
    errors,
    validateKoreanName,
    validateEmail,
    validatePassword,
    validateNumericInput,
    validateId,
    setError,
    validateEmpty
  }
}
