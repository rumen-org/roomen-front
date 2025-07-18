<template>
  <div>
    <div class="address-table">
      <table>
        <caption>
          선택, 배송지명, 수령인, 주소, 휴대전화 항목으로 구성된 배송지관리 목록표
        </caption>
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 15%" />
          <col style="width: 15%" />
          <col style="width: 20%" />
          <col style="width: 40%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">배송지명</th>
            <th scope="col">수령인</th>
            <th scope="col">휴대전화</th>
            <th scope="col">주소</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="shipAddressList">
            <tr v-for="(item, idx) in shipAddressList" :key="idx">
              <td>
                <span class="checkbox no-txt">
                  <input
                    :id="`chk0101+${idx}`"
                    v-model="selectedItems"
                    type="checkbox"
                    :value="item.id"
                  />
                  <label :for="`chk0101+${idx}`">선택</label>
                </span>
              </td>
              <td>
                <div class="name-box">
                  <p>{{ item.name }}</p>
                  <span v-if="item.default" class="default-mark">기본</span>
                </div>
              </td>
              <td>{{ item.receiver }}</td>
              <td>
                <div class="pos-relative">
                  {{ item.phone }}
                  <div :class="{ w30per: btnState }" class="w0 toggle-btn">
                    <button type="button" class="btn s-large d-block" @click="fetchDefault(item.id)">
                      <span> 선택 </span>
                    </button>
                  </div>
                </div>
              </td>
              <td>{{ item.address }}</td>
            </tr>
          </template>
          <template v-if="!shipAddressList || shipAddressList.length === 0">
            <tr>
              <td colspan="5" class="empty-center">등록 된 주소가 없습니다.</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!--// address-table -->
    <!-- all-btn-area -->
    <div class="all-btn-area">
      <button
        type="button"
        class="btn chckBtn"
        :disabled="!shipAddressList.length"
        @click="toggleAllSelect"
      >
        {{ allSelectState ? '전체해제' : '전체선택' }}
      </button>
      <button
        type="button"
        class="btn chckBtn"
        :disabled="!shipAddressList.length"
        @click="removeMultipleItem(selectedItems)"
      >
        선택삭제
      </button>
    </div>
    <!--// all-btn-area -->
    <!-- bottomArea -->
    <div class="contents-bottom-area flex">
      <div></div>
      <!-- paging -->
      <div class="paging">
        <a href="" class="btn-prev disabled">이전 페이지</a>
        <strong>1</strong>
        <a href="" class="btn-next disabled">다음 페이지</a>
      </div>
      <!--// paging -->
      <!-- btn-area -->
      <div class="btn-area col-type">
        <button type="button" class="btn block-btn bg-white" @click="setDefault">
          기본배송지 설정
        </button>
        <button type="button" class="btn block-btn" @click="goWrite">배송지 등록</button>
      </div>
      <Alert />
      <!--// btn-area -->
    </div>
  </div>
</template>
<script lang="ts" setup>
// Router
import { useRouter } from 'vue-router'
const router = useRouter()
// stores
import { useUserStore } from '@/stores/loginStores'
const { userId } = storeToRefs(useUserStore())
// api
import {
  getAllShippingAddressesByMemberId,
  deleteMultipleShippingAddress,
  setDefaultShippingAddress
} from '@/api/shippingAddress'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

// Components
import Alert from '@/components/notifications/alert.vue'
// Composables
import { useAlert } from '@/composables/useAlert'
const { showAlert } = useAlert()

const goWrite = () => {
  router.push('/mypage/addShipAddress')
}
interface AddressListType {
  id: number
  address: string
  default: boolean
  memberId: number
  name: string
  phone: string
  receiver: string
}

const shipAddressList = ref<AddressListType[]>([])
const fetchAddresses = async () => {
  const transType = Number(userId.value)
  try {
    const response = await getAllShippingAddressesByMemberId(transType)
    shipAddressList.value = response.data
    console.log('addressList', response.data)
  } catch (error) {
    console.error(error)
  }
}

const selectedItems = ref<number[]>([])
const allSelectState = computed(() => selectedItems.value.length === shipAddressList.value.length)
const toggleAllSelect = () => {
  if (allSelectState.value) {
    selectedItems.value = [] // 전체 해제
  } else {
    selectedItems.value = shipAddressList.value.map(item => item.id) // 전체 선택
  }
}
// 체크된 아이템 삭제
const removeMultipleItem = async (ids: number[]) => {
  try {
    if (ids.length === 0) {
      showAlert('선택 된 항목이 없습니다.')
      return
    }
    await deleteMultipleShippingAddress(ids)
    await fetchAddresses()
    selectedItems.value = []
  } catch (error) {
    console.error(error)
  }
}

// 기본 배송지 선택
const btnState = ref<boolean>(false)
const setDefault = () => {
  btnState.value = !btnState.value
}
const fetchDefault = async (id: number) => {
  try {
    await setDefaultShippingAddress(id)
    await fetchAddresses()
    btnState.value = false
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchAddresses()
})
</script>

<style lang="scss" scoped>
.name-box {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.default-mark {
  display: inline-block;
  padding: 0 9px;
  background: #191919;
  font-size: 12px;
  color: #fff;
}
.d-block {
  display: block;
  width: 100%;
}
.w0 {
  width: 0;
  transition: width 0.2s ease;
}
.col-type {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.col-type button {
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
