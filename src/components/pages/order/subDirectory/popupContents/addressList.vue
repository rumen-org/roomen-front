<template>
  <h3 class="txt-c">배송지 변경</h3>
  <div class="scroll-area topLine">
    <ul v-if="shipAddressList">
      <li v-for="(pItem, i) in shipAddressList" :key="i" @click="selectItem(pItem)">
        <div class="tit-box">
          <strong>{{ pItem.name }}&nbsp;{{ pItem.receiver }}</strong>
          <em v-if="pItem.default" class="default-mark">기본</em>
        </div>
        <p>{{ pItem.address }}</p>
        <p>{{ pItem.phone }}</p>

        <button type="button" class="btn s-medium w100 selectedBtn">선택</button>
      </li>
    </ul>
    <dl v-else>
      <dt>
        <strong>등록 된 주소지가 없습니다.</strong>
      </dt>
      <dd>
        <router-link to="/mypage/addShipAddress">주소지 등록 페이지</router-link>
      </dd>
    </dl>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
interface EmitsAddress {
  address: string
  name: string
  receiver: string
  phone: string
}
// Stores
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/loginStores'
import { getAllShippingAddressesByMemberId } from '@/api/shippingAddress'
import { defineEmits } from 'vue'
const { userId } = storeToRefs(useUserStore())

const emits = defineEmits<{
  (e: 'contents', params: EmitsAddress): void
}>()

const newItem = ref<EmitsAddress>({
  address: '',
  name: '',
  receiver: '',
  phone: ''
})
const isOpen = defineModel<boolean>('isOpen', { required: true })
const selectItem = (params: AddressListType) => {
  newItem.value = {
    address: params.address,
    name: params.name,
    receiver: params.receiver,
    phone: params.phone
  }
  emits('contents', newItem.value)
  isOpen.value = false
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

onMounted(() => {
  if (userId.value) fetchAddresses()
})
</script>
<style scoped>
.default-mark {
  display: inline-block;
  padding: 0 9px;
  background: #191919;
  font-size: 12px;
  color: #fff;
}
.tit-box {
  display: flex;
  align-items: center;
  gap: 6px;
}

dl {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
  > dt,
  dd {
    flex: 1;
    text-align: center;
    > a {
      display: block;
      margin: 0 auto;
      max-width: 230px;
      height: 50px;
      line-height: 49px;
      border: 1px solid rgba(25, 25, 25, 0.5);
      background: #191919;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
