<template>
  <div>
    <h1>
      Main Page - rest api (fake server로 테스트) - 정상 작동 . 반환 예상되는 값 적용하면 구현
    </h1>
    <div>
      <button @click="usefetchData">Fetch Data</button>
      <div v-if="responseData">{{ responseData }}</div>
      <div v-if="status === 'loading'">Loading...</div>
      <div v-else-if="status === 'error'">Error occurred</div>
      <div v-else-if="status === 'success'">
        <!-- Display fetched data here -->
        <div>
          <p>Completed: {{ responseData.title }}</p>
          <p>ID: {{ responseData.userId }}</p>
          <p>Title: {{ responseData.completed }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useApi } from '@/api/useApi'
import { ref, watchEffect } from 'vue'

const { fetchData, status } = useApi()
const responseData = ref<any>(null)
watchEffect(() => {
  console.log('status', status)
})
async function usefetchData() {
  const data = await fetchData<any>('todos/1')
  console.log('data', data)
  console.log('responseData', responseData.value)
  responseData.value = data // fetchData 함수를 호출한 후에 받아온 데이터를 responseData에 할당
}
</script>