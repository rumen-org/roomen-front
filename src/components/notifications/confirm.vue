<template>
  <div v-if="confirmState.isVisible" class="confirm-overlay">
    <div class="confirm-box">
      <p class="confirm-text">{{ confirmState.message }}</p>
    </div>
    <div class="btn-area btn-area2">
      <button class="btn" @click="confirmState.onConfirm">확인</button>
      <button class="btn bg-white" @click="confirmState.onCancel">취소</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConfirm } from '@/composables/useConfirm'

const { confirmState } = useConfirm()
</script>