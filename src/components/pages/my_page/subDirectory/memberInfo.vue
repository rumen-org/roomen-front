<template>
  <div class="input-table w670">
    <table>
      <caption>
        아이디, 비밀번호, 비밀번호 확인, 이름, 주소, 휴대전화, 이메일 항목으로 구성된 회원가입
        정보수정 표
      </caption>
      <colgroup>
        <col style="width: 25%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">아이디</th>
          <td>{{ fetchItem.memberId }}</td>
        </tr>
        <tr>
          <th scope="row">
            비밀번호 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red input-check2': errors.password }">
            <input
              v-model="passwordValue"
              type="password"
              title="비밀번호"
              placeholder="(기존 비밀번호를 입력 해주세요.)"
              minlength="8"
              @blur="[validateEmpty($event, 'password'), validatePassword($event)]"
            />
            <span v-if="errors.password" class="error">{{ errors.password }}</span>
          </td>
        </tr>

        <tr>
          <th scope="row">
            이름 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td>
            <input type="text" class="input-name" title="이름" :value="fetchItem.name" readonly />
          </td>
        </tr>
        <tr>
          <th scope="row">주소</th>
          <td>
            <div class="address">
              <div class="zip-code">
                <input v-model="addressCodeParts" type="text" title="우편번호 검색" />
                <button
                  type="button"
                  class="btn block-btn"
                  :disabled="!isScriptLoaded"
                  @click="execDaumPostcode"
                >
                  검색
                </button>
              </div>
              <input v-model="addressRoadParts" type="text" title="주소" />
              <input v-model="addressDetailParts" type="text" title="상세주소" />
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            휴대전화 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td>
            <div class="phone">
              <select v-model="mobileNumbers.phonePrefix" title="휴대전화 앞 세자리" required>
                <option v-for="(item, idx) in mobileFrontNumber" :key="idx" :value="item.value">
                  {{ item.label }}
                </option>
              </select>
              <span>&mdash;</span>
              <input
                v-model="mobileNumbers.phoneMiddle"
                type="text"
                title="휴대전화 가운데 네자리"
                minlength="4"
                maxlength="4"
                @keydown="validateNumericInput"
              />
              <span>&mdash;</span>
              <input
                v-model="mobileNumbers.phoneEnd"
                type="text"
                title="휴대전화 마지막 네자리"
                minlength="4"
                maxlength="4"
                @keydown="validateNumericInput"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            이메일 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
          </th>
          <td :class="{ 'red input-check2': errors.email }">
            <input
              v-model="emailValue"
              type="text"
              title="이메일"
              @blur="[validateEmpty($event, 'email'), validateEmail($event)]"
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-30 txt-r">
      <button type="button" class="txt-btn memCancel" @click="checkRemove">회원탈퇴</button>
    </div>
  </div>
  <Alert />
  <Confirm />
  <div class="bottom-btn">
    <button type="button" class="btn" @click="submitUpdate">회원정보 수정</button>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'

// Components
import Alert from '@/components/notifications/alert.vue'
import Confirm from '@/components/notifications/confirm.vue'

// Composable
import { useValidate } from '@/composables/useValidate'
const { errors, validateEmail, validateEmpty, validateNumericInput, validatePassword } =
  useValidate()
import { useAlert } from '@/composables/useAlert'
import { useConfirm } from '@/composables/useConfirm'

const { showAlert } = useAlert()
const { showConfirm } = useConfirm()
// config
import { mobileFrontNumber } from '@/configs/selectOptions'

// Kakao Post
import { useAddress } from '@/composables/useAddress'
const { postcode, roadAddress, isScriptLoaded, execDaumPostcode } = useAddress()

// Stores
import { useUserStore } from '@/stores/loginStores'
const userStore = useUserStore()

// Api
import { getMyInformation, updateInformation, deleteAccount } from '@/api/account'

interface fetchItemData {
  memberId: string
  name: string
  phone: string
  email: string
  address: string
}
const fetchItem = ref<fetchItemData>({
  memberId: '',
  name: '',
  phone: '',
  email: '',
  address: ''
})

const fetchInformation = async () => {
  try {
    const response = await getMyInformation()
    fetchItem.value = response.data
    initData()
  } catch (error) {
    console.error('error', error)
  }
}
const addressParts = computed(() => {
  return fetchItem.value.address.split(',')
})
const addressCodeParts = computed(() => {
  return postcode.value ? postcode.value?.trim() : addressParts.value[0]?.trim()
})
const addressRoadParts = computed(() => {
  return roadAddress.value ? roadAddress.value?.trim() : addressParts.value[1]?.trim()
})
const addressDetailParts = ref<string>('')
// initData
const initData = () => {
  mobileNumbers.phonePrefix = fetchItem.value.phone.slice(0, 3)
  mobileNumbers.phoneMiddle = fetchItem.value.phone.slice(4, 8)
  mobileNumbers.phoneEnd = fetchItem.value.phone.slice(-4)

  emailValue.value = fetchItem.value.email

  addressDetailParts.value = addressParts.value[2]?.trim()
}

const passwordValue = ref<string>('')
const mobileNumbers = reactive({
  phonePrefix: '',
  phoneMiddle: '',
  phoneEnd: ''
})
const emailValue = ref<string>('')

const submitUpdate = async () => {
  try {
    if (mobileNumbers.phonePrefix === '') showAlert('번호를 선택 주세요.')
    if (mobileNumbers.phoneMiddle.length < 3) showAlert('번호를 입력해 주세요.')
    if (mobileNumbers.phoneEnd.length < 3) showAlert('번호를 입력해 주세요.')
    if (passwordValue.value === '') showAlert('비밀번호를 입력해주세요.')

    const params = {
      phone: `${mobileNumbers.phonePrefix}-${mobileNumbers.phoneMiddle}-${mobileNumbers.phoneEnd}`,
      email: emailValue.value,
      address: `${addressCodeParts.value}, ${addressRoadParts.value}, ${addressDetailParts.value}`,
      currentPassword: passwordValue.value
    }
    console.log('putParams', params)
    const response = await updateInformation(params)
    console.log('put_response', response)
    await fetchInformation()
  } catch (error) {
    console.error(error)
  }
}
const checkRemove = () => {
  showConfirm(
    `취소하시면 입력하신 정보가 사라집니다.\n취소하시겠습니까?`,
    async () => {
      await removeAccount()
    },
    () => {}
  )
}
const removeAccount = async () => {
  try {
    await deleteAccount()
    userStore.logout()
    showAlert('회원탈퇴가 되었습니다. \n이용해주셔서 감사합니다.')
  } catch (error) {
    console.error(error)
    showAlert('비밀번호를 확인해 주세요.')
  }
}
onMounted(() => {
  fetchInformation()
})
</script>

<style scoped lang="scss">
input[type='text'].input-name:read-only {
  opacity: 0.7;
}
</style>
