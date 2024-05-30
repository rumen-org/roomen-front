<template>
    <button type="button" class="scrollDown" v-if="showScrollDown"><span class="hide">아래로 스크롤</span></button>
</template>
<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const showScrollDown = ref(true);

    const handleScroll = () => {
        showScrollDown.value = window.scrollY === 0;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>