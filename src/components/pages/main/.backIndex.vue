<template>
  <div>main Page
    <em>{{t('messages.text1')}}</em>
    <select name="lang-select" id="lang" @change="changeLocale" v-model="selectValue">
      <option value="ko" >KR</option>
      <option value="en">EN</option>
    </select>
    <div class="board-inner">
      <ul class="parent">
        <li class="child" v-for="(item, i) in data" :key="i">
          <routerLink class="item_area" :to="item.qId">
            <p class="item_bg" :style="{ 'background': 'url('+`${item.tNImg}`+') no-repeat center / cover' }"><span class="blind-text">게시물 섬네일 이미지</span></p>
            <dl class="item_txt">
              <dt class="item_tit">{{ item.tit }}</dt>
              <dd class="item_sub clamp"><WordBreak v-if="item.content" :break-text="item.content" /></dd>
              <dd class="item_date">{{ item.date }}</dd>
            </dl>
          </routerLink>
        </li>
      </ul>
    </div>
    <div>
      <article class="swiper-test">
        <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            navigation
            :pagination="{ clickable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
        </swiper>

      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Navigation, Pagination, A11y } from 'swiper/modules';

const modules = [Navigation, Pagination, A11y]
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import WordBreak from '../../text/Break.vue'
import { useI18n } from 'vue-i18n';
import {computed, ref, watchEffect} from 'vue'
const onSwiper = (swiper:any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const { t, locale, messages } = useI18n({
});
const msgs = computed<object>(()=>{return messages})
console.log('msgs',msgs)
const selectValue = ref('ko')
const changeLocale = () => {
  locale.value = selectValue.value;
  console.log('selectValue',selectValue, locale)
}

watchEffect(() => {
  console.log('messages')
})
const data = [
  {
    tit: 'VS 한화이글스(1차전)',
    author: '김재현 단장',
    date: '2024-03-01',
    content: '--- Start Line Up ---\nSp: 김광현(0)\n1. 최지훈(8)\n2. 하재훈(7)\n3. 최정(5)\n4. 한유섬(9)\n5. 에레디아(DH)\n6. 박성한(6)\n7. 안상현(4)\n8. 전의산(3)\n9. 이지영(2)\n----------',
    commentYn: 'N',
    tNImg: 'https://i.ytimg.com/vi/sJUbYJ89o6w/hqdefault.jpg',
    contentImg: '',
    qId: '152'
  },
  {
    tit: 'VS 한화이글스(2차전)',
    author: '이숭용 감독',
    date: '2024-03-02',
    content: '--- Start Line Up ---\nSp: 오원석(0)\n1. 최지훈(8)\n2. 하재훈(7)\n3. 최정(5)\n4. 한유섬(9)\n5. 에레디아(DH)\n6. 박성한(6)\n7. 안상현(4)\n8. 전의산(3)\n9. 이지영(2)\n----------',
    commentYn: 'N',
    tNImg: 'https://i.ytimg.com/vi/sJUbYJ89o6w/hqdefault.jpg',
    contentImg: '',
    qId: '153'
  },
  {
    tit: 'VS 한화이글스(3차전)',
    author: '이흥련 분석원',
    date: '2024-03-03',
    content: '--- Start Line Up ---\nSp: 노경은(0)\n1. 최지훈(8)\n2. 하재훈(7)\n3. 최정(5)\n4. 한유섬(9)\n5. 에레디아(DH)\n6. 박성한(6)\n7. 안상현(4)\n8. 전의산(3)\n9. 이지영(2)\n----------',
    commentYn: 'N',
    tNImg: 'https://i.ytimg.com/vi/sJUbYJ89o6w/hqdefault.jpg',
    contentImg: '',
    qId: '154'
  },
  {
    tit: 'VS 롯데 자이언츠(1차전)',
    author: '배영수 투수코치',
    date: '2024-03-04',
    content: '--- Start Line Up ---\nSp: 박종훈(0)\n1. 최지훈(8)\n2. 하재훈(7)\n3. 최정(5)\n4. 한유섬(9)\n5. 에레디아(DH)\n6. 박성한(6)\n7. 안상현(4)\n8. 전의산(3)\n9. 이지영(2)\n----------',
    commentYn: 'N',
    tNImg: 'https://i.ytimg.com/vi/sJUbYJ89o6w/hqdefault.jpg',
    contentImg: '',
    qId: '155'
  },
  {
    tit: 'VS 롯데 자이언츠(2차전)',
    author: '조동화 작전코치',
    date: '2024-03-05',
    content: '--- Start Line Up ---\nSp: 엘리아스(0)\n1. 최지훈(8)\n2. 하재훈(7)\n3. 최정(5)\n4. 한유섬(9)\n5. 에레디아(DH)\n6. 박성한(6)\n7. 안상현(4)\n8. 전의산(3)\n9. 이지영(2)\n----------',
    commentYn: 'N',
    tNImg: 'https://i.ytimg.com/vi/sJUbYJ89o6w/hqdefault.jpg',
    contentImg: '',
    qId: '156'
  },
  {
    tit: 'VS 롯데 자이언츠(3차전)',
    author: '스즈키 후미히로 수비코치',
    date: '2024-03-06',
    content: '--- Start Line Up ---\nSp: 송영진(0)\n1. 최지훈(8)\n2. 하재훈(7)\n3. 최정(5)\n4. 한유섬(9)\n5. 에레디아(DH)\n6. 박성한(6)\n7. 안상현(4)\n8. 전의산(3)\n9. 이지영(2)\n----------',
    commentYn: 'N',
    tNImg: 'https://i.ytimg.com/vi/sJUbYJ89o6w/hqdefault.jpg',
    contentImg: '',
    qId: '157'
  },
];

</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {font-size: 12px;   margin: 0;
  padding: 0;
  box-sizing: border-box;}
.board-inner {margin: 0 auto; width: 100%; max-width: 1200px;}
.parent {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
}
a {text-decoration: none; color: #333;}
.parent .child {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  height: 240px;
  position: relative;
  border-radius: 12px;
  flex-basis: calc((100% - 60px) / 4);
}
.item_area {height: 100%; font-size: 14px;}
.item_area .item_bg {display: block; height: 92px;}
.item_area .item_txt {display: flex; flex-direction: column;padding: 1.0417vw; gap: 10px;}
.blind {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.item_area .item_txt .item_tit {font-size: 16px; font-weight: 700;}
.item_date {margin-left: auto; margin-top: auto; font-size: 12px; letter-spacing: -0.025em;}
.swiper-test {margin: 40px auto 0; max-width: 400px; height: 300px; display: flex; justify-content: stretch; align-items: stretch; text-align: center}
.swiper-slide {display: flex; justify-content: center; align-items: center;}
@media (max-width: 640px) {
  .parent .child {
    flex-basis: calc((100% - 40px) / 2);
    border-radius: 6px;
  }
}

@media (max-width: 480px) {
  .parent .child {
    flex-basis: 100%;
    border-radius: 4px;
  }
}
</style>
