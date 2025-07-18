<template>
  <dl class="section-title">
    <dt>배송 정보</dt>
    <dd><span class="blind">제목 하단 선</span></dd>
  </dl>
  <!-- conTable -->
  <div class="con-table topLine">
    <!-- input-table -->
    <div class="input-table v2">
      <table>
        <caption>
          배송지 설정, 수령인, 주소, 휴대전화, 이메일, 배송 메세지 항목으로 구성된 배송정보 상세 표
        </caption>
        <colgroup>
          <col style="width: 18%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr class="m-flex">
            <th scope="row">
              <span class="checkbox">
                <input id="chk0101" v-model="sameInfo" type="checkbox" @change="toggleInfo" />
                <label for="chk0101">회원정보와 동일</label>
              </span>
            </th>
            <!-- 레이어 팝업 -->
            <td>
              <div class="layerPopup">
                <button
                  type="button"
                  class="btn bg-white s-medium w130 popBtn"
                  @click.stop="openAddressList"
                >
                  배송지 변경
                </button>
                <!-- 배송지변경 팝업 -->
                <ChangeAddressPopup v-model:isOpen="isOpen" :class="{ 'on': isOpen }">
                  <template #type2Layer>
                    <PopupContents v-model:isOpen="isOpen" @contents="handleContents" />
                  </template>
                </ChangeAddressPopup>
                <!--// 배송지변경 팝업 -->
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              수령인 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td :class="{ 'red input-check': errors.name }">
              <input
                v-model="toggleValue.name"
                type="text"
                title="수령인"
                placeholder="수령인의 이름을 입력해주세요."
                @blur="[validateEmpty($event, 'name'), validateKoreanName($event)]"
              />
              <span v-if="errors.name" class="error">{{ errors.name }}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              주소 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td>
              <div class="address">
                <div class="zip-code">
                  <input
                    v-model="toggleAddress.getPostCode"
                    type="text"
                    title="우편번호 검색"
                    placeholder="우편번호"
                  />
                  <button
                    type="button"
                    class="btn block-btn"
                    :disabled="!isScriptLoaded"
                    @click="execDaumPostcode"
                  >
                    검색
                  </button>
                </div>
                <input v-model="toggleAddress.getRoadAddress" type="text" title="주소" placeholder="주소"/>
                <input
                  v-model="toggleAddress.getDetailAdress"
                  maxlength="20"
                  type="text"
                  title="상세주소"
                  placeholder="상세주소를 입력하세요."
                />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              휴대전화 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td>
              <div class="phone w480">
                <select title="휴대전화 앞 세자리">
                  <option
                    v-for="(item2, idx2) in frontNumber"
                    :key="idx2"
                    :selected="toggleValue.phoneFrontNumber === item2.value ?? item2.value"
                    :value="item2.value"
                  >
                    {{ item2.label }}
                  </option>
                </select>
                <span>&mdash;</span>
                <input
                  v-model="toggleValue.phoneMiddleNumber"
                  minlength="4"
                  maxlength="4"
                  type="text"
                  title="휴대전화 가운데 네자리"
                  @keydown="validateNumericInput"
                />
                <span>&mdash;</span>
                <input
                  v-model="toggleValue.phoneEndNumber"
                  minlength="4"
                  maxlength="4"
                  type="text"
                  title="휴대전화 마지막 네자리"
                  @keydown="validateNumericInput"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              이메일 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td :class="{ 'red input-check': errors.email }">
              <input
                v-model="toggleValue.email"
                type="text"
                title="이메일"
                minlength="10"
                maxlength="40"
                placeholder="이메일을 입력하세요."
                @blur="[validateEmpty($event, 'email'), validateEmail($event)]"
              />
              <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">배송 메세지</th>
            <td>
              <input
                type="text"
                title="배송 메세지"
                placeholder="배송 요청사항을 입력해주세요."
                maxlength="30"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--// input-table -->
  </div>
  <!--// conTable -->
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
// Models
import type { PayState } from '@/models/type/typeList'
import {
  Customer,
  type memberInfoItem,
  type toggleAddressType,
  type toggleItem
} from '@/models/interfaces/Payment'

const props = defineProps<{
  callInfo: PayState
}>()
// Api
import { getMyInformation } from '@/api/account'

