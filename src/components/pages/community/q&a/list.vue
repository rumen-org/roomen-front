<!-- components/pages/community/q&a/list.vue -->

<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <Sort :items="sortItems" @update:value="changeSorting" />
        <h2>Q&#38;A</h2>
        <searchComponent v-model:searchValue="searchValue" @search="searchItem" />
      </div>
      <!--// conTopArea -->
      <!-- qnaTable -->
      <div class="qnaTable">
        <table>
          <caption>
            번호, 문의유형, 제목, 작성자, 작성일 항목으로 구성된 q&a 목록표
          </caption>
          <colgroup>
            <col style="width: 160px" class="mw100 mNone" />
            <col style="width: 160px" class="mw100" />
            <col style="width: auto" />
            <col style="width: 160px" class="mw100" />
            <col style="width: 230px" class="mw150" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="mNone">번호</th>
              <th scope="col">문의유형</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
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
                <template v-for="(item, index) in qnaList" :key="index">
                  <tr :class="{ bgGray: selectedItemId === item.id }">
                    <td class="mNone">{{ item.id }}</td>
                    <td>{{ qnaTypeText(item.qnaType) }}</td>
                    <td class="txtL subject">
                      <button
                        :class="{ lock: item.secret, com: item.hasReply }"
                        class="likeAnchor"
                        @click.prevent="toggleDetail(item)"
                      >
                        {{ item.title }}
                        <span v-if="item.hasReply" class="tag">답변완료</span>
                      </button>
                      <!-- 비밀번호 입력 필드 -->
                      <transition-group tag="div" class="sliding-content">
                        <passwordComponents
                          v-if="requiresPasswordInput(item) && !isPrivateVisible"
                          :on-submit="(pw) => fetchContent(item.id, pw)"
                        />
                        <!-- 게시물 컨텐츠 -->
                        <ContentDisplay
                          v-if="selectedItemId === item.id"
                          :content="displayedContent"
                          :is-owner="isOwner(item)"
                          @change:delete="fetchList"
                        />
                      </transition-group>
                    </td>
                    <td>{{ maskName(item.author) }}</td>
                    <td>{{ formatDate(item.creDate) }}</td>
                  </tr>
                  <!-- 답변 컴포넌트 -->
                  <transition tag="div" class="sliding-content">
                    <AnswerComponent
                      v-if="
                        item.hasReply &&
                        selectedItemId === item.id &&
                        displayedContent?.replies.length > 0
                      "
                      :answer="displayedContent?.replies[0]"
                    />
                  </transition>
                </template>
              </template>
            </EmptyResult>

            <!-- 답변 컴포넌트 -->
          </tbody>
        </table>
      </div>
      <!--// qnaTable -->
      <!-- bottomArea -->
      <div class="conBottomArea">
        <!-- paging -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="changePage"
        />
        <!--// paging -->
        <!-- btnArea -->
        <div class="btnArea">
          <button type="button" class="btn sL w230" @click="pushWrite">문의하기</button>
        </div>
        <!--// btnArea -->
      </div>
      <!--// conBottomArea -->
    </div>
    <Confirm />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// Api
import { getQNADetail, getQNADetailPrivate, getQNAList } from '@/api/q&a'
// Components
import Confirm from '@/components/notifications/confirm.vue'
import searchComponent from '@/components/search/search.vue'
import AnswerComponent from '@/components/pages/community/q&a/[id].vue'
import passwordComponents from '@/components/pages/community/q&a/detailPasswordComponents.vue'
import ContentDisplay from '@/components/pages/community/q&a/detailContentComponent.vue'
// public Components
import Sort from '@/components/board/sort.vue'
import Pagination from '@/components/board/pagination.vue'
import EmptyResult from '@/components/search/emptyResult.vue'
// config
import { sortTypes_default } from '@/configs/sortTypes'
// Composables
import { useSort } from '@/composables/useSort'
import { useSearch } from '@/composables/useSearch'
import { usePagination } from '@/composables/usePagination'
import { useUtils } from '@/composables/useUtils'
import { useConfirm } from '@/composables/useConfirm'
import { useFormatDate } from '@/composables/dateType'
// Stores
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/loginStores'
// Router
import { useRouter } from 'vue-router'
// 게시판 리스트 데이터
const qnaList = ref<QnAList[]>([])

