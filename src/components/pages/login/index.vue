<template>
  <div>
    <div id="container">
      <div class="contents">
        <!-- contents-top-area -->
        <div class="contents-top-area">
          <h2>{{ t('cate.login.title') }}</h2>
          <!-- <em>{{ t('messages.text1') }}</em>-->
        </div>
        <!--// contents-top-area -->
        <!-- login-area -->
        <div class="login-area w600">
          <div>
            <input
              v-model="memberId"
              type="text"
              title="ID 입력"
              :placeholder="t('cate.login.pHolder.id')"
              autocomplete="on"
              minlength="6"
              maxlength="12"
              @keydown.enter="login"
            />
            <input
              v-model="memberPw"
              type="password"
              title="PASSWORD 입력"
              :placeholder="t('cate.login.pHolder.pw')"
              minlength="8"
              maxLength="16"
              @keydown.enter="login"
            />
            <button type="button" class="btn block-btn s-large" @click="testInputs">
              {{ t('cate.login.btn.login') }}
            </button>
          </div>
          <div class="login-util">
            <router-link to="/signup">{{ t('cate.login.other.1') }}</router-link>
            <div>
              <router-link to="/login/findID">{{ t('cate.login.other.2') }}</router-link>
              <router-link to="/login/findPW">{{ t('cate.login.other.3') }}</router-link>
            </div>
          </div>
        </div>
        <!--// login-area -->
      </div>
    </div>
    <Alert />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// I18n
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// Components
import Alert from '@/components/notifications/alert.vue'

// Stores
import { useUserStore } from '@/stores/loginStores'
import { storeToRefs } from 'pinia'
const authStore = useUserStore()

// Router
import { useRouter } from 'vue-router'
const router = useRouter()

// Composable
import { useAlert } from '@/composables/useAlert'
const { showAlert } = useAlert()

// 리다이렉트 값을 반응성으로 얻기 위해 설정.
const { redirectPath } = storeToRefs(authStore)
const memberId = ref<string>('')
const memberPw = ref<string>('')

const testInputs = () => {
  const space = /\s/g
  if (memberId.value.match(space) || memberPw.value.match(space)) {
    showAlert('공백을 제거해주세요.')
    return
  }
  login()
}
const login = async () => {
  try {
    await authStore.login(memberId.value, memberPw.value)
    if (redirectPath.value) {
      await router.push(redirectPath.value)
      authStore.redirectPath = null
    } else {
      await router.push('/')
    }
  } catch (error) {
    console.error('로그인 실패:', error)
    showAlert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.')
  }
}
</script>
