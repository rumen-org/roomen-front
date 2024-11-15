<template>
  <div v-if="confirmState.isVisible" class="confirm-overlay">
    <div class="confirm-box">
      <p class="confirm-text">{{ confirmState.message }}</p>
      <div class="btnArea btnArea2">
        <button class="btn" @click="confirmState.onConfirm">확인</button>
        <button class="btn bgWhite" @click="confirmState.onCancel">취소</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConfirm } from '@/composables/useConfirm'

const { confirmState } = useConfirm()
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirm-box {
  background-color: white;
  padding: 20px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.btnArea2 {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.confirm-text {
  white-space: pre-wrap;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
