<template>
  <div>
    <div class="adressTable">
      <table>
        <caption>선택, 배송지명, 수령인, 주소, 휴대전화 항목으로 구성된 배송지관리 목록표</caption>
        <colgroup>
          <col style="width:50px">
          <col style="width:200px" span="2" class="mw100">
          <col style="width:270px">
          <col style="width:200px" class="mw100">
        </colgroup>
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">배송지명</th>
          <th scope="col">수령인</th>
          <th scope="col">주소</th>
          <th scope="col">휴대전화</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="shipAddressList">
          <tr v-for="(item, idx) in shipAddressList" :key="idx">
            <td>
            <span class="checkbox noTxt">
              <input
                type="checkbox"
                :value="item.id"
                :id="`chk0101+${idx}`"
                v-model="selectedItems"
              >
              <label :for="`chk0101+${idx}`">선택</label>
            </span>
            </td>
            <td>
              <div class="name-box">
                <p>{{ item.name }}</p>
                <span
                  v-if="item.default"
                  class="default-mark"
                >기본</span>
              </div>
            </td>
            <td>{{ item.receiver }}</td>
            <td>{{ item.address }}</td>
            <td class="pos-relative">
                {{ item.phone }}
              <div
                :class="{'w25per': btnState}"
                class="w0 toggle-btn"
              >
                <button
                  type="button"
                  @click="fetchDefault(item.id)"
                  class="btn sL d-block"
                >
                  <span>
                    선택
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-if="!shipAddressList">
          <td colspan="5">
            <div class="empty-center">
              <strong>등록 된 주소가 없습니다.</strong>
            </div>
          </td>
        </template>
        </tbody>
      </table>
    </div>
    <!--// adressTable -->
    <!-- allBtnArea -->
    <div class="allBtnArea">
      <button
          type="button"
          @click="toggleAllSelect"
          class="btn chckBtn"
          :disabled="!shipAddressList.length"
      >
        {{ allSelectState ? '전체해제' : '전체선택' }}
      </button>
      <button
          type="button"
          @click="removeMultipleItem(selectedItems)"
          class="btn chckBtn"
          :disabled="!shipAddressList.length"
      >
        선택삭제
      </button>
    </div>
    <!--// allBtnArea -->
    <!-- bottomArea -->
    <div class="conBottomArea">
      <!-- paging -->

      <!--// paging -->
      <!-- btnArea -->
      <div class="btnArea col-type">
        <button
          type="button"
          @click="setDefault"
          class="btn blockBtn sL w230 bgWhite"
        >기본배송지 설정</button>
        <button
          type="button"
          @click="goWrite"
          class="btn blockBtn sL w230"
        >배송지 등록</button>
      </div>
      <Alert />
      <!--// btnArea -->
    </div>
  </div>
</template>
<script lang="ts" setup >
// Router
import { useRouter } from 'vue-router';
const router = useRouter();
// stores
import { useUserStore } from "@/stores/loginStores"
const { userId } = storeToRefs(useUserStore());
// api
import {
  getAllShippingAddressesByMemberId,
  deleteMultipleShippingAddress,
  setDefaultShippingAddress
} from "@/api/shippingAddress";
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";


// Components
import Alert from '@/components/notifications/alert.vue'
// Composables
import { useAlert } from '@/composables/useAlert'
const { showAlert } = useAlert();

const goWrite = () => {
  router.push('/mypage/addShipAddress');
}
interface AddressListType {
  id: number;
  address: string;
  default: boolean;
  memberId: number;
  name: string;
  phone: string;
  receiver: string;
}

const shipAddressList = ref<AddressListType[]>([])
const fetchAddresses = async () => {
  const transType = Number(userId.value);
  try {
    const response = await getAllShippingAddressesByMemberId(transType);
    shipAddressList.value = response.data;
    console.log('addressList', response.data)
  } catch (error) {
    console.error(error);
  }
}

const selectedItems = ref<number[]>([]);
const allSelectState = computed(() =>
    selectedItems.value.length === shipAddressList.value.length
)
const toggleAllSelect = () => {
  if (allSelectState.value) {
    selectedItems.value = []; // 전체 해제
  } else {
    selectedItems.value = shipAddressList.value.map(item => item.id); // 전체 선택
  }
}
// 체크된 아이템 삭제
const removeMultipleItem = async (ids: number[]) => {
  try {
    if (ids.length === 0) {
      showAlert('선택 된 항목이 없습니다.')
      return;
    }
    await deleteMultipleShippingAddress(ids);
    await fetchAddresses();
    selectedItems.value = [];

  } catch(error) {
    console.error(error);
  }
}

// 기본 배송지 선택
const btnState = ref<boolean>(false);
const setDefault = () => {
  btnState.value = !btnState.value;
}
const fetchDefault = async (id: number) => {
  try {
    await setDefaultShippingAddress(id);
    await fetchAddresses();
    btnState.value = false;
  } catch(error) {
    console.error(error);
  }
}
onMounted(() => {
  fetchAddresses();
})
</script>

<style lang="scss" scoped>
.empty-center {
  text-align: center;
  padding: 20px 30px;
}
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
.pos-relative {
  position: relative;
}
.w0 {
  width: 0;
  transition: width 0.2s ease;
}
.w25per {
  width: 25%;
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
.toggle-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>