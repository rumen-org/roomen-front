<template>
  <div id="container">
    <div class="contents">
      <!-- contents-top-area -->
      <div class="contents-top-area">
        <h2 class="ko m-center">{{ getConfig.title }}</h2>
      </div>
      <!--// contents-top-area -->
      <div class="result-area w670">
        <div v-if="isState === 'resultById'" class="txt-c">
          <p>
            고객님의 찾기가 완료되었습니다.<br />
            가입된 아이디가 총 <em>{{ resultFindId.count }}</em
            >개 있습니다.
          </p>
          <div v-for="(account, index) in resultFindId.account" :key="index" class="resultIdState">
            <dl>
              <dt>아이디</dt>
              <dd>{{ account.MaskedIds }}</dd>
            </dl>
            <dl>
              <dt>가입일</dt>
              <dd>{{ formatDate(account.CreatedAt) }}</dd>
            </dl>
          </div>
        </div>
        <div v-else-if="isState === 'resultByPw'" class="txt-c">
          <div>
            <p>
              <em>{{ getResultPw.memberId }}</em> 회원님, 임시 비밀번호를<br />
              {{ transWord(getResultPw.type) }} <em>{{ getResultPw.value }}</em
              >으로 보내드렸습니다.
            </p>
          </div>
        </div>
        <!-- bottom-btn -->
        <div class="bottom-btn txt-c">
          <button
            type="button"
            :class="{ 'bg-white': isState === 'resultById' }"
            class="btn s-large w230"
            @click="$router.push('/login')"
          >
            로그인
          </button>
          <button
            v-if="isState === 'resultById'"
            type="button"
            class="btn s-large w230"
            @click="pushFindPw"
          >
            비밀번호 찾기
          </button>
        </div>
        <!--// bottom-btn -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// Stores
import { useFindAccountStore } from '@/stores/findAccount'
import { storeToRefs } from 'pinia'
import { computed, onUnmounted } from 'vue'
import { findById, findByPw } from '@/configs/member'
const { clearIdItem } = useFindAccountStore()
const { resultFindId, getResultPw, isState } = storeToRefs(useFindAccountStore())
import { useRouter } from 'vue-router'
const router = useRouter()
// Composable
import { useFormatDate } from '@/composables/useDateType'

const { formatDate } = useFormatDate()
const getConfig = computed(() => {
  return isState.value === 'resultById' ? findById : findByPw
})
const pushFindPw = () => {
  router.push('/login/findPW')
}
const transWord = (p: string) => {
  if (p === 'mobile') return '휴대전화'
  if (p === 'email') return '이메일'
}

onUnmounted(clearIdItem)
</script>
<style scoped>
.resultIdState + .resultIdState {
  border-top: none;
}
</style>
