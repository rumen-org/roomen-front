<template>
  <div class="w670">
    <div class="conTopArea v2">
      <backButton />
    </div>
    <div class="inputTable">
      <table>
        <caption>
          배송지명, 수령인, 주소, 휴대전화 항목으로 구성된 배송지 등록표
        </caption>
        <colgroup>
          <col style="width: 25%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">배송지명</th>
            <td><input v-model="params.name" type="text" title="배송지명" /></td>
          </tr>
          <tr>
            <th scope="row">수령인</th>
            <td><input v-model="params.receiver" type="text" title="수령인" /></td>
          </tr>
          <tr>
            <th scope="row">주소</th>
            <td>
              <div class="address">
                <div class="zipCode">
                  <input type="text" title="우편번호 검색" :value="postcode" />
                  <button
                    type="button"
                    :disabled="!isScriptLoaded"
                    class="btn blockBtn"
                    @click="execDaumPostcode"
                  >
                    검색
                  </button>
                </div>
                <input type="text" title="주소" :value="roadAddress" />
                <input v-model="detailAddress" type="text" title="상세주소" />
                <!--              :value="extraAddress"-->
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">휴대전화</th>
            <td>
              <div class="phone">
                <select v-model="phonePrefix" title="휴대전화 앞 세자리">
                  <option v-for="(item, i) in mobileFrontNumber" :key="i" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
                <span>&mdash;</span>
                <input
                  v-model="phoneMiddle"
                  type="text"
                  title="휴대전화 가운데 네자리"
                  minlength="4"
                  maxlength="4"
                  @keydown="validateNumericInput"
                />
                <span>&mdash;</span>
                <input
                  v-model="phoneEnd"
                  type="text"
                  title="휴대전화 마지막 네자리"
                  minlength="4"
                  maxlength="4"
                  @keydown="validateNumericInput"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--// inputTable -->

    <!-- bottomBtn -->
    <div class="bottomBtn txtC">
      <button type="button" class="btn sL w230" @click="addItems">배송지 등록</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Router
import { useRouter } from 'vue-router'
const router = useRouter()

// Config
import { mobileFrontNumber } from '@/configs/selectOptions'

// 컴포넌트
import backButton from '@/components/button/backButton.vue'

// Api
import { postShipAddress } from '@/api/shippingAddress'
import { computed, reactive, ref } from 'vue'

const phonePrefix = ref<string>('')
const phoneMiddle = ref<string | null>(null)
const phoneEnd = ref<string | null>(null)

const fullPhone = computed(() => {
  return `${phonePrefix.value}-${phoneMiddle.value}-${phoneEnd.value}`
})
const fullAddress = computed(() => {
  // 각 주소 요소가 존재하는 경우만 문자열을 결합합니다.
  const parts = []
  if (postcode.value) parts.push(postcode.value) // reactive ref 사용
  if (roadAddress.value) parts.push(roadAddress.value) // reactive ref 사용
  if (detailAddress.value) parts.push(detailAddress.value) // reactive ref 사용
  return parts.join(', ')
})

// Composable
import { useAddress } from '@/composables/useAddress'
import { useValidate } from '@/composables/useValidate'
const { validateNumericInput } = useValidate()

const { postcode, roadAddress, isScriptLoaded, execDaumPostcode } = useAddress()

const detailAddress = ref<string>('')
const params = reactive({
  name: '',
  receiver: '',
  phone: '',
  address: '',
  default: false
})

const addItems = async () => {
  params.phone = fullPhone.value
  params.address = fullAddress.value
  console.log('params', params)
  console.log('fullAddress', fullAddress.value)
  try {
    const response = await postShipAddress(params)
    console.log('등록상태', response)
    goBack()
  } catch (error) {
    console.error(error)
  }
}
const goBack = () => {
  router.push('/mypage/shipAddress')
}
</script>
