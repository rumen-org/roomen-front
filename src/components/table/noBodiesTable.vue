<template>
  <table v-if="props?.tblData" :class="tblData.class">
    <caption>
      {{
        tblData.title
      }}
    </caption>
    <colgroup>
      <col
        v-for="(item, index) in defaultColGroup"
        :key="index"
        :span="item.span"
        :style="item.style ? { width: item.style } : {}"
        :class="item.className"
      />
    </colgroup>

    <thead>
      <tr>
        <template v-for="(head, headIdx) in defaultTHead">
          <th v-if="head.type === 'th'" :key="headIdx" :class="head.class" :scope="head.scope">
            {{ head.text }}
          </th>
          <td v-if="head.type === 'td'" :key="headIdx" :class="head.class">
            {{ head.text }}
          </td>
        </template>
      </tr>
    </thead>

    <tbody>
      <slot name="tableBody"></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface ColGroup {
  style?: string
  span?: number
  className?: string
}

interface THeadItem {
  type: 'th' | 'td'
  text: string
  cSpan?: number
  rSpan?: number
  class?: string
  scope?: 'col' | 'row'
}

interface TableData {
  title: string
  class: string
  colGroups: {
    col: ColGroup[]
  }
  tHead: THeadItem[]
}

// Props 정의 및 기본값 설정
const props = defineProps<{
  tblData: TableData
}>()

// 기본값 적용 로직
const defaultColGroup = props.tblData.colGroups.col.map(col => ({
  ...col,
  span: col.span ?? ''
}))

const defaultTHead = props.tblData.tHead.map(head => ({
  ...head,
  cSpan: head.cSpan ?? 1,
  rSpan: head.rSpan ?? 1,
  scope: head.scope ?? 'col'
}))

// const tblData = {
//   title: '테이블1',
//   class: '',
//   colGroups: {
//     col: [{ style: '100px', span: 1, className: 'col-class-1' }]
//   },
//   tHead: [
//     { type: 'th', text: '헤더1', cSpan: 1, rSpan: '', class: '' },
//     { type: 'th', text: '헤더1', cSpan: 1, rSpan: '', class: '' }
//   ],
//   tBody: {
//     tr: [
//       { type: 'td', text: '헤더1', cSpan: 1, rSpan: '', class: '' },
//       { type: 'td', text: '헤더1', cSpan: 1, rSpan: '', class: '' }
//     ]
//   }
// }
</script>
