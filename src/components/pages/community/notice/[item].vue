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
          <p v-if="sameItem?.creDate !== undefined">{{ formatDate(sameItem?.creDate) }}</p>
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
import { useRoute } from 'vue-router'
// import BreakText from '@/components/text/Break.vue';
interface NoticeDetails {
  title: string
  creDate: string
  content: string
}

import backButton from '@/components/button/backButton.vue'
import { getNoticeDetail } from '@/api/notice'
const noticeDetail = ref<NoticeDetails | null>(null)

const params = useRoute().params?.item
const sameItem = computed(() => noticeDetail.value)

import { useFormatDate } from '@/composables/dateType'

const { formatDate } = useFormatDate()

onMounted(() => {
  if (params) {
    const toNum = Number(params)
    fetchDetail(toNum)
  }
})

const fetchDetail = async (p: number) => {
  try {
    const responseDetail = await getNoticeDetail(p)
    noticeDetail.value = responseDetail.data
  } catch (error) {
    console.error(error)
  }
}
</script>
