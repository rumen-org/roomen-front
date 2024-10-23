<template>
  <div class="srchArea">
    <input
        type="text"
        title="검색"
        v-model="searchValue"
        @keyup.enter="onSearch"
    >
    <button
        type="button"
        class="srchBtn"
        @keydown.enter="onSearch"
        @click="onSearch"
    >
      <span class="hide">검색하기</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{ searchValue: string}>();
const emits = defineEmits(['update:searchValue', 'search']);

const searchValue = ref<string>('');

const onSearch = () => {
  emits('update:searchValue', searchValue.value);
}
searchValue.value = props.searchValue;
</script>