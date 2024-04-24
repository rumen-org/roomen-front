<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea v3">
        <h2>CART</h2>
      </div>
      <!--// conTopArea -->
      <!-- cartList -->
      <div class="cartList">
        <div class="goods">
          <div class="fixed">
                            <span class="checkbox noTxt">
                                <input type="checkbox" id="chk0101">
                                <label for="chk0101">선택</label>
                            </span>
            <p class="img w180"><img src="@/assets/images/img-product-3.jpg" alt=""></p>
          </div>
          <div>
            <p class="name">
              <strong>루멘 미디데스크</strong>
              <span class="fontG">Roomen MIDI DESK</span>
            </p>
            <p class="price fontN">₩ <em class="fontG">1,350,000</em></p>
            <p class="option">[옵션: 옐로우/화이트/수도권 (서울,경기,인천) (+ ₩50,000)/없음]</p>
            <div class="count">
              <div>
                <button type="button" class="minusBtn"><span class="hide">빼기</span></button>
                <span>1</span>
                <button type="button" class="plusBtn"><span class="hide">더하기</span></button>
              </div>
              <button>변경</button>
            </div>
          </div>
          <p class="totalPrice fontN">₩ <em class="fontG">1,400,000</em></p>
          <a href=""><span class="hide">삭제</span></a>
        </div>

      </div>
      <!--// cartList -->
      <!-- allBtnArea -->
      <div class="allBtnArea">
        <button type="button" class="btn chckBtn">전체선택</button>
        <button type="button" class="btn chckBtn">전체삭제</button>
      </div>
      <!--// allBtnArea -->
      <!-- btnArea -->
      <div class="btnArea txtR">
        <button type="button" class="btn sL w230">주문하기</button>
      </div>
      <!--// btnArea -->
    </div>
  </div>
</template>
<script setup lang="ts"></script>