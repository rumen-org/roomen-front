<template>
    <div class="tab">
      <ul>
        <li
          v-for="(item, i) in tabData" :key="i"
          :class="{
            curr: isActive(`${item.value}`)
          }"
          @click="goTo(`${item.value}`)"
        >
          <button
            type="button"
          >{{ item.label }}</button>
        </li>
      </ul>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const router =  useRouter();
const routePath = computed(()=>{
  return route.path
})

const goTo = (path: string) => {
  router.push(`/mypage/${path}`);
};

const tabData = [
  {value: 'orders', label: '주문내역'},
  {value: 'shipAddress', label: '배송지 관리'},
  {value: 'memberInfo', label: '회원정보 수정'},
  {value: 'changePassword', label: '비밀번호 변경'}

]

const isActive = (category: string) => {
  return route.params.category == category;
}
</script>