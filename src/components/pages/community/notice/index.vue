<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <div class="sorting">
          <ul>
            <li :class="{ 'curr': sortBy === 'latest' }"><button @click="sortByLatest" type="button">최신 순</button></li>
            <li :class="{ 'curr': sortBy === 'oldest' }"><button @click="sortByOldest" type="button">오래된 순</button></li>
          </ul>
        </div>
        <h2>NOTICE</h2>
        <div class="srchArea">
          <input type="text" title="검색" v-model="searchValue">
          <button type="button" class="srchBtn" @click="searchItem"><span class="hide">검색하기</span></button>
        </div>
      </div>
      <!--// conTopArea -->
      <!-- listTable -->
      <div class="listTable">
        <table>
          <caption>번호, 제목, 작성일 항목으로 구성된 공지사항 목록표</caption>
          <colgroup>
            <col style="width:230px" class="mw100 mNone">
            <col style="width:auto">
            <col style="width:230px" class="mw100">
          </colgroup>
          <thead>
          <tr>
            <th scope="col" class="mNone">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성일</th>
          </tr>
          </thead>
          <tbody>

          <tr v-if="searchValue.length > 0 && searchResults.length == 0">
            <td colspan="3" class="text-center">검색 결과가 없습니다.</td>
          </tr>
          <template v-else>
            <tr v-for="(item, idx) in lists" :key="idx">
              <td class="mNone">{{ item.num }}</td>
              <td class="txtL subject"><router-link :to="`notice/${item.id}`">{{ item.title }}</router-link></td>
              <td>{{ formatDate(item.regDtm) }}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <!--// listTable -->
      <!-- bottomArea -->
      <div class="conBottomArea">
        <!-- paging -->
        <template
            v-if="lists.length > 0"
        >
          <paging v-model:propsCurrent="currentPage" :total-page="totalPage" @update:current="updateCurrent" />

        </template>

        <!--// paging -->
      </div>
      <!--// conBottomArea -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { getSearchVals } from '@/utils/search'
import listDummy from '@/mocks/json/noticeList.json'
import paging from '@/components/board/pagination.vue'
// import { useRouter } from 'vue-router'
// const router = useRouter();

import {computed, ref, unref} from "vue";
// 보여질 게시물 목록 ( dummy )
const allLists = computed(() => {
  return listDummy?.data;
})
const lists = computed(() => {
  if (searchResults.value.length > 0) {
    const first = (currentPage.value - 1) * perPage.value;
    const last = first + perPage.value;
    return searchResults.value.slice(first, last);
  } else if (searchResults.value.length == 0 && searchValue.value.length > 0) {
    // const first = (currentPage.value - 1) * perPage.value;
    // const last = first + perPage.value;
    return [];
  } else {
    const first = (currentPage.value - 1) * perPage.value;
    const last = first + perPage.value;
    return sortedLists.value.slice(first, last);
  }
});
// 보여질 날짜 형태에 대한 필터처리 ( Api 개발상태에 따라 달라질 수 있음)
const formatDate = (value: string) => {
  const date = new Date(value);
  console.log('date',date)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
// 현재 페이지
const currentPage = ref<number>(1);
// 한 페이지에서 보여질 게시물 갯수
const perPage = ref<number>(5);
// 게시물에 따른 총 페이지
const totalPage = computed(() => Math.ceil(allLists.value.length / perPage.value)
);
const updateCurrent = (e:number) => {
  currentPage.value = e;
}
// 정렬
const sortBy = ref<string>('latest');

const sortByLatest = () => {
  sortBy.value = 'latest';
  if (searchResults.value.length > 0) {
    searchResults.value = [...searchResults.value].sort((a, b) => new Date(b.regDtm).getTime() - new Date(a.regDtm).getTime());
  }
};

const sortByOldest = () => {
  sortBy.value = 'oldest';
  if (searchResults.value.length > 0) {
    searchResults.value = [...searchResults.value].sort((a, b) => new Date(a.regDtm).getTime() - new Date(b.regDtm).getTime());
  }
};

const sortedLists = computed(() => {
  const sorted = [...allLists.value]; // Create a copy of the original array
  if (sortBy.value === 'latest') {
    return sorted.sort((a, b) => new Date(b.regDtm).getTime() - new Date(a.regDtm).getTime());
  } else {
    return sorted.sort((a, b) => new Date(a.regDtm).getTime() - new Date(b.regDtm).getTime());
  }
});
const searchResults = ref([]);
const unSearchResults = unref(searchResults);
console.log('unSearchResults',unSearchResults)
const searchItem = () => {
  const searchValues = getSearchVals({
    searchValue: { val: searchValue.value } // 검색값 ref에서 전달
    // 다른 검색 조건 추가 가능
  });

  const filteredLists = allLists.value.filter((item:any) => {
    return item.title.toLowerCase().includes(searchValues.searchValue.val.toLowerCase());
  });

  // 필터링된 데이터로 searchResults 업데이트
  searchResults.value = filteredLists;
  console.log('searchResults',searchResults,filteredLists)
};

// 검색기능
const searchValue = ref<string>('');

</script>