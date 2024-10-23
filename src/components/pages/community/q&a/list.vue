<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <div class="sorting">
          <ul>
            <li class="curr"><button type="button">최신 순</button></li>
            <li><button type="button">오래된 순</button></li>
          </ul>
        </div>
        <h2>Q&#38;A</h2>
        <div class="srchArea">
          <input type="text" title="검색">
          <button type="button" class="srchBtn"><span class="hide">검색하기</span></button>
        </div>
      </div>
      <!--// conTopArea -->
      <!-- qnaTable -->
      <div class="qnaTable">
        <table>
          <caption>번호, 문의유형, 제목, 작성자, 작성일 항목으로 구성된 q&a 목록표</caption>
          <colgroup>
            <col style="width:160px" class="mw100 mNone">
            <col style="width:160px" class="mw100">
            <col style="width:auto">
            <col style="width:160px" class="mw100">
            <col style="width:230px" class="mw150">
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
            <tr
              :class="{'bgGray': selectedItemId === item.id}"
              v-for="(item, index) in qnaList"
              :key="index"
            >
              <td class="mNone">{{ item.id }}</td>
              <td>{{ qnaTypeText(item.qnaType) }}</td>
              <td class="txtL subject">
                <button
                    @click.prevent="toggleDetail(item)"
                    :class="{ 'lock': item.secret, 'com': item.hasReply }"
                    class="likeAnchor"
                >
                  {{ item.title }}
                  <span v-if="item.hasReply" class="tag">답변완료</span>
                </button>
                <!-- 비밀번호 입력 필드 -->
                <passwordComponents
                    v-if="requiresPasswordInput(item)"
                    :onSubmit="(pw) => fetchContent(item.id, pw)"
                />
                <!-- 게시물 컨텐츠 -->
                <ContentDisplay
                    v-if="selectedItemId === item.id"
                    :content="displayedContent"
                    :isOwner="isOwner(item)"
                />
                <!-- 답변 컴포넌트 -->
                <AnswerComponent
                  v-if="item.hasReply && selectedItemId === item.id"
                  :answer="displayedContent?.replies[0]"
                />

              </td>
              <td>{{ item.author }}</td>
              <td>{{ formatDate(item.creDate) }}</td>
            </tr>
            <!-- 답변 컴포넌트 -->


          </tbody>
        </table>
      </div>
      <!--// qnaTable -->
      <!-- bottomArea -->
      <div class="conBottomArea">
        <!-- paging -->
        <div class="paging">
          <a href="" class="btnPrev disabled">이전 페이지</a>
          <strong>1</strong>
          <a href="">2</a>
          <a href="">3</a>
          <a href="">4</a>
          <a href="">5</a>
          <a href="" class="btnNext">다음 페이지</a>
        </div>
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
import { useRouter } from "vue-router";
import { onMounted, ref} from "vue";
// Api
import { getQNAList, getQNADetail } from '@/api/q&a'

// Stores
// Components
import Confirm from '@/components/notifications/confirm.vue'
import AnswerComponent from '@/components/pages/community/q&a/[id].vue'
import passwordComponents from '@/components/pages/community/q&a/detailPasswordComponents.vue'
import ContentDisplay from '@/components/pages/community/q&a/detailContentComponent.vue'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/loginStores";
const { isAuthenticated, role, userId } = storeToRefs(useUserStore());

// Composables
import { useConfirm } from '@/composables/useConfirm'
import axios from "axios";
const { showConfirm } = useConfirm();
const router = useRouter();

interface QnAList {
  id: number;
  qnaType: number;
  title: string;
  creDate: string;
  secret: boolean;
  hasReply: boolean;
  password: string;
  author: string;
  content: string;
  memberId: number;
}
const qnaList = ref<QnAList[]> ([]);

const fetchList = async () =>{
  try {
    const response = await getQNAList();
    qnaList.value = response.data;
  }
  catch(error) {
    console.error(error);
  }
}

const qnaTypeText = (qnaType: number) => {
  switch (qnaType) {
    case 1:
      return '배송';
    case 2:
      return '상품';
    case 3:
      return '취소/교환/환불';
    case 4:
      return '기타';  // 여기에 나머지 유형을 설정
    default:
      return '기타';
  }
};


onMounted(() => {
  fetchList();
})

const isPrivateVisible = ref<boolean>(false);
const pushWrite = async () => {
  await router.push({path:'Q&A/write'})
}
const formatDate = (value: string) => {
  const date = new Date(value);
  return `${date.getFullYear().toString().slice(2,4)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}
const selectedItemId = ref<number | null>(null);
//게시물 토글
const toggleDetail = (item: any) => {
  if (selectedItemId.value === item.id) {
    resetSelection();
    console.log('state_________1');
  } else if (isAuthenticated.value) {
    console.log('state_________2');
    if (role.value === 'Admin' || !item.secret) {
      fetchContent(item.id, null);
      console.log('state_________3');
    } else {
      selectedItemId.value = item.id;
      console.log('state_________4');
    }
  } else {
    promptLogin();
  }
};
// 로그인 필요시 안내창
const promptLogin = () => {
  showConfirm(
      `로그인이 필요한 기능입니다.\n로그인하시겠습니까?`,
      async () => {
        await router.push('/login');
      },
      () => {}
  );
}
// 게시글 데이터
const fetchContent = async (id: number, password: string | null = null) => {
  try {
    console.log('onFetchContent', id)
    const response = await getQNADetail(id, password ?? undefined);
    displayedContent.value = response.data;
    isPrivateVisible.value = !!password;
  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized access. Please login.");
      } else if (error.response?.status === 403) {
        console.error("Forbidden. Incorrect password or no access.");
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
};

const isOwner = (item: any) => item.memberId === Number(userId.value);
const requiresPasswordInput = (item: any) =>
    item.secret && selectedItemId.value === item.id && role.value !== 'Admin';

const displayedContent = ref<any>(null);

// 유틸 함수
const resetSelection = () => {
  selectedItemId.value = null;
  displayedContent.value = null;
  inputPw.value = '';
};

const inputPw = ref<string>('');
</script>
<style scoped>
.conDetail {display: block; overflow: hidden; width: 100%; padding: 3rem 0; font-weight: 300;}
.conDetail img {display: block;}
</style>