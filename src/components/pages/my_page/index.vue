<template>
  <!-- container -->
  <div id="container">
    <div class="contents">
        <!-- conTopArea -->
        <div class="conTopArea">
            <div class="tab">
                <ul>
                    <li class="curr"><button type="button">주문내역</button></li>
                    <li><button type="button">배송지 관리</button></li>
                    <li><button type="button">회원정보 수정</button></li>
                    <li><button type="button">비밀번호 변경</button></li>
                </ul>
            </div>
            <div class="srchArea mNone">
                <input type="text" title="검색">
                <button type="button" class="srchBtn"><span class="hide">검색하기</span></button>
            </div>
        </div>
        <!--// conTopArea --> 
        <!-- orderTable -->
        <div class="orderTable">
            <table>
                <caption>상품정보, 주문일자, 주문번호, 주문금액(수량), 주문상태 항목으로 구성된 주문내역 목록표</caption>
                <colgroup>
                    <col style="width:600px" class="mw300">
                    <col style="width:200px" class="mw100">
                    <col style="width:270px">
                    <col style="width:200px" class="mw100">
                    <col style="width:270px" class="mw150">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">상품정보</th>
                        <th scope="col">주문일자</th>
                        <th scope="col">주문번호</th>
                        <th scope="col">주문금액(수량)</th>
                        <th scope="col">주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a href="" class="goodsInfo">
                                <p class="img"><img src="@/assets/images/img-product-3.jpg" alt=""></p>
                                <div>
                                    <strong>루멘 미디데스크</strong>
                                    <p>Roomen MIDI DESK</p>
                                    <div>
                                        [ 옵션 :
                                        <span>
                                            <span>루멘 미디데스크</span>
                                            <span>옐로우</span>
                                            <span>화이트</span>
                                            <span>수도권 (서울,경기,인천) (+ ₩50,000)</span>
                                            <span>없음</span>
                                        </span>
                                        ]
                                    </div>
                                </div>
                            </a>
                        </td>
                        <td data-label="주문일자">2024.03.19</td>
                        <td data-label="주문번호">2024031900001</td>
                        <td data-label="주문금액(수량)"><em>₩ 1,400,000</em> <br/><em>(1개)</em></td>
                        <td data-label="주문상태">상품준비중</td>
                    </tr>
                    <tr>
                        <td>
                            <a href="" class="goodsInfo">
                                <p class="img"><img src="@/assets/images/img-product-3.jpg" alt=""></p>
                                <div>
                                    <strong>루멘 미디데스크</strong>
                                    <p>Roomen MIDI DESK</p>
                                    <div>
                                        [ 옵션 :
                                        <span>
                                            <span>루멘 미디데스크</span>
                                            <span>옐로우</span>
                                            <span>화이트</span>
                                            <span>수도권 (서울,경기,인천) (+ ₩50,000)</span>
                                            <span>없음</span>
                                        </span>
                                        ]
                                    </div>
                                </div>
                            </a>
                        </td>
                        <td data-label="주문일자">2024.03.19</td>
                        <td data-label="주문번호">2024031900001</td>
                        <td data-label="주문금액(수량)"><em>₩ 1,400,000</em> <br/><em>(1개)</em></td>
                        <td data-label="주문상태">
                            상품준비중
                            <button type="button" class="btn w90 bgWhite sM">배송조회</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
        <!--// orderTable -->
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
<!-- container -->
</template>
<script setup lang="ts"></script>