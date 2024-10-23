<template>
  <div class="orderTable">
    <table>
      <caption>상품정보, 주문일자, 주문번호, 주문금액(수량), 주문상태 항목으로 구성된 주문내역 목록표</caption>
      <colgroup>
        <col style="width:600px" class="mw300">
        <col style="width:200px" class="mw100">
        <col style="width:270px">
        <col style="width:200px" class="mw100">
        <col style="width:270px" class="mw150">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">상품정보</th>
        <th scope="col">주문일자</th>
        <th scope="col">주문번호</th>
        <th scope="col">주문금액(수량)</th>
        <th scope="col">주문상태</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in filteredResults" :key="idx">
        <td>
          <a href="" class="goodsInfo">
            <p class="img"><img src="@/assets/images/img-product-3.jpg" alt=""></p>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.subTitle }}</p>
              <div>
                [ 옵션 :
                <span v-for="(option, index) in item.options.split(' / ')" :key="index">
                  {{ option.trim() }}
                  <br v-if="index < item.options.split(' / ').length - 1" />
                </span>
                ]
              </div>
            </div>
          </a>
        </td>
        <td data-label="주문일자">2024.03.19</td>
        <td data-label="주문번호">2024031900001</td>
        <td data-label="주문금액(수량)"><em>₩ 1,400,000</em> <br/><em>(1개)</em></td>
        <td data-label="주문상태">상품준비중</td>
      </tr>

      <tr v-if="searchValue.length > 0 && filteredResults.length == 0">
        <td colspan="3" class="text-center">검색 결과가 없습니다.</td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--// orderTable -->
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
</template>

<script setup lang="ts">
import {computed, onMounted} from "vue";

const props = defineProps<{
  searchValue: string,
}>();

const orderDummy = {
  data: {
    list:[
      {
        title: '루멘 미디데스크',
        subTitle: 'Roomen MIDI DESK',
        options: '루멘 미디데스크 / 옐로우 / 화이트 / 수도권 (서울,경기,인천) (+ ₩50,000) / 없음',
        orderDate: '2024.03.19',
        orderId: '2024031900001',
        totalPrice: '1,400,000',
        quantity: 2,
        state: '배송준비중',
        imgUrl: ''
      },
      {
        title: '루멘 체어',
        subTitle: 'Roomen CHAIR',
        options: '루멘 체어 / 옐로우 / 화이트 / 수도권 (서울,경기,인천) (+ ₩50,000) / 없음',
        orderDate: '2024.03.19',
        orderId: '2024031900001',
        totalPrice: '300,000',
        quantity: 1,
        state: '배송준비중',
        imgUrl: ''
      }
    ]
  }
};
// const fetchList = async () => {
//   try {
//     const response = await getNoticeList();
//     noticeList.value = response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

const allLists = computed(() => orderDummy.data);
const emit = defineEmits(['update']);
const emitsData = () => {
  emit('update', allLists)
}

const filteredResults = computed(() => {
  return allLists.value.list.filter(item => {
    return item.title.toLowerCase().includes(props.searchValue.toLowerCase()) ||
        item.subTitle.toLowerCase().includes(props.searchValue.toLowerCase()) ||
        item.options.split(' / ').some(option =>
            option.toLowerCase().includes(props.searchValue.toLowerCase())
        );
  });
});


onMounted(() => {
  emitsData();
})
</script>