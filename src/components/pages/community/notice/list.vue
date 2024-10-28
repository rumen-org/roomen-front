<!-- components/pages/community/notice/list.vue -->
<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <Sort :items="sortItems" @update:value="changeSorting" />
        <h2>NOTICE</h2>
        <!-- 이 부분 컴포넌트 분할 필요 -->
        <searchComponent v-model:searchValue="searchValue" @search="searchItem" />
        <!-- //이 부분 컴포넌트 분할 필요 -->
      </div>
      <!--// conTopArea -->
      <!-- listTable -->
      <div class="listTable">
        <table>
          <caption>
            번호, 제목, 작성일 항목으로 구성된 공지사항 목록표
          </caption>
          <colgroup>
            <col style="width: 230px" class="mw100 mNone" />
            <col style="width: auto" />
            <col style="width: 230px" class="mw100" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="mNone">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <EmptyResult
              :search-value="searchValue"
              :search-result-length="searchResultLength"
              :col-spans="5"
            >
              <template #notEmpty>
                <tr v-for="(item, idx) in noticeList" :key="idx">
                  <td class="mNone">{{ item.id }}</td>
                  <td class="txtL subject">
                    <router-link :to="`notice/${item.id}`">{{ item.title }}</router-link>
                  </td>
                  <td>{{ formatDate(item.creDate) }}</td>
                </tr>
              </template>
            </EmptyResult>
          </tbody>
        </table>
      </div>
      <!--// listTable -->
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// import { RouteLocationNormalized } from 'vue-router';
// Components
import searchComponent from '@/components/search/search.vue'
import Pagination from '@/components/board/pagination.vue'
import Sort from '@/components/board/sort.vue'
import EmptyResult from '@/components/search/emptyResult.vue'

// Composable  전달하기 위한 반응형 변수여서 미리선언 선언
const noticeList = ref<NoticeItem[]>([])

const fetchList = async () => {
  try {
    const pageNumber = currentPage.value ?? 0
    const searchString = searchValue.value ?? null
    const response = await getNoticeList(pageNumber, currentSort.value, searchString)
    noticeList.value = response.data?.content

    getTotalPages.value = response.data.totalPages
    currentPage.value = pageNumber
  } catch (error) {
    console.error(error)
  }
}

// Composable
import { useFormatDate } from '@/composables/dateType'
import { useSearch } from '@/composables/useSearch'
import { useSort } from '@/composables/useSort'
import { usePagination } from '@/composables/usePagination'

const { formatDate } = useFormatDate()
const { currentPage, totalPages, getTotalPages, changePage, currentSort } = usePagination(fetchList)
const { searchValue, searchResultLength, searchItem } = useSearch<NoticeItem>(
  fetchList,
  noticeList,
  currentPage
)
const { changeSorting } = useSort(currentSort, fetchList)
// config
import { sortTypes_default } from '@/configs/sortTypes'
// Api
import { getNoticeList } from '@/api/notice'

// Define TypeScript types
interface NoticeItem {
  id: number
  title: string
  creDate: string
}

// sortType
const sortItems = computed(() => {
  return sortTypes_default.items
})
const sortDefault = computed(() => {
  return sortTypes_default.default
})

onMounted(() => {
  currentSort.value = sortDefault.value
  fetchList()
})
</script>
