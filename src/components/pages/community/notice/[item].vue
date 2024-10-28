<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <div class="btnArea">
          <backButton />
        </div>
        <h2>NOTICE</h2>
      </div>
      <!--// conTopArea -->
      <!-- detailArea -->
      <div class="detailArea">
        <!-- top -->
        <div class="top txtC">
          <h3>{{ sameItem?.title }}</h3>
          <p>{{ formatDate(sameItem?.creDate) }}</p>
        </div>
        <!--// top -->
        <!-- con -->
        <div class="con html-contents">
          <section v-dompurify-html="sameItem?.content"></section>
        </div>
        <!--// con -->
      </div>
      <!--// detailArea -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type RouteParamValue, useRoute } from 'vue-router'
// import BreakText from '@/components/text/Break.vue';

import backButton from '@/components/button/backButton.vue'
import { getNoticeDetail } from '@/api/notice'
const noticeDetail = ref<any>(null)

const params = useRoute().params?.item
const sameItem = computed(() => noticeDetail.value)

import { useFormatDate } from '@/composables/dateType'

const { formatDate } = useFormatDate()

onMounted(() => {
  fetchDetail(params) // 바로 params.value 사용
})

const fetchDetail = async (p: string | RouteParamValue[] | undefined) => {
  try {
    const responseDetail = await getNoticeDetail(p)
    noticeDetail.value = responseDetail.data
  } catch (error) {
    console.error(error)
  }
}
</script>
