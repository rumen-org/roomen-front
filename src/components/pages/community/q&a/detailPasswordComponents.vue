<template>
  <div class="qnaPw">
    <input
        type="password"
        title="비밀번호 입력"
        placeholder="비밀번호"
        v-model="password"
        @keydown.enter="submitPassword"
    />
    <button type="button" class="btn" @click="submitPassword">확인</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['submit']);
const password = ref('');

const submitPassword = () => {
  emits('submit', password.value);
};
</script>