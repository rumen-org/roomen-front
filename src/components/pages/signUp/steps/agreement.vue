<template>
  <!-- terms-area -->
  <div class="terms-area">
    <h4 class="terms-tit">전체동의</h4>
    <!-- checkbox-wrap -->
    <div class="checkbox-wrap mt-20">
      <span class="checkbox">
        <input id="chk0101" v-model="allCheck" type="checkbox" class="chckAll" />
        <label for="chk0101"
          >이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</label
        >
      </span>
    </div>
    <div v-for="(item, idx) in termsList" :key="idx" class="terms">
      <h3>{{ item.head }}</h3>
      <PerfectScrollbar class="scroll-area">
        <div class="scrollInner">
          <WordBreak v-if="item.body" :break-text="item.body" />
        </div>
      </PerfectScrollbar>
      <div :class="item.checkBox.length === 2 ? 'flex right' : ''">
        <template v-if="item.checkBox.length === 1">
          <template v-for="item2 in item.checkBox" :key="item2">
            <span>
              {{ item2.subtitle }}
            </span>
            <span class="checkbox">
              <input :id="item2.id" v-model="checkedList" type="checkbox" :value="item2.id" />
              <label for="chk0102">{{ item2.label }}</label>
            </span>
          </template>
        </template>

        <template v-if="item.checkBox.length === 2">
          <div v-for="(item3, idx3) in item.checkBox" :key="idx3">
            <span>{{ item3.subtitle }}</span>
            <span class="checkbox">
              <input :id="item3.id" v-model="checkedList" type="checkbox" :value="item3.id" />
              <label for="chk0105">{{ item3.label }}</label>
            </span>
          </div>
        </template>
      </div>
    </div>
    <!-- checkbox-wrap -->
  </div>
  <!-- terms-area -->
  <div class="bottom-btn txt-c">
    <button type="button" class="btn bg-white s-large w230" @click="goBack">취소</button>
    <button type="button" class="btn s-large w230" :disabled="!requireAgree" @click="sendPage">
      다음
    </button>
  </div>
  <Confirm />
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

// Components
import WordBreak from '@/components/text/Break.vue'
import Confirm from '@/components/notifications/confirm.vue'
import { useConfirm } from '@/composables/useConfirm'
const { showConfirm } = useConfirm()
// Stores
import { storeToRefs } from 'pinia'
import { useSignUpStore } from '@/stores/signUp'
const { step1 } = storeToRefs(useSignUpStore())
// Config
import { terms } from '@/configs/member'

const termsList = computed(() => {
  return terms
})

// Router
import { useRouter } from 'vue-router'
const router = useRouter()

const emits = defineEmits(['update'])

const goBack = () => {
  showConfirm(
    `취소하시면 입력하신 정보가 사라집니다.\n취소하시겠습니까?`,
    () => {
      router.go(-1)
    },
    () => {}
  )
}
const requireAgree = computed<boolean>(() => {
  return checkedList.value.includes('agreement') && checkedList.value.includes('privacy')
})
// 다음
const sendPage = () => {
  step1.value.isThirdPartyAgree = checkedList.value.includes('thirdParty')
  step1.value.isSmsAgree = checkedList.value.includes('sms')
  step1.value.isEmailAgree = checkedList.value.includes('email')
  step1.value.isEmailVerified = true
  emits('update')
}
// 전체선택
const allCheck = computed<boolean>({
  get: () => {
    // 모든 체크박스가 선택되어 있는지 확인
    return checkedList.value.length === termsList.value.flatMap(item => item.checkBox).length
  },
  set: value => {
    if (value) {
      // 전체 선택
      checkedList.value = termsList.value.flatMap(item => item.checkBox.map(cb => cb.id))
    } else {
      // 전체 선택 해제
      checkedList.value = []
    }
  }
})
// 선택 된 CheckBox
const checkedList = ref<string[]>([])
</script>
<style>
.scroll-area {
  .scrollInner {
    padding: 0 20px;
  }
  .ps__thumb-y {
    margin: 10px 5px;
    background-color: #191919;
    width: 3px;
  }
  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: rgba(25, 25, 25, 0.7);
    opacity: 1;
    width: 6px;
  }
  .ps__rail-x:hover,
  .ps__rail-y:hover,
  .ps__rail-x:focus,
  .ps__rail-y:focus,
  .ps__rail-x.ps--clicking,
  .ps__rail-y.ps--clicking {
    background-color: transparent;
    opacity: 1;
  }
}
.terms-tit {
  font-weight: 600;
  font-size: 18px;
  text-align: left;
}
.mt-20 {
  margin-top: 20px;
}
</style>
