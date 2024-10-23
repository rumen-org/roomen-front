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
          <li v-for="(item, i ) in lists" :key="i">
            <div>
              <p @click.stop="getItem(item.id)">
                <img :src="
                item.thumbImg.startsWith('http')
                  ? item.thumbImg
                  : `https://placehold.co/600x400/000000/333333.png`"
                     alt="갤러리 게시판 - 섬네일 이미지"
                >
              </p>
              <span>{{ item.title }}</span>
              <template v-if="isShowModal">
                <layerPop @close="initItem">
                  <template #body>
                    <div class="galDetailSlider">
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
                          <swiper-slide v-for="(box, index) in items?.imageUrls" :key="index">
                            <p class="swiper-slide">
                              <img
                                  :src="
                                    !box.startsWith('http')
                                      ? `src/assets/images/${box}`
                                      : box
                                    "
                                  alt="RoomenGallery_이미지"
                              />
                            </p>
                          </swiper-slide>
                        </swiper>

                      </div>
                      <div class="_GalleryPrev swiper-button-prev"></div>
                      <div class="_GalleryNext swiper-button-next"></div>
                    </div>
                    <div>
                      <p class="title">{{items?.title}}</p>
                      <ul>
                        <li v-for="(item, i) in items?.tags" :key="i">#{{ item }} </li>
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
import {onMounted, ref} from "vue";
const { isShowModal, closeModal, callModal } = useModal();

import { getGalleryList, getGalleryItem } from '@/api/gallery'

const modalSwiper = ref<SwiperInstance | null>(null);

interface GalleryItem {
  id: number;
  title: string;
  tags: string | string[];
  imageUrls: string[];
  thumbImg: string;
  displayDate: string;
}

const lists = ref<GalleryItem[]>([]);
const items = ref<GalleryItem|null>(null);
const getFetchList = async () => {
  try {
    const data = await getGalleryList();
    lists.value = data.data;

  } catch (error) {
    console.error(error);
  }
}
const getItem = async (id: number) => {
  try {
    const modalData = await getGalleryItem(id);
    items.value = {
      ...modalData.data,
      imageUrls: modalData.data.imageUrls.map((item: string) => item.trim()),
    };
    callModal();
  } catch (error) {
    console.error(error);
  }
}
const initItem = () => {
  items.value = null;
  closeModal();
}
onMounted(() => {
  getFetchList();
})
</script>