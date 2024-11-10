<template>
  <!-- orderTable -->
  <div class="orderTable">
    <table>
      <caption>
        상품정보, 옵션, 주문수량, 합계 항목으로 구성된 주문서 상세표
      </caption>
      <colgroup>
        <col style="width: 560px" class="mw300" />
        <col style="width: 380px" class="mw100" />
        <col style="width: 260px" class="mw100" />
        <col style="width: 300px" class="mw150" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">상품정보</th>
          <th scope="col">옵션</th>
          <th scope="col">주문수량</th>
          <th scope="col">합계</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in data" :key="idx">
          <td>
            <div class="goodsInfo">
              <p class="img"><img :src="`http://localhost:8080/files/${item?.imgUrl}`" alt="" /></p>
              <div>
                <strong>{{ item.name }}</strong>
                <p>{{ item.subName }}</p>
              </div>
            </div>
          </td>
          <td data-label="옵션">
            <div class="option txtL">
              <span v-for="(option, idx2) in item.options.split('/')" :key="idx2"
                >{{ option }} <em v-if="idx2 < item.options.split('/').length - 1"> / </em></span
              >
            </div>
          </td>
          <td data-label="주문수량" class="font16">
            <em>{{ item.quantity }}</em
            >개
          </td>
          <td data-label="합계">
            <em class="font24">₩ {{ formatPrice(item.totalPrice * item.quantity) }}</em>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--// orderTable -->
  <div class="totalPrice txtR">
    <span class="fontG">TOTAL</span>
    <em>₩ {{ formatPrice(getPrice) }}</em>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBucketStore } from '@/stores/bucket'
import { formatPrice } from '@/composables/useCalculate'
const bucketStore = useBucketStore()

const data = computed(() => {
  return items.value
})
import { computed, onMounted, onUnmounted } from 'vue'
const { items, getPrice } = storeToRefs(bucketStore)

onMounted(() => {
  bucketStore.loadItemsFromStorage()
})
onUnmounted(() => {})
</script>