// 게시판 데이터 함수
const fetchList = async () => {
  try {
    let response
    const pageNumber = currentPage.value ?? 0
    const searchString = searchValue.value ?? null
    response = await getQNAList(pageNumber, currentSort.value, searchString)
    qnaList.value = response.data.content
    getTotalPages.value = response.data.totalPages
    currentPage.value = pageNumber
  } catch (error: any) {
    console.error(error)
  }
}
const { formatDate } = useFormatDate()
const { currentPage, totalPages, getTotalPages, changePage, currentSort } = usePagination(fetchList)
const { searchValue, searchResultLength, searchItem } = useSearch<QnAList>(
  fetchList,
  qnaList,
  currentPage
)
const { changeSorting } = useSort(currentSort, fetchList)
const { maskName } = useUtils()
const { showConfirm } = useConfirm()

// sortType
const sortItems = computed(() => {
  return sortTypes_default.items
})
const sortDefault = computed(() => {
  return sortTypes_default.default
})

const { isAuthenticated, role, userId } = storeToRefs(useUserStore())

const router = useRouter()
// TS
interface QnAList {
  id: number
  qnaType: number
  title: string
  creDate: string
  secret: boolean
  hasReply: boolean
  password: string
  author: string
  content: string
  memberId: number
}
interface searchItem {
  title: string
  content: string
}

// Pagination

// 문의사항 유형
const qnaTypeText = (qnaType: number) => {
  switch (qnaType) {
    case 1:
      return '배송'
    case 2:
      return '상품'
    case 3:
      return '취소/교환/환불'
    case 4:
      return '기타'
    default:
      return '기타'
  }
}

const isPrivateVisible = ref<boolean>(false)
// 게시글 작성
const pushWrite = async () => {
  await router.push({ path: 'Q&A/write' })
}
// 현재 클릭한 게시글
const selectedItemId = ref<number | null>(null)
//게시물 토글
const toggleDetail = (item: any) => {
  if (selectedItemId.value === item.id) {
    resetSelection()
    return
  }
  if (!isAuthenticated.value) {
    promptLogin()
  } else {
    selectedItemId.value = item.id
    // isOwner(item);
    // requiresPasswordInput(item);
    if (role.value === 'Admin' || !item.secret) {
      fetchContent(item.id, null)
    }
  }
}
// 로그인 필요시 안내창
const promptLogin = () => {
  showConfirm(
    `로그인이 필요한 기능입니다.\n로그인하시겠습니까?`,
    async () => {
      await router.push('/login')
    },
    () => {}
  )
}
// 게시글 데이터
const fetchContent = async (id: number, password: string | null = null) => {
  try {
    console.log('onFetchContent', id)
    const response =
      password !== null ? await getQNADetailPrivate(id, password) : await getQNADetail(id)
    displayedContent.value = response.data
    isPrivateVisible.value = !!password
  } catch (error: any) {
    console.error(error)
  }
}
// 게시물 작성자 여부
const isOwner = (item: any) => item.memberId === Number(userId.value)
// toggle 시 password 창 노출 여부( Admin만 안뜨게)
const requiresPasswordInput = (item: any) =>
  item.secret && selectedItemId.value === item.id && role.value !== 'Admin'
// Toggle 시 보여질 컨텐츠 데이터
const displayedContent = ref<any>(null)

// 데이터 초기화
const resetSelection = () => {
  selectedItemId.value = null
  displayedContent.value = null
  inputPw.value = ''
}

// 페이지 로드 직후 실행함수
onMounted(() => {
  currentSort.value = sortDefault.value
  fetchList()
})
const inputPw = ref<string>('')
</script>
<style scoped>
.paging-number {
  display: block;
}
.sliding-content {
  overflow: hidden; /* 넘치는 콘텐츠 숨기기 */
}

.slide-enter-active,
.slide-leave-active {
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease; /* 슬라이드 효과 */
}

.slide-enter,
.slide-leave-to {
  max-height: 0; /* 슬라이드 시작 상태 */
  opacity: 0; /* 초기 상태 */
}

.slide-enter-to,
.slide-leave {
  max-height: 800px; /* 콘텐츠의 최대 높이 */
  opacity: 1; /* 최종 상태 */
}
</style>
