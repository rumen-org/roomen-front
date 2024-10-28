<template>
  <div v-if="alertState.message" :class="['alert', alertState.type]" @click="hideAlert">
    {{ alertState.message }}
  </div>
</template>

<script lang="ts" setup>
import { useAlert } from '@/composables/useAlert'

const { alertState, hideAlert } = useAlert()
</script>

<style scoped>
.alert {
  position: fixed;
  inset: 50% 0 0 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
  z-index: 1000;
}

.alert.success {
  background-color: #4caf50;
  color: white;
}

.alert.error {
  background-color: #f44336;
  color: white;
}

/* Alert가 사라질 때 애니메이션 */
.alert.leave-active {
  opacity: 0;
}
</style>
