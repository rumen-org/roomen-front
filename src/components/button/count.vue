<template>
    <div class="count">
        <div>
            <button type="button" class="minusBtn" @click="minusBtn"><span class="hide">빼기</span></button>
            <span>{{ count }}</span>
            <button type="button" class="plusBtn" @click="plusBtn"><span class="hide">더하기</span></button>
        </div>
        <button type="button"><span class="hide">옵션삭제</span></button>
    </div>
  </template>
  <script setup lang="ts">
    import { ref } from 'vue';

    const count = ref(1); 

    const minusBtn = () => {
    if (count.value > 0) {
        count.value--;
    }
    };

    const plusBtn = () => {
    count.value++;
    };
  </script>