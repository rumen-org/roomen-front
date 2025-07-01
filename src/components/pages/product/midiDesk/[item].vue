<template>
  <div id="container" ref="containerRef" class="products">
    <BackButton />
    <!--        <div v-if="loading" class="spinner">Loading...</div>-->
    <div :class="{ loading: loading }" class="contents">
      <!-- product-detail -->
      <div class="product-detail">
        <!-- fixArea -->
        <div class="fixArea">
          <!-- img-list -->
          <div class="img-list">
            <div class="pre-list">
              <div>
                <div v-for="(item, i) in product?.images" :key="i" @click="changeThumb(item)">
                  <img :src="`https://back.roomen.kro.kr/${item}`" alt="상품 이미지 리스트" />
                  <em :class="thumbImg !== item ? 'opacity-cover' : 'blind'"></em>
                </div>
              </div>
            </div>
            <transition name="fade">
              <div v-if="showTransitions" class="pre-area">
                <img
                  :src="
                    thumbImg !== null
                      ? `https://back.roomen.kro.kr/${thumbImg}`
                      : `https://back.roomen.kro.kr/${product?.images[0]}`
                  "
                  alt="대표상품 이미지"
                />
              </div>
            </transition>
          </div>
          <!--// img-list -->

          <!-- float-menu -->
          <aside class="float-menu">
            <div ref="floatingMenu" class="float-scroll">
              <strong class="tit">{{ product?.name }}</strong>
              <p class="sub-title font-g">{{ product?.subTitle }}</p>
              <p v-if="product" class="price">
                <span
                  >₩ {{ formatPrice(getOriginPrice(product.price, product.discountPer)) }}원</span
                >
                <del>₩ {{ formatPrice(product.price) }}원</del>
              </p>
              <div class="radio-option-area">
                <RadioPalette :key="SelectKey" :pallete="palleteData" @change="handleChange" />
                <RadioPalette :key="SelectKey" :pallete="palleteData2" @change="handleChange" />
              </div>
              <div class="option-area">
                <SelectOptions :key="SelectKey" :selector="shippingOption" @change="handleChange" />
                <SelectOptions
                  :key="SelectKey"
                  :selector="shippingOption2"
                  @change="handleChange"
                />
              </div>
              <template v-if="getOptionList.rows.length > 0">
                <div v-for="(item, i) in getOptionList.rows" :key="i">
                  <countComponent
                    :title="product?.name"
                    :items="item"
                    :index="i"
                    @delete-item="removeItem(i)"
                    @update="getQuantity"
                  />
                </div>
              </template>

              <em class="wide-line"><span class="blind">구분선</span></em>
              <div class="total-price">
                <span class="font-g">TOTAL</span>
                <em>₩ {{ formatPrice(getPrice) }}</em>
              </div>
              <div class="btn-area">
                <button type="button" class="btn s-large" @click="gotoOrder">구매하기</button>
                <button type="button" class="btn bg-white cart-btn" @click="handleConfirm">
                  <i>
                    <span class="hide">장바구니</span>
                  </i>
                </button>
              </div>
            </div>
          </aside>
          <!--// float-menu -->

          <div class="detail">
            <div v-dompurify-html="product?.content" class="inner"></div>
          </div>
          <em class="wide-line wide-line2"><span class="blind">구분선</span></em>
          <div class="product-information">
            <h4>상품결제안내</h4>
            <div></div>
            <h4>배송안내</h4>
            <div></div>
            <h4>교환 & 반품안내</h4>
            <div></div>
          </div>
        </div>
        <!-- fixArea -->
      </div>
      <!--// product-detail -->
    </div>
    <Confirm />
    <Alert />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
// Components
import BackButton from '@/components/button/backButton.vue'
import RadioPalette from '@/components/page_items/product/detailColor.vue'
import SelectOptions from '@/components/page_items/product/detailOptionSelect.vue'
import countComponent from '@/components/page_items/product/detailCount.vue'
import Confirm from '@/components/notifications/confirm.vue'
import Alert from '@/components/notifications/alert.vue'

