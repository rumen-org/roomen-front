<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <sorting :sort-by="sortBy" @update:sortBy="handleSorting" />
        <h2>NOTICE</h2>
        <!-- 이 부분 컴포넌트 분할 필요 -->
        <div class="srchArea">
          <input type="text" title="검색" v-model="searchValue">
          <button type="button" class="srchBtn" @click="searchItem"><span class="hide">검색하기</span></button>
        </div>
        <!-- //이 부분 컴포넌트 분할 필요 -->
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
              <td class="mNone">{{ item.id }}</td>
              <td class="txtL subject"><router-link :to="`notice/${item.id}`">{{ item.title }}</router-link></td>
              <td>{{ formatDate(item.creDate) }}</td>
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
import { computed, onMounted, ref } from 'vue';
// import { RouteLocationNormalized } from 'vue-router';
import { getSearchVals } from '@/utils/search';
import paging from '@/components/board/pagination.vue';
import sorting from '@/components/board/sort.vue';
import { getNoticeList } from '@/api/notice';

// Define TypeScript types
interface NoticeItem {
  id: number;
  title: string;
  creDate: string;
}

const noticeList = ref<NoticeItem[]>([]);
const searchValue = ref<string>('');
const searchResults = ref<NoticeItem[]>([]);
const currentPage = ref<number>(1);
const perPage = ref<number>(5);
const sortBy = ref<string>('latest');

const fetchList = async () => {
  try {
    const response = await getNoticeList();
    noticeList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const allLists = computed(() => noticeList.value);
const lists = computed(() => {
  const filtered = searchResults.value.length > 0 ? searchResults.value : sortedLists.value;
  const first = (currentPage.value - 1) * perPage.value;
  const last = first + perPage.value;
  return filtered.slice(first, last);
});

const totalPage = computed(() => {
  const count = searchResults.value.length > 0 ? searchResults.value.length : allLists.value.length;
  return Math.ceil(count / perPage.value);
});

const formatDate = (value: string): string => {
  const date = new Date(value);
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
};

const updateCurrent = (page: number) => {
  currentPage.value = page;
};

const handleSorting = (sortOrder: string) => {
  sortBy.value = sortOrder;
  if (sortBy.value === 'latest') {
    sortByLatest();
  } else if (sortBy.value === 'oldest') {
    sortByOldest();
  }
};

const sortByLatest = () => {
  if (searchResults.value.length > 0) {
    searchResults.value.sort((a, b) => new Date(b.creDate).getTime() - new Date(a.creDate).getTime());
  }
};

const sortByOldest = () => {
  if (searchResults.value.length > 0) {
    searchResults.value.sort((a, b) => new Date(a.creDate).getTime() - new Date(b.creDate).getTime());
  }
};

const sortedLists = computed(() => {
  const sorted = [...allLists.value];
  if (sortBy.value === 'latest') {
    return sorted.sort((a, b) => new Date(b.creDate).getTime() - new Date(a.creDate).getTime());
  } else {
    return sorted.sort((a, b) => new Date(a.creDate).getTime() - new Date(b.creDate).getTime());
  }
});

const searchItem = () => {
  const searchValues = getSearchVals({
    searchValue: { val: searchValue.value }
  });

  searchResults.value = allLists.value.filter((item: NoticeItem) =>
      item.title.toLowerCase().includes(searchValues.searchValue.val.toLowerCase())
  );
  currentPage.value = 1;
};

onMounted(() => {
  fetchList();
});
</script>