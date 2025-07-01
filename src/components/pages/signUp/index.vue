<template>
  <div id="container">
    <div class="contents">
      <!-- contents-top-area -->
<!--      <div class="contents-top-area pt-40" v-if="currentStep !== 2">-->
<!--        <h2>SIGNUP</h2>-->
<!--      </div>-->
<!--      <h3 v-if="currentStep === 0" class="step1_tit">&#91;약관동의&#93;</h3>-->

      <!--// contents-top-area -->
      <div class="w670">
        <component :is="CurrentComponent" @update="nextStep" />
<!--        <SignUpComplete />-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Components
import Terms from '@/components/pages/signUp/steps/agreement.vue'
import SignUpForm from '@/components/pages/signUp/steps/write.vue'
import SignUpComplete from '@/components/pages/signUp/steps/complete.vue'

const pages = [Terms, SignUpForm, SignUpComplete]
const currentStep = ref<number>(0)
const nextStep = () => {
  currentStep.value++
  console.log('onNext')
}
const CurrentComponent = computed(() => {
  return pages[currentStep.value]
})
</script>
<style scoped>
.step1_tit {
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  margin-top: 30px;
}
</style>