// Composable
import { useConfirm } from '@/composables/useConfirm'
import { useAlert } from '@/composables/useAlert'

const { showConfirm } = useConfirm()
const { showAlert } = useAlert()

// api
import { getProductItem } from '@/api/product'
import { postCartItems } from '@/api/cart'
// stores
import { useBucketStore } from '@/stores/bucket'
const bucketStore = useBucketStore()
import { useWindowResponsive } from '@/stores/windowResponsive'
import { useDomValues } from '@/stores/domValues'
const { getItems, getPrice } = storeToRefs(bucketStore)
const { windowState } = storeToRefs(useWindowResponsive())
const { footerOffsetTop } = storeToRefs(useDomValues())

// Models
import { BucketItems, ProductType, SelectedOption, GetItem } from '@/models/interfaces/Product'

const bucketItems = reactive<BucketItems>({
  id: 0,
  name: '',
  subName: '',
  quantity: 0,
  basicPrice: 0,
  options: '',
  totalPrice: 0,
  productId: '',
  imgUrl: ''
})
const initialBucketItems = {
  id: 0,
  name: '',
  subName: '',
  quantity: 0,
  basicPrice: 0,
  options: '',
  totalPrice: 0,
  imgUrl: ''
}
const showTransitions = ref<boolean>(false)
const resetBucketItems = () => {
  Object.assign(bucketItems, initialBucketItems)
}

const getQuantity = (a: never) => {
  const { i, q } = a
  bucketStore.setItemQuantity(i, q)
  console.log('getItems', getItems.value)
}

const bucketsId = ref<number>(0)
const addBuckets = () => {
  const info = product.value
  const options = getOptionList.rows[getOptionList.rows.length - 1]
  const transString = Object.values(options).join(' / ')
  let shippingPrice = 0
  Object.values(options).forEach(value => {
    if (value === 'paid') {
      shippingPrice = 5000 // 'price'일 때 배송비 5000 추가
    } else if (value === 'express') {
      shippingPrice = 10000
    }
  })

  if (info) {
    bucketItems.id = bucketsId.value
    bucketsId.value++
    bucketItems.productId = String(info.id)
    bucketItems.name = info.name
    bucketItems.subName = info.subTitle
    bucketItems.basicPrice = getOriginPrice(info.price, info.discountPer)
    bucketItems.quantity = 1
    bucketItems.options = transString
    bucketItems.imgUrl = product?.value?.images[0] as string
    bucketItems.totalPrice = getOriginPrice(info.price, info.discountPer) + shippingPrice
    bucketStore.setItems({ ...bucketItems })
    resetBucketItems()
  }
}

const removeItem = (id: number) => {
  getOptionList.rows.splice(id, 1)
  bucketStore.removeItems(id)
}

// 계산 utils
import { getOriginPrice, formatPrice } from '@/composables/useCalculate'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
// configs
import { commonRadios, shippingOption, shippingOption2 } from '@/configs/product'
import { storeToRefs } from 'pinia'
import { throttle } from 'lodash'

// 라우트
const route = useRoute()
const paramsItem = Number(route.params.item)
// Dom 객체
const containerRef = ref<HTMLElement | null>(null)
const floatingMenu = ref<HTMLElement | null>(null)
const outterHeight = ref<number>(window.outerHeight)

// s

const loading = ref(true)

