<template>
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
      <span>{{state}}</span>
      <button
          type="button"
          class="plusBtn"
          :disabled="state >= 10"
          @click="changeValue('+')"
      >
        <span class="hide">더하기</span>
      </button>
    </div>
    <button
        @click="fixQuantity"
    >
      변경
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";
const props = defineProps<{
  id: number,
  initValue: number
}>();
const emit = defineEmits(['update']);
const state = ref<number>(props.initValue);

const changeValue = (e: string) => {
  if (e === '-') {
    state.value--;
  } else if (e === '+') {
    state.value++;
  }
}
const fixQuantity = () => {
  emit('update', {id: props.id, value: state.value});
}

</script>