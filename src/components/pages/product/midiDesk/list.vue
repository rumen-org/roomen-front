
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
            <router-link
                :to="`midiDesk/${item.id}`"
                class="product"
                v-for="(item, index) in products" :key="index"

            >
              <p><img :src="`http://localhost:8080/files/${item.imgPath}`" alt="상품 섬네일"></p>
              <div>
                <strong class="tit">{{ item.name }}</strong>
                <p class="subTit">{{ item.subTitle }}</p>
                <p class="price">
                  <span>₩ {{ formatPrice(getOriginPrice(item.price, item.discountPer)) }}원</span>
                  <del>₩ {{ formatPrice(item.price) }}원</del>
                </p>
              </div>
            </router-link>
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
import {onMounted, ref} from "vue";
import { getCategoryProductList } from '@/api/products'
import {getOriginPrice, formatPrice} from '@/composables/calculate'
  interface ProductsType {
    id: number;
    name: string;
    imgPath: string;
    price: number;
    discountPer: number;
    subTitle: string;
    category: string;
    label: string | null;
    otherInfo: string | null;
    shippingCost: number | null;
    content: string;
    inStock: boolean;
    images: string[];
  }

  const products = ref<ProductsType[]>([]);
  const fetchCategoryList = async() => {
    try {
      const response = await getCategoryProductList('mididesk');
      console.log(response.data, 'fdf');
      products.value = response.data;
    } catch(error) {
      console.error(error);
    }
  }


onMounted(() => {
    fetchCategoryList();
})
</script>
  