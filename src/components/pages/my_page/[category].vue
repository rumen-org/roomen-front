<template>
  <!-- container -->
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div v-if="category !== 'addShipAddress'" class="conTopArea">
        <tab />
        <searchComponent
          v-if="category === 'PurchaseHistory'"
          v-model:searchValue="searchValue"
          @search="searchItem"
        />
      </div>
      <!--// conTopArea -->
      <!-- orderTable -->
      <component :is="current" v-bind="currentProps" v-on="currentEmits" />
      <!--// conBottomArea -->
    </div>
  </div>
  <!-- container -->
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

// 탭 컴포넌트
import Tab from '@/components/page_items/mypage/tab.vue'
// 검색 컴포넌트
import searchComponent from '@/components/search/search.vue'

// 동적 컴포넌트
import PurchaseHistory from '@/components/pages/my_page/subDirectory/purchaseHistory.vue'
import ShipAddress from '@/components/pages/my_page/subDirectory/address/shipAdress.vue'
import MemberInfo from '@/components/pages/my_page/subDirectory/memberInfo.vue'
import ChangePassword from '@/components/pages/my_page/subDirectory/changePassword.vue'
import WriteAddress from '@/components/pages/my_page/subDirectory/address/addShipAddress.vue'
// import { getSearchVals } from "@/utils/search";

// 라우트
const route = useRoute()
const category = computed(() => {
  return route.params.category as string
})
// 현재 페이지
const current = computed(() => {
  return componentsMap[category.value] ?? PurchaseHistory
})

const componentsMap: Record<string, unknown> = {
  purchaseHistory: PurchaseHistory,
  shipAddress: ShipAddress,
  addShipAddress: WriteAddress,
  memberInfo: MemberInfo,
  changePassword: ChangePassword
}

// 검색
const searchValue = ref<string>('')

const searchItem = () => {
  console.log('searchVal', searchValue.value)
}

const currentProps = computed(() => {
  if (current.value === PurchaseHistory) {
    return { searchValue: searchValue.value } // searchValue를 자식에 전달
  }
  return {}
})

const currentEmits = computed(() => {
  if (current.value === PurchaseHistory) {
    return {
      'update:searchValue': (val: string) => {
        searchValue.value = val
      }
    }
  }
  return {}
})
</script>
