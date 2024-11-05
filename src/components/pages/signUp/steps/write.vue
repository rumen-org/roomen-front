<template>
  <!-- inputTable -->
  <div class="inputTable">
    <table>
      <caption>
        아이디, 비밀번호, 비밀번호 확인, 이름, 휴대전화, 이메일 항목으로 구성된 회원가입 정보입력 표
      </caption>
      <colgroup>
        <col style="width: 25%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            아이디 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red  inputChck2': errors.password }">
            <input
              v-model="step2Data.memberId"
              type="text"
              title="아이디"
              @blur="[validateEmpty($event, 'email'), validateId($event)]"
              @input="checkDuplicated"
            />
            <span>{{ stateDuplicateId }}</span>
            <span v-if="errors.id" class="error">{{ errors.id }}</span>
            <!--            <span v-if="stateDuplicateId">존재하는 아이디 입니다.</span>-->
          </td>
        </tr>
        <tr>
          <th scope="row">
            비밀번호 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red inputChck2': errors.password }">
            <input
              v-model="step2Data.password"
              type="password"
              title="비밀번호"
              placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8-16자)"
              @blur="[validateEmpty($event, 'email'), validatePassword($event)]"
            />
            <span v-if="errors.password" class="error">{{ errors.password }}</span>
          </td>
        </tr>
        <tr>
          <th scope="row">
            비밀번호 확인 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red inputChck2': errors.password }">
            <input v-model="confirmPassword" type="password" title="비밀번호 확인" />
          </td>
        </tr>
        <tr>
          <th></th>
          <td>{{ observeChecked }}</td>
        </tr>
        <tr>
          <th scope="row">
            이름 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red inputChck2': errors.name }">
            <input
              v-model="step2Data.name"
              type="text"
              title="이름"
              @blur="[validateEmpty($event, 'email'), validateKoreanName($event)]"
            />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </td>
        </tr>
        <tr>
          <th scope="row">
            휴대전화 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td>
            <div class="with-button">
              <div class="phone">
                <select v-model="phone[0]" title="휴대전화 앞 세자리" required>
                  <option v-for="(type, idx) in frontNumber" :key="idx" :value="type.value">
                    {{ type.label }}
                  </option>
                </select>
                <span>&mdash;</span>
                <input
                  :ref="inputRefs[1]"
                  v-model="phone[1]"
                  type="text"
                  title="휴대전화 가운데 네자리"
                  maxlength="4"
                  @input="handleInput(1, $event as InputEvent)"
                  @keydown.delete="handleBackspace(1)"
                  @keydown="validateNumericInput"
                />
                <span>&mdash;</span>
                <input
                  :ref="inputRefs[2]"
                  v-model="phone[2]"
                  type="text"
                  title="휴대전화 마지막 네자리"
                  maxlength="4"
                  @input="handleInput(2, $event as InputEvent)"
                  @keydown.delete="handleBackspace(2)"
                  @keydown="validateNumericInput"
                />
              </div>
              <button :disabled="!correctPhone" class="btn blockBtn" @click="submitAuthNumber">
                인증요청
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="isAuthRequired">
          <th scope="row">
            휴대전화 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td>
            <div class="with-button pos-rel">
              <input type="text" title="인증번호" placeholder="인증번호를 입력해주세요." />
              <button class="btn blockBtn">확인</button>
              <em class="timer">{{ transToMinutes(seconds) }}</em>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            이메일 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red inputChck2': errors.email }">
            <input
              v-model="step2Data.email"
              type="text"
              title="이메일"
              @blur="[validateEmpty($event, 'email'), validateEmail($event)]"
              @input="checkDuplicated"
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
            <span v-if="stateDuplicateEmail" class="error red">존재하는 이메일 입니다.</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="bottomBtn txtC">
    <button type="button" class="btn blockBtn sL" @click="handleRegistor">회원가입</button>
  </div>
  <!--// inputTable -->
</template>

<script lang="ts" setup>
import { type duplicateParams, type RegisterStep2 } from '@/models/interfaces/Accounts'

import { computed, reactive, type Ref, ref } from 'vue'

