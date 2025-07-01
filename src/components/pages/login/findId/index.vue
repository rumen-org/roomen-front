<template>
  <div id="container">
    <div class="contents">
      <!-- contents-top-area -->
      <div class="contents-top-area">
        <h2 class="ko">아이디 찾기</h2>
      </div>
      <!--// contents-top-area -->
      <div class="w670">
        <!-- input-table -->
        <div class="input-table">
          <table>
            <caption>
              회원유형, 이름, 아이디, 휴대전화 항목으로 구성된 비밀번호찾기 정보입력 표
            </caption>
            <colgroup>
              <col style="width: 25%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">회원유형</th>
                <td>
                  <select title="회원유형">
                    <option>개인회원</option>
                    <option>기업회원</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">이름</th>
                <td>
                  <input v-model="params.name" type="text" title="이름" />
                </td>
              </tr>
              <tr class="auto-height">
                <th></th>
                <td>
                  <!-- checkbox-wrap -->
                  <div class="checkbox-wrap">
                    <span class="checkbox">
                      <input
                        id="chk0101"
                        v-model="useType"
                        type="radio"
                        name="chk01"
                        checked
                        value="mobile"
                        @change="handleChange"
                      />
                      <label for="chk0101">휴대전화</label>
                    </span>
                    <span class="checkbox">
                      <input
                        id="chk0102"
                        v-model="useType"
                        type="radio"
                        name="chk01"
                        value="email"
                        @change="handleChange"
                      />
                      <label for="chk0102">이메일</label>
                    </span>
                  </div>
                  <!--// checkbox-wrap -->
                </td>
              </tr>
              <tr v-if="useType === 'mobile'">
                <th class="pt-row" scope="row">휴대전화</th>
                <td class="pt-row">
                  <div class="phone">
                    <select v-model="phoneNumber.first" title="휴대전화 앞 세자리">
                      <option v-for="(item, i) in firstNumber" :key="i" :value="item.value">
                        {{ item.label }}
                      </option>
                    </select>
                    <span>&mdash;</span>
                    <input
                      v-model="phoneNumber.second"
                      type="text"
                      title="휴대전화 가운데 네자리"
                      minlength="4"
                      maxlength="4"
                      @keydown="validateNumericInput"
                    />
                    <span>&mdash;</span>
                    <input
                      v-model="phoneNumber.third"
                      type="text"
                      title="휴대전화 마지막 네자리"
                      minlength="4"
                      maxlength="4"
                      @keydown="validateNumericInput"
                    />
                  </div>
                </td>
              </tr>
              <tr v-if="useType === 'email'">
                <th class="pt-row" scope="row">이메일</th>
                <td class="pt-row">
                  <div class="email">
                    <input
                      v-model="emailValue"
                      type="text"
                      @blur="[validateEmpty($event, 'email'), validateEmail($event)]"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--// input-table -->
        <!-- bottom-btn -->
        <div class="bottom-btn txt-c">
          <button type="button" class="btn s-large w230" @click="fetchData()">아이디 찾기</button>
        </div>
        <!--// bottom-btn -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Api
import { findMemberId } from '@/api/account'
// Composable
import { useValidate } from '@/composables/useValidate'
const { validateNumericInput, validateEmail, validateEmpty } = useValidate()

// Config
import { mobileFrontNumber } from '@/configs/selectOptions'
import { computed, reactive, ref } from 'vue'
const firstNumber = computed(() => {
  return mobileFrontNumber
})

// Models
import { FindId } from '@/models/interfaces/Accounts'
import type { FindUserType, PhoneNumberType } from '@/models/type/typeList'

// Router
import { useRouter } from 'vue-router'
const router = useRouter()
// Stores
import { useFindAccountStore } from '@/stores/findAccount'
const { setFindIdResult } = useFindAccountStore()
const useType = ref<FindUserType>('mobile')
const params = reactive({
  name: '',
  type: useType.value as FindUserType,
  value: ''
}) as FindId
const fetchData = async () => {
  try {
    getValue()
    console.log(params, ' params')
    const response = await findMemberId(params)
    const { count, account } = response.data
    setFindIdResult({ count, account })
    await router.push('/login/result') // 결과 페이지로 이동
  } catch (error) {
    console.error(error)
  }
}
const handleChange = () => {
  params.type = useType.value
  removePhones()
}
const emailValue = ref<string>('')
const phoneNumber = reactive({
  first: '',
  second: '',
  third: ''
})
const removePhones = () => {
  if (params.type === 'mobile') {
    emailValue.value = ''
  } else if (params.type === 'email') {
    for (const key in phoneNumber) {
      phoneNumber[key as keyof PhoneNumberType] = ''
    }
  }
}
const getValue = () => {
  if (params.type === 'mobile') {
    params.value = `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`
  } else if (params.type === 'email') {
    params.value = emailValue.value
  }
}
</script>
<style scoped>
.pt-row {
  padding-top: 40px;
}
</style>
