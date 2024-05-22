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
            <tr :class="{'bgGray' : selectedIndex === index}">
              <td class="mNone">{{ item.number }}</td>
              <td>{{item.type}}</td>
              <td class="txtL subject">
                <a href="javascript:void(0)" @click.prevent="toggleDetail(item.id, item.private, index)" :class="{ 'lock' : item.private == 'Y', 'com' : item.answerYn == 'Y' }">{{ item.title }}<span v-if="item.answerYn == 'Y'" class="tag">답변완료</span></a>
                <div v-if="item.private == 'Y' && selectedIndex === index && selectedItemId != item?.id" class="qnaPw">
                  <input type="text" title="비밀번호 입력" placeholder="비밀번호" v-model="inputPW">
                  <button type="button" class="btn" @click="chkPW(item.password)">확인</button>
                </div>
                <div v-if="selectedItemId === item?.id" class="conDetail" v-html="item?.content">
                </div>

                <!--                  <div class="img">-->
                <!--                    <p><img src="../assets/images/img-gallery01.jpg" alt=""></p>-->
                <!--                    <div>-->
                <!--                      <button type="button" class="btn">수정</button>-->
                <!--                      <button type="button" class="btn">삭제</button>-->
                <!--                    </div>-->
                <!--                  </div>-->

                <!--              <router-link :to="{path: `Q&A/${item.id}`}" class="lock com">배송 문의 드립니다<span v-if="item.answerYn == 'Y'" class="tag">답변완료</span></router-link>-->
              </td>
              <td>{{ item.regUser }}</td>
              <td>{{formatDate(item.regDtm)}}</td>
            </tr>
            <template v-if="selectedItemId === item?.id" class="bgGray">
              <DetailComponent :itemId="item?.id" :itemBox="item"/>
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
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import {computed, ref} from "vue";
import { data } from '@/mocks/json/q&aList.json'
import DetailComponent from '@/components/pages/community/q&a/[id].vue'
const router = useRouter();
const qnaList = computed(()=>{
  return data
})
const pushWrite = async () => {
  await router.push({path:'Q&A/write'})
}
const formatDate = (value: string) => {
  const date = new Date(value);
  console.log('date',date)
  return `${date.getFullYear().toString().slice(2,4)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}
const selectedItemId = ref<string | null>(null);
const selectedIndex = ref<number | null>(null);
const toggleDetail = (id: string, p: string, idx: number) => {
  if (selectedIndex.value === idx) {
    selectedIndex.value = null;
    selectedItemId.value = null;
  } else {
    selectedIndex.value = idx;
    if (p === 'N') {
      selectedItemId.value = id;
    }
  }
};
const inputPW = ref<string|null>(null);
const chkPW = (v: string) => {
  if (inputPW.value === v) {
    selectedItemId.value = qnaList.value[selectedIndex.value!].id;
    inputPW.value = '';
  } else {
    alert('비밀번호가 틀렸습니다.');
  }
}
</script>
<style scoped>
.conDetail {display: block; overflow: hidden; width: 100%}
.conDetail img {display: block;}
</style>