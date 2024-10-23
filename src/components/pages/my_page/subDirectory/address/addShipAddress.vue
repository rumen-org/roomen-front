<template>
  <div class="w670">
    <div class="conTopArea v2">
      <backButton />

    </div>
    <div class="inputTable">
      <table>
        <caption>배송지명, 수령인, 주소, 휴대전화 항목으로 구성된 배송지 등록표</caption>
        <colgroup>
          <col style="width:25%">
          <col style="width:auto">
        </colgroup>
        <tbody>
        <tr>
          <th scope="row">배송지명</th>
          <td><input type="text" title="배송지명" v-model="params.name"></td>
        </tr>
        <tr>
          <th scope="row">수령인</th>
          <td><input type="text" title="수령인" v-model="params.receiver"></td>
        </tr>
        <tr>
          <th scope="row">주소</th>
          <td>
            <div class="address">
              <div class="zipCode">
                <input
                  type="text"
                  title="우편번호 검색"
                  :value="postcode"
                />
                <button
                  type="button"
                  @click="execDaumPostcode"
                  :disabled="!isScriptLoaded"
                  class="btn blockBtn"
                >검색</button>
              </div>
              <input
                type="text"
                title="주소"
                :value="roadAddress"
              />
              <input
                type="text"
                title="상세주소"
                v-model="detailAddress"
              />
<!--              :value="extraAddress"-->
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">휴대전화</th>
          <td>
            <div class="phone">
              <select title="휴대전화 앞 세자리" v-model="phonePrefix">
                <option
                  v-for="(item, i) in mobileFrontNumber"
                  :key="i"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
              <span>&mdash;</span>
              <input
                type="text"
                title="휴대전화 가운데 네자리"
                v-model="phoneMiddle"
                @input="handleInput($event, 'middle')"
                minlength="4"
                maxlength="4"
              />
              <span>&mdash;</span>
              <input
                type="text"
                title="휴대전화 마지막 네자리"
                v-model="phoneEnd"
                @input="handleInput($event, 'end')"
                minlength="4"
                maxlength="4"
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
      <button
        type="button"
        @click="addItems"
        class="btn sL w230"
      >배송지 등록</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Router
import { useRouter } from "vue-router";
const router = useRouter();

// Config
import { mobileFrontNumber } from '@/configs/selectOptions'

// 컴포넌트
import backButton from '@/components/button/backButton.vue'

// Api
import { postShipAddress } from '@/api/shippingAddress'
import {computed, reactive, ref} from "vue";

const phonePrefix =  ref<string>('');
const phoneMiddle =  ref<string|null>(null);
const phoneEnd = ref<string|null>(null);

const fullPhone = computed(() => {
  return `${phonePrefix.value}-${phoneMiddle.value}-${phoneEnd.value}`;
});
const fullAddress = computed(() => {
  // 각 주소 요소가 존재하는 경우만 문자열을 결합합니다.
  const parts = [];
  if (postcode.value) parts.push(postcode.value); // reactive ref 사용
  if (roadAddress.value) parts.push(roadAddress.value); // reactive ref 사용
  if (detailAddress.value) parts.push(detailAddress.value); // reactive ref 사용
  return parts.join(', ');

});

// Composable
import { useAddress } from '@/composables/useAddress'
import { useValidate } from '@/composables/useValidate'
const { validateNumericInput } = useValidate();

const handleInput = (event: Event, type: 'middle' | 'end') => {
  const target = event.target as HTMLInputElement;
  const validatedValue = validateNumericInput(target.value); // 숫자만 남김

  if (type === 'middle') {
    phoneMiddle.value = validatedValue; // v-model과 동기화
  } else if (type === 'end') {
    phoneEnd.value = validatedValue; // v-model과 동기화
  }
};


const {
  postcode, roadAddress, isScriptLoaded, execDaumPostcode
} = useAddress();

const detailAddress = ref<string>('');
const params = reactive({
    name: '',
    receiver: '',
    phone : '',
    address: '',
    default: false
})

const addItems = async () => {
  params.phone = fullPhone.value;
  params.address = fullAddress.value;
  console.log('params', params);
  console.log('fullAddress',fullAddress.value)
  try {
    const response = await postShipAddress(params);
    console.log('등록상태', response);
    goBack();
  } catch (error) {
    console.error(error);
  }
}
const goBack = () => {
  router.push('/mypage/shipAddress');
}
</script>