const product = ref<ProductType | null>(null)
const thumbImg = ref<string | null>(null)
const changeThumb = (value: string) => {
  thumbImg.value = value
}
const fetchDetail = async (id: number) => {
  try {
    const response = await getProductItem(id)
    product.value = response.data
    showTransitions.value = true
  } catch (error) {
    console.error(error)
  } finally {
    await nextTick(() => {
      loading.value = false
      if (product.value?.images?.length) {
        thumbImg.value = product.value.images[0]
      }
    })
  }
}
const scrolling = throttle((e: Event) => {
  if (e && window?.scrollY && windowState.value === 'desktop') {
    if (window.scrollY + window.innerHeight > footerOffsetTop.value) {
      floatingMenu.value?.scrollTo({
        top: floatingMenu.value.scrollHeight,
        behavior: 'smooth'
      })
    } else if (e && window?.scrollY < 20) {
      floatingMenu.value?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
  if (e && floatingMenu.value) {
    outterHeight.value = window.outerHeight - floatingMenu.value?.offsetTop
  }
}, 100)
const createPalleteData = (type: number) => ({
  title: ['색상1 : 상판, 하부다리, 후면가림판', '색상2 : 건반트레이, 다리, 상단선반, 칸막이'],
  radios: commonRadios,
  id: ['color1', 'color2'],
  name: ['colorOptions1', 'colorOptions2'],
  type
})
const palleteData = createPalleteData(1)
const palleteData2 = createPalleteData(2)

const getOptionList = reactive<{ rows: SelectedOption[] }>({
  rows: []
})

const selectOptions = reactive<SelectedOption>({
  color1: '',
  color2: '',
  select1: '',
  select2: ''
})

const handleChange = (newValue: string, id: string) => {
  selectOptions[id as keyof SelectedOption] = newValue
  listWatcher()
}
// const isInit = ref<boolean>(false);
const handleInit = () => {
  SelectKey.value += 1
}
const listWatcher = () => {
  if (Object.values(selectOptions).some(value => value === '')) {
    return
  }
  if (getOptionList.rows.length < 5) {
    getOptionList.rows.push({ ...selectOptions })
    Object.keys(selectOptions).forEach(key => {
      selectOptions[key as keyof SelectedOption] = ''
    })
    handleInit()
    addBuckets()
  } else {
    showAlert('다섯개 까지만 선택 가능합니다.')
  }
}

const SelectKey = ref<number>(0)
const mapToCart = (getItems: GetItem[]) => {
  return getItems.map(item => ({
    itemId: item.id,
    name: item.name,
    subName: item.subName,
    quantity: item.quantity,
    basicPrice: item.basicPrice,
    options: item.options,
    totalPrice: item.totalPrice,
    imgUrl: item.imgUrl
  }))
}

// 언마운트 이전에 구매하기 진입인지 구분용.
const afterOrder = ref<boolean>(false)

// 주문페이지 이동
const gotoOrder = () => {
  afterOrder.value = true
  router.push('/order')
}
// Confirm
const handleConfirm = () => {
  showConfirm(
    `장바구니에 상품이 담겼습니다.\n 장바구니로 이동하겠습니까?`,
    async () => {
      await putCart()

      await router.push(`/cart`)
    },
    () => {}
  )
}

const putCart = async () => {
  try {
    const mappedItems = mapToCart(getItems.value)
    const response = await postCartItems(mappedItems)
    console.log('response', response)
  } catch (error) {
    console.error(error)
  }
}

onBeforeMount(() => {
  fetchDetail(paramsItem)
})
onMounted(() => {
  window.addEventListener('scroll', scrolling)
})
bucketStore.clearAllItems()
// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('scroll', scrolling)
  if (!afterOrder.value) return bucketStore.clearAllItems()
})
</script>
<style lang="scss">
@use "/src/assets/style/mixin" as *;

.float-scroll {
  position: absolute;
  left: -10px;
  right: -10px;
  padding: 0 10px;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #fff;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  strong.tit {
    font-size: 22px;
    font-weight: 600;
  }
  .sub-title {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 300;
  }
  .price {
    display: flex;
    gap: 20px;
    margin-top: 22px;
    font-size: 20px;
    font-weight: 500;
    del {
      font-size: 16px;
      font-weight: 300;
      color: #939393;
    }
  }
}
.float-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
.loading {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}
.contents:not(.loading) {
  opacity: 1;
  transition: all 0.6s ease-in-out;
  //@include response-to('1280') {
  //  padding-top: 55px;
  //}
}
.loading img {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}
.contents:not(.loading) img {
  opacity: 1;
  transition: all 0.6s ease-in-out;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
