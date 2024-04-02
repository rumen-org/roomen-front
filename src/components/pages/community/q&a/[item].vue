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
          <tr class="bgGray">
            <td class="mNone">3</td>
            <td data-label="문의유형">배송</td>
            <td class="txtL subject" data-label="제목">
              <a href="" class="lock com">배송 문의 드립니다<span class="tag">답변완료</span></a>
              <div class="conDetail">
                안녕하세요 미디데스크 오늘 주문 했는데<br/>
                언제쯤 도착하나요?
                <div class="img">
                  <img src="../assets/images/img-gallery01.jpg" alt="">
                  <div>
                    <button type="button" class="btn">수정</button>
                    <button type="button" class="btn">삭제</button>
                  </div>
                </div>
              </div>
            </td>
            <td data-label="작성자">박**</td>
            <td data-label="작성일">24.03.03</td>
          </tr>
          <tr class="bgGray">
            <td></td>
            <td></td>
            <td class="txtL subject" data-label="답변">
              안녕하세요 루멘입니다.<br/>
              루멘 상품은 주문제작 상품으로<br/>
              주문일로부터 2주정도 소요되는 점 참고 부탁드립니다. <br/>
              회원님의 편안한 쇼핑을 위해 최선을 다하겠습니다. <br/>
              감사합니다.
            </td>
            <td data-label="작성자">루멘</td>
            <td data-label="작성일">24.03.03</td>
          </tr>
          <tr>
            <td class="mNone">2</td>
            <td data-label="문의유형">상품</td>
            <td class="txtL subject" data-label="제목"><a href="">크기문의</a></td>
            <td data-label="작성자">최**</td>
            <td data-label="작성일">24.03.03</td>
          </tr>
          <tr>
            <td class="mNone">1</td>
            <td data-label="문의유형">취소/교환/환불</td>
            <td class="txtL subject" data-label="제목"><a href="">배송 안내</a></td>
            <td data-label="작성자">최**</td>
            <td data-label="작성일">24.03.03</td>
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
          <button type="button" class="btn">문의하기</button>
        </div>
        <!--// btnArea -->
      </div>
      <!--// conBottomArea -->
    </div>
  </div>
</template>


<script setup lang="ts"></script>