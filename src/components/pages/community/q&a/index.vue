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
          <tr>
            <td class="mNone">3</td>
            <td>배송</td>
            <td class="txtL subject">
              <a href="" class="lock com">배송 문의 드립니다<span class="tag">답변완료</span></a>
            </td>
            <td>박**</td>
            <td>24.03.03</td>
          </tr>
          <tr>
            <td class="mNone">2</td>
            <td>상품</td>
            <td class="txtL subject"><a href="">크기문의</a></td>
            <td>최**</td>
            <td>24.03.03</td>
          </tr>
          <tr>
            <td class="mNone">1</td>
            <td>취소/교환/환불</td>
            <td class="txtL subject"><a href="">배송 안내</a></td>
            <td>최**</td>
            <td>24.03.03</td>
          </tr>
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
          <button type="button" class="btn sL w230">문의하기</button>
        </div>
        <!--// btnArea -->
      </div>
      <!--// conBottomArea -->
    </div>
  </div>
</template>
<script setup lang="ts"></script>