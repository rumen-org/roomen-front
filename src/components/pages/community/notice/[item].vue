<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <div class="btnArea">
          <button type="button" class="iconBtn back">돌아가기</button>
        </div>
        <h2>NOTICE</h2>
      </div>
      <!--// conTopArea -->
      <!-- detailArea -->
      <div class="detailArea">
        <!-- top -->
        <div class="top txtC">
          <h3>{{ sameItem?.title }}</h3>
          <p>{{ sameItem?.regDtm }}

          </p>
        </div>
        <!--// top -->
        <!-- con -->
        <div class="con">
          <BreakText :break-text="sameItem?.content" />
        </div>
        <!--// con -->
      </div>
      <!--// detailArea -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import {useRoute} from 'vue-router'
import BreakText from '@/components/text/Break.vue'
import data from '@/mocks/json/noticeDetails.json'
const params = useRoute().params?.item;
const sameItem = computed(()=>{
  return data?.data.find(item => item.id === params);
});

console.log('test');
watchEffect(()=>{
  console.log('sameItem',sameItem)
  console.log('sameItem',sameItem.value)
})

</script>
