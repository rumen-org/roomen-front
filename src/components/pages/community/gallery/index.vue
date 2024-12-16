<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <div></div>
        <Breadcrumb />
        <searchComponent v-model:searchValue="searchValue" @search="searchItem" />
      </div>
      <!--// conTopArea -->
      <!-- galleryList -->
      <div class="galleryList">
        <ul>
          <li v-for="(item, i) in lists.slice(0, itemQuantity)" :key="i">
            <div>
              <p @click.stop="getItem(item.id)">
                <img
                  :src="
                    item.thumbImg.startsWith('http')
                      ? `https://back.rooemn.kro.kr/${item.thumbImg}`
                      : `https://placehold.co/600x400/000000/333333.png`
                  "
                  alt="갤러리 게시판 - 섬네일 이미지"
                />
              </p>
              <span v-dompurify-html="highlightText(item.title, searchValue)"></span>
              <!-- // LayerPopup -->
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
                          :observe-parents="true"
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
                                :src="!box.startsWith('http') ? `src/assets/images/${box}` : box"
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
                      <p class="title">{{ items?.title }}</p>
                      <ul>
                        <li v-for="(item2, i2) in items?.tags" :key="i2">#{{ item2 }}</li>
                      </ul>
                    </div>
                  </template>
                </layerPop>
              </template>
              <!-- // LayerPopup -->
            </div>
          </li>
        </ul>
      </div>
      <!--// galleryLists -->
    </div>
    <div class="btnArea txtC mt-50">
      <p v-if="notMore">더 보여질 게시물이 없습니다.</p>
      <button class="btn bgWhite sM w90 mt-30" :disabled="notMore" @click="moreBtn">더 보기</button>
    </div>
  </div>
</template>
<script setup lang="ts">
// Components
import layerPop from '@/components/teleport/LayerPopup.vue'
import searchComponent from '@/components/search/search.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/swiper-bundle.css'

const lists = ref<GalleryItem[]>([])
const items = ref<GalleryItem | null>(null)
const fetchList = async () => {
  try {
    const data = await getGalleryList(searchValue.value)
    lists.value = data.data
  } catch (error) {
    console.error(error)
  }
}
// Models
import { GalleryItem } from '@/models/interfaces/Gallery'
// Composables
import { useModal } from '@/composables/useLayerPopup'
import { computed, onMounted, ref } from 'vue'
const { isShowModal, closeModal, callModal } = useModal()
import { useSearch } from '@/composables/useSearch'
import { usePagination } from '@/composables/usePagination'
const { currentPage } = usePagination(fetchList)
const { highlightText, searchValue, searchItem } = useSearch<GalleryItem>(
  fetchList,
  lists,
  currentPage
)
import { getGalleryList, getGalleryItem } from '@/api/gallery'
// Layer Swiper
const modalSwiper = ref<SwiperInstance | null>(null)
const getItem = async (id: number) => {
  try {
    const modalData = await getGalleryItem(id)
    items.value = {
      ...modalData.data,
      imageUrls: modalData.data.imageUrls.map((item: string) => item.trim())
    }
    callModal()
  } catch (error) {
    console.error(error)
  }
}
const initItem = () => {
  items.value = null
  closeModal()
}
const notMore = computed<boolean>(() => {
  return lists.value.length <= itemQuantity.value
})
const itemQuantity = ref<number>(6)
const moreBtn = () => {
  itemQuantity.value = itemQuantity.value + 6
}
onMounted(() => {
  fetchList()
})
</script>
