
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
          <template v-for="(item, index) in itemBox" :key="index">
            <router-link :to="`midiDesk/${item.id}`" class="product">
              <p><img :src="`src${item.ThumbImg}`" :alt="item.ThumbAlt"></p>
              <div>
                <strong class="tit">{{ item.title }}</strong>
                <p class="subTit">{{ item.subTit }}</p>
                <p class="price">
                  <span>{{ item.discount }}</span>
                  <del>{{ item.price }}</del>
                </p>
              </div>
            </router-link>
          </template>
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
  const itemBox = [
      {id: "id1",title: "루멘 미디데스크1" ,subTit: "Roomen MIDI DESK1", price: "1,550,001", discount: "1,350,001" , contents: "text...",ThumbImg: "/assets/images/img-product-4.png", ThumbAlt: "상품_섬네일1"},
      {id: "id2",title: "루멘 미디데스크2" ,subTit: "Roomen MIDI DESK2", price: "1,550,002", discount: "1,350,002" , contents: "text...",ThumbImg: "/assets/images/img-product-2.png", ThumbAlt: "상품_섬네일2"},
      {id: "id3",title: "루멘 미디데스크3" ,subTit: "Roomen MIDI DESK3", price: "1,550,003", discount: "1,350,003" , contents: "text...",ThumbImg: "/assets/images/img-product-4.png", ThumbAlt: "상품_섬네일3"},

  ]
  </script>
  