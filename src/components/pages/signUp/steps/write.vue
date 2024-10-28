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
          <td><input type="text" title="아이디" /></td>
        </tr>
        <tr>
          <th scope="row">
            비밀번호 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td>
            <input
              type="password"
              title="비밀번호"
              placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8-16자)"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">
            비밀번호 확인 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td><input type="password" title="비밀번호 확인" /></td>
        </tr>
        <tr>
          <th scope="row">
            이름 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td><input type="text" title="이름" /></td>
        </tr>
        <tr>
          <th scope="row">
            휴대전화 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td>
            <div class="with-button">
              <div class="phone">
                <select v-model="phone[0]" title="휴대전화 앞 세자리">
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
                  @input="handleInput(1, $event)"
                  @keydown.delete="handleBackspace(1)"
                />
                <span>&mdash;</span>
                <input
                  :ref="inputRefs[2]"
                  v-model="phone[2]"
                  type="text"
                  title="휴대전화 마지막 네자리"
                  maxlength="4"
                  @input="handleInput(2, $event)"
                  @keydown.delete="handleBackspace(2)"
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
          <td><input type="text" title="이메일" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="bottomBtn txtC">
    <button type="button" class="btn blockBtn sL">회원가입</button>
  </div>
  <!--// inputTable -->
</template>

<script lang="ts" setup>
import { computed, type Ref, ref } from 'vue'

// Stores
import { useSignUpStore } from '@/stores/signUp'
import { storeToRefs } from 'pinia'
const { getSignUpData } = storeToRefs(useSignUpStore())

// Config
import { mobileFrontNumber } from '@/configs/selectOptions'
const frontNumber = computed(() => {
  return mobileFrontNumber
})

// is AuthRequest
const isAuthRequired = ref<boolean>(false)
//
const correctPhone = computed<boolean>(() => {
  return phone.value[0] !== '' && phone.value[1].length === 4 && phone.value[2].length === 4
})

const phone = ref(['', '', '']) // input 값 관리
const inputRefs: Ref<HTMLInputElement>[] = [ref(null), ref(null), ref(null)]

const handleInput = (index: number, event: InputEvent) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '')
  phone.value[index] = value

  if (phone.value[index].length === 4 && index < phone.value.length - 1) {
    inputRefs[index + 1].value.focus()
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
