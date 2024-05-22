<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea v2">
        <div class="btnArea">
          <backButton/>
        </div>
        <h2 class="ko">문의하기</h2>
      </div>
      <!--// conTopArea -->
      <div class="w943">
        <!-- inputTable -->
        <div class="inputTable qna">
          <table>
            <caption>문의유형, 제목, 문의내용, 사진, 비밀글 비밀번호 항목으로 구성된 문의하기 입력 표</caption>
            <colgroup>
              <col style="width:14%">
              <col style="width:36%">
              <col style="width:14%">
              <col style="width:36%">
            </colgroup>
            <tbody>
            <tr>
              <th scope="row" class="mNone">문의유형</th>
              <td colspan="3">
                <!-- checkboxWrap -->
                <div class="checkboxWrap selectCate">
                  <span class="checkbox">
                    <input type="radio" id="chk0101" name="chk01" checked>
                    <label for="chk0101">배송</label>
                  </span>
                  <span class="checkbox">
                    <input type="radio" id="chk0102" name="chk01">
                    <label for="chk0102">상품</label>
                  </span>
                  <span class="checkbox">
                    <input type="radio" id="chk0103" name="chk01">
                    <label for="chk0103">취소/교환/환불</label>
                  </span>
                  <span class="checkbox">
                    <input type="radio" id="chk0104" name="chk01">
                    <label for="chk0104">기타</label>
                  </span>
                </div>
                <!--// checkboxWrap -->
              </td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td colspan="3"><input type="text" title="제목" placeholder="제목을 입력하세요."></td>
            </tr>
            <tr>
              <th scope="row">문의내용</th>
              <td colspan="3">
                <textarea title="문의내용" placeholder="내용을 입력하세요."></textarea>
              </td>
            </tr>
            <tr class="flexArea">
              <th scope="row">사진</th>
              <td>
                <!-- imgUpload -->
                <div class="imgUpload">
                  <div class="preview">
                    <ul></ul>
                  </div>
                  <input type="file" class="upload" multiple>
                </div>
                <!--// imgUpload -->
              </td>
              <th scope="row">비밀글</th>
              <td>
                <div class="inputBtn">
                  <input type="text" placeholder="비밀번호를 입력하세요.">
                  <span class="checkbox noTxt">
                    <input type="checkbox" id="chk0201">
                    <label for="chk0201">사용</label>
                  </span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--// inputTable -->

        <!-- bottomBtn -->
        <div class="bottomBtn txtC">
          <button type="button" class="btn sL w230">작성하기</button>
        </div>
        <!--// bottomBtn -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import backButton from '@/components/button/backButton.vue'
</script>