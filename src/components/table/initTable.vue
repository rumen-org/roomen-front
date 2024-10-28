<template>
  <div>
    <table>
      <caption>
        {{
          tblData.tit
        }}
      </caption>
      <colgroup>
        <col
          v-for="(item, index) in tblData.colGroups.col"
          :key="index"
          :style="{ width: item.width + 'px' }"
          :class="item.className"
        />
      </colgroup>
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
    </table>
  </div>
</template>
<script setup lang="ts">
const tblData = {
  tit: '테이블1',
  colGroups: {
    col: [{ width: '', className: '' }]
  },
  tHead: {
    tr: {
      th: {
        con: [{ text: '', img: '', btn: '', btn_fn: '' }],
        options: { cSpan: '1', rSpan: '', pd: '' },
        style: { style: '' }
      },
      td: {
        con: [{ text: '', img: '', btn: '', btn_fn: '' }],
        options: { cSpan: '1', rSpan: '', pd: '' },
        style: { style: '' }
      }
    }
  },
  tBody: {
    tr: {
      th: {
        con: [{ text: '', img: '', btn: '', btn_fn: '' }],
        options: { cSpan: '1', rSpan: '', pd: '' },
        style: { style: '' }
      },
      td: {
        con: [{ text: '', img: '', btn: '', btn_fn: '' }],
        // btn_fn은 URL 또는 사용에 필요한 기능으로 구현 변경 가능하게 동적 값 적용예정
        options: { cSpan: '1', rSpan: '', pd: '' },
        style: { style: '' }
      }
    }
  }
}
</script>
