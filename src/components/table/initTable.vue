<template>
  <div v-if="props?.tblData">
    <table :class="tblData.class">
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

      <tbody v-if="defaultTBody">
        <template v-if="props.tblData.tBody?.tr && defaultTBody.length">
          <tr v-for="(trItem, idx) in defaultTBody" :key="idx">
            <th
              v-if="trItem && trItem.type === 'th'"
              :key="idx"
              :colspan="trItem.cSpan"
              :rowspan="trItem.rSpan"
              :class="trItem.class"
            >
              {{ trItem.text }}
            </th>
            <td
              v-if="trItem.type === 'td'"
              :key="idx"
              :colspan="trItem.cSpan"
              :rowspan="trItem.rSpan"
              :class="trItem.class"
            >
              {{ trItem.text }}
            </td>
          </tr>
        </template>
        <slot v-else name="tableBody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface ColGroup {
  style?: string
  span?: number
  className?: string
}

interface THeadItem {
  type?: 'th' | 'td'
  text: string
  cSpan?: number
  rSpan?: number
  class?: string
  scope?: 'col' | 'row'
}

interface TBodyItem {
  type: 'th' | 'td'
  text: string
  cSpan?: number
  rSpan?: number
  class?: string
}

interface TableData {
  title: string
  class: string
  colGroups: {
    col: ColGroup[]
  }
  tHead: THeadItem[]
  tBody?: {
    tr?: TBodyItem[]
  }
}

// Props 정의 및 기본값 설정
const props = defineProps<{
  tblData: TableData
}>()

// 기본값 적용 로직
const defaultColGroup = props.tblData.colGroups.col.map(col => ({
  ...col,
  span: col.span ?? 1
}))

const defaultTHead = props.tblData.tHead.map(head => ({
  ...head,
  cSpan: head.cSpan ?? 1,
  rSpan: head.rSpan ?? 1,
  scope: head.scope ?? 'col'
}))

const defaultTBody: TBodyItem[] =
  props.tblData.tBody?.tr?.map(body => ({
    ...body,
    cSpan: body.cSpan ?? 1,
    rSpan: body.rSpan ?? 1
  })) ?? []
</script>