// Stores
import { storeToRefs } from 'pinia'
import { useSignUpStore } from '@/stores/signUp'
const { step1, step2 } = storeToRefs(useSignUpStore())
// Config
import { mobileFrontNumber } from '@/configs/selectOptions'

// const { getSignUpData } = storeToRefs(useSignUpStore())

const frontNumber = computed(() => {
  return mobileFrontNumber
})
// Emits
const emits = defineEmits(['update'])

// Composable
import { useValidate } from '@/composables/useValidate'
import { duplicateCheck, onRegistor } from '@/api/account'
const {
  errors,
  validateEmail,
  validateEmpty,
  validateId,
  validateKoreanName,
  validateNumericInput,
  validatePassword
} = useValidate()
const step2Data = reactive<RegisterStep2>({
  memberId: '',
  name: '',
  phone: '',
  email: '',
  password: '',
  role: 'Customer'
})

const confirmPassword = ref<string>('')
const isCorrect = computed<boolean>(() => {
  return step2Data.password === confirmPassword.value
})
const observeChecked = computed(() => {
  let result = false
  result = !!(isCorrect.value && confirmPassword.value !== '' && step2Data.password)
  return result
})
// is AuthRequest
const isAuthRequired = ref<boolean>(false)
const correctPhone = computed<boolean>(() => {
  return phone.value[0] !== '' && phone.value[1].length === 4 && phone.value[2].length === 4
})

const phone = ref(['', '', '']) // input 값 관리
const inputRefs: Ref<HTMLInputElement | null>[] = [
  ref<HTMLInputElement | null>(null),
  ref<HTMLInputElement | null>(null),
  ref<HTMLInputElement | null>(null)
]

const handleInput = (index: number, event: InputEvent) => {
  const input = event.target as HTMLInputElement
  phone.value[index] = input.value.replace(/\D/g, '')

  if (phone.value[index].length === 4 && index < phone.value.length - 1) {
    const nextInputRef = inputRefs[index + 1]
    if (nextInputRef?.value) {
      nextInputRef.value.focus()
    }
  }
}
const stateDuplicateId = ref<boolean>(false)
const stateDuplicateEmail = ref<boolean>(false)
const checkDuplicated = async () => {
  const params = {
    memberId: step2Data.memberId,
    email: step2Data.email
  } as duplicateParams
  try {
    console.log('callFunction')
    const response = await duplicateCheck(params)
    console.log('response', response)
    stateDuplicateId.value = response?.data.memberIdExists
    stateDuplicateEmail.value = response?.data.emailExists
  } catch (error) {
    console.error(error)
  }
}
const handleBackspace = (index: number) => {
  if (phone.value[index].length === 0 && index > 0) {
    // 이전 input으로 포커스 이동
    inputRefs[index - 1].value?.focus()
  }
}
const seconds = ref<number>(179)
const countTimer = () => {
  setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    }
  }, 1000) // 1초마다
}

const transToMinutes = (total: number) => {
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${seconds}`
}
const submitAuthNumber = () => {
  isAuthRequired.value = true
  countTimer()
}
const bindValue = () => {
  step2.value.memberId = step2Data.memberId
  step2.value.phone = `${phone.value[0]}-${phone.value[1]}-${phone.value[2]}`
  step2.value.name = step2Data.name
  step2.value.password = step2Data.password
  step2.value.role = 'Customer'
  step2.value.email = step2Data.email
}
const AllData = {
  isThirdPartyAgree: step1.value.isThirdPartyAgree,
  isEmailAgree: step1.value.isEmailAgree,
  isSmsAgree: step1.value.isSmsAgree,
  isEmailVerified: true,
  memberId: step2.value.memberId,
  name: step2.value.name,
  phone: step2.value.phone,
  email: step2.value.email,
  password: step2.value.password,
  role: 'Customer'
}
const handleRegistor = async () => {
  bindValue()
  console.log('AllData', AllData)
  try {
    const response = await onRegistor(AllData)
    console.log('response', response.data)
    emits('update')
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped>
.pos-rel {
  position: relative;
}
.timer {
  position: absolute;
  right: 30%;
  color: #f44336;
  font-weight: 300;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1.1;
}
</style>
