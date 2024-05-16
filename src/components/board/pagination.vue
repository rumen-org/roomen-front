<template>
  <div class="paging">
    <button type="button" @click="prevPage" class="btnPrev" :class="{'disabled': current === 1 }">이전 페이지</button>
    <button v-for="(props, i) in props?.totalPage" :key="i" @click="returnCurrent(i)" :class="i+1 == current ? 'accent' : ''">{{ i+1 }}</button>
    <button type="button" @click="nextPage" class="btnNext" :class="{'disabled': current == props?.totalPage }">다음 페이지</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// props 타입
interface interProps {
  propsCurrent: number,
  totalPage: number
}
const props = withDefaults(defineProps<interProps>(),{
  propsCurrent: 1,
  totalPage: 1
})
const emits = defineEmits(['update:current'])
// const currentPage = ref<number|null>(1);
const current = ref<number>(props.propsCurrent)
const returnCurrent = (i:number) => {
  current.value = i+1

  emits('update:current',i+1)
  console.log('클릭됨', i)
}
const prevPage = () => {
  current.value = current.value - 1
  emits('update:current',current.value)
}
const nextPage = () => {
  current.value = current.value + 1
  emits('update:current',current.value)
}
</script>
<style lang="scss" scoped>
  button.accent {font-weight: 600; color: #191919; }
</style>