<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <template v-for="(text, index) in getBreakTag" :key="index">
    {{ text }} <br v-if="index < getBreakTag.length - 1" />
  </template>
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
    breakText: {
        type: [String, Number, Boolean, Array, Date],
        default: '',
    },
    keepLast: {
        type: Boolean,
        default: false,
    },
});
const getBreakTag = computed(() => {
  const string = String(props.breakText);
    if (string === 'undefined' || string === 'null') {
        return [];
    }
  // const splits = string.split(/<br\s?\/?>/);
  const splits = string.split(/<br\s?\/?>|\n/);
    const result =
        splits[splits.length - 1] === '' && !props.keepLast
            ? splits.filter((split, index, array) => index < array.length - 1)
            : splits;
    return result;
});
</script>

<style></style>
<!-- API로 받은 json 전처리용 컴포넌트 -->
