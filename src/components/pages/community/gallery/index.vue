<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <div></div>
        <h2>GALLERY</h2>
        <div class="srchArea">
          <input type="text" title="검색">
          <button type="button" class="srchBtn"><span class="hide">검색하기</span></button>
        </div>
      </div>
      <!--// conTopArea -->
      <!-- galleryList -->
      <div class="galleryList">
        <ul>
          <li v-for="(item, i ) in galleryItems" :key="i">
            <div @click.stop="callModal">
              <p><img :src="`src/assets/images/${item.path}`" alt=""></p>
              <span>{{ item.text }}</span>
              <template v-if="isShowModal == true">
                <layerPop @close="closeModal">
                  <template #body>
                    <div class="detailSlider">
                      <div class="swiper-wrapper">
                        <swiper
                            ref="modalSwiper"
                            :slides-per-view="1"
                            :effect="'fade'"
                            :loop="false"
                            :speed="800"
                            :modules="[Navigation, Pagination, EffectFade]"
                            :observer="true"
                            :observeParents="true"
                            :pagination="{
                              el: '._productPaging',
                              clickable: true
                            }"
                            :navigation="{
                              enabled: true,
                              nextEl: '._GalleryPrev',
                              prevEl: '._GalleryNext'
                            }"
                        >
                          <swiper-slide v-for="(item, i) in layerImg" :key="i"><p class="swiper-slide"><img :src="`src/assets/images/${item}`" alt="">{{item}}</p></swiper-slide>
                        </swiper>

                      </div>
                      <div class="_GalleryPrev swiper-button-prev"></div>
                      <div class="_GalleryNext swiper-button-next"></div>
                    </div>
                    <div>
                      <p class="title">MMM STUDIO</p>
                      <ul>
                        <li>{{ layer.tit }}</li>
                        <li v-for="(item, i) in layer.hash" :key="i">{{ item }}</li>
                      </ul>
                    </div>
                  </template>
                </layerPop>
              </template>
            </div>
          </li>
        </ul>
      </div>
      <!--// galleryLists -->


    </div>
  </div>
</template>
<script setup lang="ts">
import layerPop from '@/components/teleport/LayerPopup.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useModal } from '@/composables/modalLayer';
import {computed, ref, watch} from "vue";
const { isShowModal, closeModal, callModal } = useModal();

const modalSwiper = ref<SwiperInstance | null>(null);
watch(isShowModal,()=>{console.log('isShowModalOnWatch',isShowModal.value)})
const galleryItems = [
  {
    path: 'img-gallery01.jpg',
    text: 'MMM STUDIO1'
  },
  {
    path: 'img-gallery02.jpg',
    text: 'MMM STUDIO2'
  },
  {
    path: 'img-gallery03.jpg',
    text: 'MMM STUDIO3'
  },
  {
    path: 'img-gallery04.jpg',
    text: 'MMM STUDIO4'
  },
  {
    path: 'img-gallery05.jpg',
    text: 'MMM STUDIO5'
  },
  {
    path: 'img-gallery06.jpg',
    text: 'MMM STUDIO6'
  }
]
const layer = {
  imgs: ['img-gallery01.jpg','img-gallery02.jpg','img-gallery03.jpg'],
  tit: '#서울시 동대문구 MMM STUDIO',
  hash: ['#BLACK','#BROWN','#WHITE','#DESK','#스튜디오']
}
const layerImg = computed(()=>{return layer.imgs})
</script>