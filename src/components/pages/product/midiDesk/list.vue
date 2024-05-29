
<template >

    <!-- container -->
    <div id="container">
      <div class="contents">
        <!-- conTopArea -->
        <div class="conTopArea">
          <div class="sorting">
            <ul>
              <li class="curr"><button type="button">신상품 순</button></li>
              <li><button type="button">낮은가격 순</button></li>
              <li><button type="button">높은가격 순</button></li>
            </ul>
          </div>
          <h2>MIDI DESK</h2>
          <div class="srchArea">
            <input type="text" title="검색">
            <button type="button" class="srchBtn"><span class="hide">검색하기</span></button>
          </div>
        </div>
        <!--// conTopArea -->
        <!-- productList -->
        <div class="productList">
          <router-link :to="`midiDesk/${item[0].id}`" class="product">
            <p><img src="@/assets/images/img-product-4.png" alt=""></p>
            <div>
              <strong class="tit">루멘 미디데스크</strong>
              <p class="subTit">Roomen MIDI DESK</p>
              <p class="price">
                <span>₩ 1,350,000</span>
                <del>₩ 1,550,000</del>
              </p>
            </div>
          </router-link>
          <a href="" class="product">
            <p><img src="@/assets/images/img-product-2.png" alt=""></p>
            <div>
              <strong class="tit">루멘 미디데스크</strong>
              <p class="subTit">Roomen MIDI DESK</p>
              <p class="price">
                <span>₩ 1,350,000</span>
                <del>₩ 1,550,000</del>
              </p>
            </div>
          </a>
        </div>
        <!--// productList -->
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
  
  <script setup lang="ts">
  const item = [
      {id: "id1", contents: "text..."},
      {id: "id2", contents: "text..."},
      {id: "id3", contents: "text..."}
  ]
  </script>
  