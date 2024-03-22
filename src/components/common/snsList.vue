<template>
  <div>
    <table>
      <caption>{{ tblData.tit }}</caption>
      <slot v-if="tblData.tHead">
        <thead>
          <tr v-for="(trItem, idx) in tblData.tHead" :key="idx">
            <slot v-if="trItem.th">
              <th>{{ trItem.th.con.text }}</th>
            </slot>
            <slot v-if="trItem.td">
              <td>{{ trItem.td.con.text }}</td>
            </slot>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(trItem, idx) in tblData.tBody" :key="idx">
            <slot v-if="trItem.th">
              <th>{{ trItem.th.con.text }}</th>
            </slot>
            <slot v-if="trItem.td">
              <td>{{ trItem.td.con.text }}</td>
            </slot>
          </tr>
        </tbody>
      </slot>
    </table>
  </div>
</template>
<script setup lang="ts">
// defineProps({
// 	title:{
//     	Type: String,
//         default : ""
//     }
// })
// defineEmits({
// 	title:{
//     	Type: String,
//         default : ""
//     }
// })
const tblData = {
  tit: '테이블1',
  colgroups: [
    {width: ''},
  ],
  tHead: {
    tr: {
      th: {
      con: { text: '', img: '', btn: '', btn_fn: ''},
      // btn_fn은 URL 또는 사용에 필요한 기능으로 구현 변경 가능하게 동적 값 적용예정
      options: { cSpan: '1', rSpan: '', pd: '' },  
      // 여러 유형의 동적 값에 맞추어 colSpan, RowSpan처리 가능하게 처리
      style: {style: ''}
      },
      td: {
        con: { text: '', img: '', btn: '', btn_fn: ''},
        // btn_fn은 URL 또는 사용에 필요한 기능으로 구현 변경 가능하게 동적 값 적용예정
        options: { cSpan: '1', rSpan: '', pd: '' },  
        // 여러 유형의 동적 값에 맞추어 colSpan, RowSpan처리 가능하게 처리
        style: {style: ''}
      },
    }
  },
  tBody: {
    tr: {
      th: {
        con: { text: '', img: '', btn: '', btn_fn: ''},
        // btn_fn은 URL 또는 사용에 필요한 기능으로 구현 변경 가능하게 동적 값 적용예정
        options: { cSpan: '1', rSpan: '', pd: '' },  
        // 여러 유형의 동적 값에 맞추어 colSpan, RowSpan처리 가능하게 처리
        style: {style: ''}
      },
      td: {
        con: { text: '', img: '', btn: '', btn_fn: ''},
        // btn_fn은 URL 또는 사용에 필요한 기능으로 구현 변경 가능하게 동적 값 적용예정
        options: { cSpan: '1', rSpan: '', pd: '' },  
        // 여러 유형의 동적 값에 맞추어 colSpan, RowSpan처리 가능하게 처리
        style: {style: ''}
      },
    }
  }
}
// 현재는 임시 ref 변수이나, Api로 data를 가져오는 경우엔, Store + Computed, 등의 값을 적용 예정
</script>