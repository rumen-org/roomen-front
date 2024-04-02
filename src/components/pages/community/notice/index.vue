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
        <h2>NOTICE</h2>
        <div class="srchArea">
          <input type="text" title="검색">
          <button type="button" class="srchBtn"><span class="hide">검색하기</span></button>
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
          <tr>
            <td class="mNone">3</td>
            <td class="txtL subject"><a href="">루멘 회원 이용 약관 개정 안내</a></td>
            <td>24.03.03</td>
          </tr>
          <tr>
            <td class="mNone">2</td>
            <td class="txtL subject"><a href="">회원 등급 혜택 안내</a></td>
            <td>24.03.03</td>
          </tr>
          <tr>
            <td class="mNone">1</td>
            <td class="txtL subject"><a href="">배송 안내</a></td>
            <td>24.03.03</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--// listTable -->
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
      </div>
      <!--// conBottomArea -->
    </div>
  </div>
</template>
<script setup lang="ts"></script>