<template>
  <div class="totalArea">
    <p class="shippingInfo">
      <span>{{ title }}</span>
      - {{ items.color1 }}/{{ items.color2 }} /{{ items.select1 }} / {{ items.select2 }}
    </p>
    <div class="count">
      <div>
        <button
          type="button"
          class="minusBtn"
          :disabled="state === 1 || state === 0"
          @click="changeValue('-')"
        >
          <span class="hide">빼기</span>
        </button>
        <span>{{ state }}</span>
        <button type="button" class="plusBtn" :disabled="state >= 10" @click="changeValue('+')">
          <span class="hide">더하기</span>
        </button>
      </div>
      <button class="cancelItem" @click="removeItem">
        <span class="blind">삭제</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, toRefs } from 'vue'
interface ItemsType {
  color1: string
  color2: string
  select1: string
  select2: string
}
const props = defineProps<{
  title: string | undefined
  items: ItemsType
  index: number
}>()
const { title, items } = toRefs(props)

const emit = defineEmits(['update', 'deleteItem'])
const state = ref<number>(1)

const changeValue = (e: string) => {
  if (e === '-') {
    state.value--
  } else if (e === '+') {
    state.value++
  }
  return emit('update', { i: props.index as number, q: state.value as number })
}
const removeItem = () => {
  emit('deleteItem', props.index)
}
</script>
