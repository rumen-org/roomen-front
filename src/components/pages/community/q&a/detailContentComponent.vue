<!-- components/ContentDisplay.vue -->
<template>
  <div class="conDetail">
    <p>{{ content?.content }}</p>
    <div class="img">
      <p><img src="../assets/images/img-gallery01.jpg" alt="" /></p>
      <div v-if="isOwner">
        <button type="button" class="btn">수정</button>
        <button type="button" class="btn">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  content: Object,
  isOwner: Boolean,
});
</script>
