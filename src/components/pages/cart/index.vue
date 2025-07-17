<template>
  <div id="container">
    <div class="contents">
      <!-- contents-top-area -->
      <Alert />
      <div class="contents-top-area v3">
        <h2>CART</h2>
      </div>
      <!--// contents-top-area -->
      <!-- cart-list -->
      <div v-if="cartItems.length" class="cart-list">
        <div v-for="(item, i) in cartItems" :key="i" class="goods">
          <div class="fixed">
            <span class="checkbox no-txt">
              <input
                :id="`chk0101+${i}`"
                v-model="selectedItems"
                type="checkbox"
                :value="item.id"
              />
              <label :for="`chk0101+${i}`">선택</label>
            </span>
            <p class="img w180">
              <img
                :src="item?.imgUrl ? `https://back.roomen.kro.kr/${item.imgUrl}` : ''"
                alt="상품 이미지"
              />
            </p>
          </div>
          <div>
            <p class="name">
              <strong>{{ item?.name }}</strong>
              <span class="font-g">{{ item?.subName }}</span>
            </p>
            <p class="price font-n">
              ₩ <em class="font-g">{{ formatPrice(item?.basicPrice) }}</em>
            </p>
            <p class="option">{{ item?.options }}</p>
            <countComponent :id="item?.id" :init-value="item?.quantity" @update="fixCartItem" />
          </div>
          <p class="total-price font-n">₩ <em class="font-g">1,400,000</em></p>
          <button type="button" class="btn-del" @click="removeCartItem(item.id)">
            <span class="hide">삭제</span>
          </button>
        </div>
      </div>
      <!--// cart-list -->
      <!-- all-btn-area -->
      <div v-else-if="!cartItems.length" class="empty-cart cart-list">
        <h3>
          <strong>장바구니가 비어 있습니다.</strong>
        </h3>
      </div>
      <div class="all-btn-area">
        <button
          type="button"
          class="btn chckBtn"
          :disabled="!cartItems.length"
          @click="toggleAllSelect"
        >
          {{ allSelectState ? '전체해제' : '전체선택' }}
        </button>
        <button
          type="button"
          class="btn chckBtn"
          :disabled="!cartItems.length"
          @click="removeMultipleCartItem(selectedItems)"
        >
          선택삭제
        </button>
      </div>
      <!--// all-btn-area -->
      <!-- btn-area -->
      <div class="btn-area txt-r">
        <button type="button" :disabled="selectedItems.length === 0" class="btn s-large w230">
          주문하기
        </button>
      </div>
      <!--// btn-area -->
    </div>
  </div>
</template>
<script setup lang="ts">
// 컴포넌트
import countComponent from '@/components/page_items/cart/count.vue'
import Alert from '@/components/notifications/alert.vue'
// 컴포저블
import { getCartItems, putCartItem, deleteCartItem, deleteMultipleCartItems } from '@/api/cart'
import { formatPrice } from '@/composables/useCalculate'
import { useAlert } from '@/composables/useAlert'

const { showAlert } = useAlert()

// vue 요소
import { computed, onMounted, ref } from 'vue'

export interface CartItem {
  id: number
  itemId: number
  memberId: number
  name: string
  subName: string
  imgUrl: string
  quantity: number
  basicPrice: number
  totalPrice: number
  options: string
}
const cartItems = ref<CartItem[]>([])

const fetchCartItems = async () => {
  try {
    const response = await getCartItems()
    cartItems.value = response.data
    console.log('responseCart', cartItems.value)
  } catch (error) {
    console.error(error)
  }
}

const fixCartItem = async (params: any) => {
  try {
    console.log('on_fix', params)
    const item = cartItems.value.find(cartItem => cartItem.id === params.id)
    if (item) {
      const payload = {
        quantity: params.value,
        options: item.options,
        totalPrice: item.totalPrice
      }
      const response = await putCartItem(params.id, payload)
      console.log('response_put', response)
    } else {
      console.log('notWork')
    }
  } catch (error) {
    console.error(error)
  }
}
// checkbox 기능
const selectedItems = ref<number[]>([])

const allSelectState = computed(() => selectedItems.value.length === cartItems.value.length)

const toggleAllSelect = () => {
  if (allSelectState.value) {
    selectedItems.value = [] // 전체 해제
  } else {
    selectedItems.value = cartItems.value.map(item => item.id) // 전체 선택
  }
}

// 단일요소 삭제
const removeCartItem = async (id: number) => {
  try {
    const response = await deleteCartItem(id)
    await fetchCartItems()
    selectedItems.value = selectedItems.value.filter(item => item !== id)
    console.log('response', response)
  } catch (error) {
    console.error(error)
  }
}
// 복수요소 삭제
const removeMultipleCartItem = async (ids: number[]) => {
  try {
    if (ids.length === 0) {
      showAlert('선택 된 항목이 없습니다.')
      return
    }
    await deleteMultipleCartItems(ids)
    await fetchCartItems()
    selectedItems.value = []
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchCartItems()
})
</script>

<style scoped lang="scss"></style>
