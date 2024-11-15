<template>
  <!-- container -->
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <Sort :items="sortItems" @update:value="changeSorting" />
        <Breadcrumb />
        <searchComponent v-model:searchValue="searchValue" @search="searchItem" />
      </div>
      <!--// conTopArea -->
      <!-- productList -->
      <div class="productList">
        <EmptyResult :search-value="searchValue" :search-result-length="searchResultLength">
          <template #notEmpty2>
            <router-link
              v-for="(item, index) in productList"
              :key="index"
              :to="`midiDesk/${item.id}`"
              class="product"
            >
              <p><img :src="`http://localhost:8080/files/${item.imgPath}`" alt="상품 섬네일" /></p>
              <div>
                <strong
                  v-dompurify-html="highlightText(item.name, searchValue)"
                  class="tit"
                ></strong>
                <p class="subTit">{{ item.subTitle }}</p>
                <p class="price">
                  <span>₩ {{ formatPrice(getOriginPrice(item.price, item.discountPer)) }}원</span>
                  <del>₩ {{ formatPrice(item.price) }}원</del>
                </p>
              </div>
            </router-link>
          </template>
        </EmptyResult>
      </div>
      <!--// productList -->
      <!-- bottomArea -->
      <div class="conBottomArea">
        <!-- paging -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="changePage"
        />
        <!--// paging -->
      </div>
      <!--// conBottomArea -->
    </div>
  </div>
  <!-- container -->
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getCategoryProductList } from '@/api/product'
// Models
import { ProductsType } from '@/models/interfaces/Product'

const productList = ref<ProductsType[]>([])
const fetchList = async () => {
  try {
    const page = currentPage.value ?? 0
    const searchText = searchValue.value ?? null
    const response = await getCategoryProductList('', page, currentSort.value, searchText)
    console.log(response.data, 'fdf')
    productList.value = response.data.content
    getTotalPages.value = response.data.totalPages
    currentPage.value = page
  } catch (error) {
    console.error(error)
  }
}

// Composable
import { getOriginPrice, formatPrice } from '@/composables/useCalculate'
import { useSearch } from '@/composables/useSearch'
import { useSort } from '@/composables/useSort'
import { usePagination } from '@/composables/usePagination'
const { currentPage, totalPages, getTotalPages, changePage, currentSort } = usePagination(fetchList)
const { searchValue, searchResultLength, searchItem, highlightText } = useSearch<ProductsType>(
  fetchList,
  productList,
  currentPage
)
const { changeSorting } = useSort(currentSort, fetchList)
// config
import { sortType_product, sortTypes_default } from '@/configs/sortTypes'
// Components
import Breadcrumb from '@/components/breadcrumb.vue'
import searchComponent from '@/components/search/search.vue'
import Pagination from '@/components/board/pagination.vue'
import Sort from '@/components/board/sort.vue'
import EmptyResult from '@/components/search/emptyResultType2.vue'
const sortItems = computed(() => {
  return sortType_product.items
})
const sortDefault = computed(() => {
  return sortTypes_default.default
})
onMounted(() => {
  currentSort.value = sortDefault.value
  fetchList()
})
</script>
