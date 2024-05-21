<template>
  <div class="detail">
    <div class="inner">
      <slot name="body"></slot>
      <button type="button" @click.stop="closePop"><span class="hide">닫기</span></button>
    </div>
  </div>
</template>
<script setup lang="ts">

// const props = defineProps();
const emits = defineEmits(['close']);
const closePop = () => {
  emits('close')
}


</script>