<template>
  <!-- termsArea -->
  <div class="termsArea">
    <h4 class="terms-tit">전체동의</h4>
    <!-- checkboxWrap -->
    <div class="checkboxWrap mt-20">
      <span class="checkbox">
        <input id="chk0101" v-model="allCheck" type="checkbox" class="chckAll" />
        <label for="chk0101"
          >이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</label
        >
      </span>
    </div>
    {{ checkedList }}
    <div v-for="(item, idx) in termsList" :key="idx" class="terms">
      <h3>{{ item.head }}</h3>
      <PerfectScrollbar class="scrollArea">
        <div class="scrollInner">
          <WordBreak v-if="item.body" :break-text="item.body" />
        </div>
      </PerfectScrollbar>
      <div :class="item.checkBox.length === 2 ? 'flex right mBlock' : ''" class="txtR">
        <template v-for="item2 in item.checkBox" v-if="item.checkBox.length === 1">
          <span>
            {{ item2.subtitle }}
          </span>
          <span class="checkbox">
            <input :id="item2.id" v-model="checkedList" type="checkbox" :value="item2.id" />
            <label for="chk0102">{{ item2.label }}</label>
          </span>
        </template>
        <div v-for="(item3, idx3) in item.checkBox" v-if="item.checkBox.length === 2" :key="idx3">
          <span>{{ item3.subtitle }}</span>
          <span class="checkbox">
            <input :id="item3.id" v-model="checkedList" type="checkbox" :value="item3.id" />
            <label for="chk0105">{{ item3.label }}</label>
          </span>
        </div>
      </div>
    </div>
    <!-- checkboxWrap -->
  </div>
  <!-- termsArea -->
  <div class="bottomBtn txtC">
    <button type="button" class="btn bgWhite sL w230" @click="goBack">취소</button>
    <button type="button" class="btn sL w230" :disabled="!requireAgree" @click="sendPage">
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
const { isSmsAgree, isThirdPartyAgree, isEmailAgree } = storeToRefs(useSignUpStore())
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
  // agreement, privacy, sms, thirdParty, email
  checkedList.value.forEach((item) => {
    if (item === 'isThirdPartyAgree') isThirdPartyAgree.value = Boolean(item)
    if (item === 'sms') isSmsAgree.value = Boolean(item)
    if (item === 'email') isEmailAgree.value = Boolean(item)
  })
  emits('update')
}
// 전체선택
const allCheck = computed<boolean>({
  get: () => {
    // 모든 체크박스가 선택되어 있는지 확인
    return checkedList.value.length === termsList.value.flatMap((item) => item.checkBox).length
  },
  set: (value) => {
    if (value) {
      // 전체 선택
      checkedList.value = termsList.value.flatMap((item) => item.checkBox.map((cb) => cb.id))
    } else {
      // 전체 선택 해제
      checkedList.value = []
    }
  }
})
// 선택 된 CheckBox
const checkedList = ref<string[]>([])
</script>
<style scoped>
.scrollInner {
  padding: 0 30px;
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