// Components
import ChangeAddressPopup from '@/components/teleport/layerPopupType2.vue'
import PopupContents from '@/components/pages/order/subDirectory/popupContents/addressList.vue'
// Composable
import { useAddress } from '@/composables/useAddress'
const { postcode, roadAddress, isScriptLoaded, stateChanged, execDaumPostcode } = useAddress()
import { useValidate } from '@/composables/useValidate'
const { errors, validateKoreanName, validateEmail, validateEmpty, validateNumericInput } =
  useValidate()
// import { usePayments } from '@/composables/usePayment'
// const { setBuyerInfo } = usePayments()

// Config
import { mobileFrontNumber } from '@/configs/selectOptions'

// Api
import { getMyDefaultAddress } from '@/api/shippingAddress'

// Stores
import { usePaymentStore } from '@/stores/payments'
const paymentStore = usePaymentStore()

const frontNumber = computed(() => {
  return mobileFrontNumber
})
const sameInfo = ref<boolean>(false)
const toggleInfo = async () => {
  console.log('onToggleInfo')
  if (sameInfo.value) {
    await fetchData()
    stateChanged.value = false
  }
}
const memberInfo = ref<memberInfoItem>()
const toggleValue = computed<toggleItem>(() => {
  if (sameInfo.value && memberInfo.value) {
    const [front, middle, end] = memberInfo.value.phone.split('-')
    return {
      name: memberInfo.value.name,
      phoneFrontNumber: front,
      phoneMiddleNumber: middle,
      phoneEndNumber: end,
      email: memberInfo.value.email
    }
  } else {
    return {
      name: '',
      phoneFrontNumber: '',
      phoneMiddleNumber: '',
      phoneEndNumber: '',
      email: ''
    }
  }
})
const toggleAddress = computed<toggleAddressType>(() => {
  return {
    getPostCode: postcode.value || defaultAddress.value.post,
    getRoadAddress: roadAddress.value || defaultAddress.value.road,
    getDetailAdress: stateChanged.value ? '' : defaultAddress.value.detail
  }
})
const defaultAddress = ref({
  post: '',
  road: '',
  detail: ''
})
const fetchData = async () => {
  try {
    const response = await getMyInformation()
    memberInfo.value = response.data
  } catch (error) {
    console.error(error)
  }
}
const fetchAddress = async () => {
  try {
    const response = await getMyDefaultAddress()
    defaultAddress.value.post = response.data.address.split(', ')[0]
    defaultAddress.value.road = response.data.address.split(', ')[1]
    defaultAddress.value.detail = response.data.address.split(', ')[2]
    if (response) {
      console.log('DefaultAddressResponse', response)
    }
  } catch (error) {
    console.error(error)
  }
}

// 레이어팝업 (팝업이 복수로 나올 수 있길에 별도 함수 사용)
const isOpen = ref<boolean>(false)
const openAddressList = () => {
  isOpen.value = true
}
interface EmitsAddress {
  address: string
  name: string
  receiver: string
  phone: string
}
// 레이어팝업에서 값 받을 시
const handleContents = (p: EmitsAddress) => {
  if (p) {
    stateChanged.value = false
    postcode.value = ''
    roadAddress.value = ''
    defaultAddress.value.post = p?.address.split(', ')[0]
    defaultAddress.value.road = p?.address.split(', ')[1]
    defaultAddress.value.detail = p?.address.split(', ')[2]
    if (memberInfo.value !== undefined) {
      memberInfo.value.name = p.receiver
      memberInfo.value.phone = p.phone
    }
  }
}
const customerInfo = ref<Customer>({
  email: toggleValue.value.email,
  name: toggleValue.value.name,
  tel: `${toggleValue.value.phoneFrontNumber}-${toggleValue.value.phoneMiddleNumber}-${toggleValue.value.phoneEndNumber}`,
  addr: `${toggleAddress.value.getRoadAddress}, ${toggleAddress.value.getDetailAdress}`,
  postcode: toggleAddress.value.getPostCode
})
const updateCustomer = () => {
  paymentStore.setCustomer(customerInfo.value)
}
onMounted(() => {
  fetchAddress()
  if (props.callInfo === 'paying') {
    updateCustomer()
  }
})
</script>

<style scoped>
::placeholder {
  opacity: 0.5;
}
.input-table tr td select {
  font-weight: 300;
}
input[type='text']:read-only {
  opacity: 1;
  background-color: #ffffff;
}
</style>
