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
          <template v-for="(item, index) in qnaList" :key="index">
            <tr :class="{'bgGray': selectedItemId === item.id}">
              <td class="mNone">{{ item.id }}</td>
              <td>{{ qnaTypeText(item.qnaType) }}</td>
              <td class="txtL subject">
                <button
                    @click.prevent="toggleDetail(item.id, item.secret)"
                    :class="{ 'lock': item.secret, 'com': item.hasReply }"
                    class="likeAnchor"
                >
                  {{ item.title }}
                  <span v-if="item.hasReply" class="tag">답변완료</span>
                </button>
                <!-- 비밀번호 입력 필드 -->
                <div v-if="item.secret && selectedItemId === item.id && !isPrivateVisible && userRoleState !== 'Admin'" class="qnaPw">
                  <input
                      type="password"
                      title="비밀번호 입력"
                      placeholder="비밀번호"
                      v-model="inputPw"
                      @keydown.enter="fetchContent(item.id, true)"
                  />
                  <button type="button" class="btn" @click="fetchContent(item.id, true)">확인</button>
                </div>
                <!-- 비공개 게시글 내용 -->
                <div v-if="isPrivateVisible && selectedItemId === item.id && privateContent != null" class="conDetail">
                  {{ privateContent.content }}
                  <div
                    class="img"
                  >
                    <p><img src="../assets/images/img-gallery01.jpg" alt=""></p>
                    <div
                        v-if="item.memberId === Number(userIdState)"
                    >
                      <button type="button" class="btn">수정</button>
                      <button type="button" class="btn">삭제</button>
                    </div>
                  </div>
                </div>
                <!-- 공개 게시글 내용 -->
                <div v-if="!isPrivateVisible && selectedItemId === item.id && publicContent != null" class="conDetail he">
                  {{ publicContent.content }}
                  <div
                    class="img"
                  >
                    <p><img src="../assets/images/img-gallery01.jpg" alt=""></p>
                    <div
                        v-if="item.memberId === Number(userIdState)"
                    >
                      <button type="button" class="btn">수정</button>
                      <button type="button" class="btn">삭제</button>
                    </div>
                  </div>
                </div>
              </td>
              <td>{{ item.author }}</td>
              <td>{{ formatDate(item.creDate) }}</td>
            </tr>
            <!-- 답변 컴포넌트 -->
            <template v-if="selectedItemId === item.id && item.hasReply">
              <AnswerComponent
                  :adminName="isPrivateVisible ? privateContent?.replies[0].author : publicContent?.replies[0].author"
                  :answerDtm="isPrivateVisible ? privateContent?.replies[0].createdDate : publicContent?.replies[0].createdDate"
                  :content="isPrivateVisible ? privateContent?.replies[0].content : publicContent?.replies[0].content"
              />
            </template>
          </template>

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
import {computed, onMounted, ref} from "vue";
// Api
import { getQNAList, getQNADetail, getQNADetailPrivate } from '@/api/q&a'

// Stores
// Components
import Confirm from '@/components/notifications/confirm.vue'

import AnswerComponent from '@/components/pages/community/q&a/[id].vue'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/loginStores";
const { isAuthenticated, role, userId } = storeToRefs(useUserStore());

// Composables
import { useConfirm } from '@/composables/useConfirm'
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
    console.log(response.data);
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
const userRoleState = computed(() => {
  return role.value || undefined;
});
const userIdState = computed(() => {
  return userId.value || undefined;
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
const toggleDetail = (id: number, secret: boolean) => {
  console.log('secret', secret);
  console.log('isAuthenticated', isAuthenticated.value);

  if (isAuthenticated.value) {
    if (userRoleState.value === 'Admin') {
      // Admin일 경우 모든 글 보기
      selectedItemId.value = id;
      fetchContent(id, false); // 비밀번호 필요 없음
    } else {
      if (selectedItemId.value === id) {
        selectedItemId.value = null; // 현재 선택된 게시물이 다시 클릭되면 닫기
        privateContent.value = null;
        publicContent.value = null;
        isPrivateVisible.value = false; // 비밀번호 확인 성공 시 게시글 내용 보여주기
        inputPw.value = ''; // 비밀번호 입력 초기화
      } else {
        selectedItemId.value = id; // 새로운 게시물 클릭 시 해당 ID로 설정
        if (secret) {
          fetchContent(id, true); // 비밀번호가 필요한 경우
        } else {
          fetchContent(id, false); // 비밀번호가 필요하지 않은 경우
        }
      }
    }
  } else {
    showConfirm(
        `로그인이 필요한 기능입니다.\n로그인하시겠습니까?`,
        async () => {
          await router.push('/login');
        },
        () => {}
    );
  }
};


const inputPw = ref<string>('');
const privateContent = ref<{ content: string; author: string; createdDate: string; replies?: any } | null>(null);
const publicContent = ref<{ content: string; author: string; createdDate: string; replies?: any } | null>(null);
const fetchContent = async (id: number, isPrivate: boolean) => {
  privateContent.value = null;
  publicContent.value = null;

  try {
    const response = isPrivate
        ? await getQNADetailPrivate(id, inputPw.value)
        : await getQNADetail(id);

    if (response.status === 200) {
      if (isPrivate) {
        privateContent.value = response.data;
        isPrivateVisible.value = true; // 비밀번호 확인 성공 시 게시글 내용 보여주기
      } else {
        publicContent.value = response.data;
        isPrivateVisible.value = false;
      }
      selectedItemId.value = id; // 선택된 아이디 설정
      inputPw.value = ''; // 비밀번호 입력 초기화
    }
  } catch (error) {
    console.error(error);
  }
};

</script>
<style scoped>
.conDetail {display: block; overflow: hidden; width: 100%; padding: 3rem 0; font-weight: 300;}
.conDetail img {display: block;}
</style>