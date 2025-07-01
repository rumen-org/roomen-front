<template>
  <div id="container" class="noti-detail">
    <div class="contents">
      <!-- contents-top-area -->
      <div class="contents-top-area">
        <div class="btn-area">
          <backButton />
        </div>
        <h2>NOTICE</h2>
      </div>
      <!--// contents-top-area -->
      <!-- detail-area -->
      <div class="detail-area">
        <!-- top -->
        <div class="top txt-c">
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
      <!--// detail-area -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// import BreakText from '@/components/text/Break.vue';
// Models
import { NoticeDetails } from '@/models/interfaces/Notice'
import backButton from '@/components/button/backButton.vue'
import { getNoticeDetail } from '@/api/notice'
const noticeDetail = ref<NoticeDetails | null>(null)

const params = useRoute().params?.item
const sameItem = computed(() => noticeDetail.value)

import { useFormatDate } from '@/composables/useDateType'

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
