<template>
  <div>
    <div id="container">
      <div class="contents">
        <!-- conTopArea -->
        <div class="conTopArea">
          <h2>LOGIN</h2>
        </div>
        <!--// conTopArea -->
        <!-- loginArea -->
        <div class="loginArea w600">
          <div>
            <input type="text" v-model="memberId" @keydown.enter="login" title="ID 입력" placeholder="ID" autocomplete="on" minlength="6" maxlength="12" />
            <input type="password" v-model="memberPw" @keydown.enter="login" title="PASSWORD 입력" placeholder="PASSWORD" minlength="8" maxLength="16" />
            <button type="button" @click="testInputs" class="btn blockBtn sL">로그인</button>
          </div>
          <div class="util">
            <router-link to="/signup">회원가입</router-link>
            <div>
              <router-link to="/login/findID">아이디 찾기</router-link>
              <router-link to="/login/findPW">비밀번호 찾기</router-link>
            </div>
          </div>
        </div>
        <!--// loginArea -->

      </div>
    </div>
    <Alert />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Alert from '@/components/notifications/alert.vue'

// Stores
import { useUserStore } from '@/stores/loginStores';
import { storeToRefs } from "pinia";
const authStore = useUserStore();

// Router
import { useRouter } from 'vue-router';
const router = useRouter();

// Composable
import { useAlert } from '@/composables/useAlert'
const { showAlert } = useAlert();


// 리다이렉트 값을 반응성으로 얻기 위해 설정.
const { redirectPath } = storeToRefs(authStore);
const memberId = ref<string>('');
const memberPw = ref<string>('');

const testInputs = () => {
  let space = /\s/g;


  // **테스트 이후 새 계정 생성한 뒤에 주석 해제**
  // if (memberId.value.length < 6) {
  //   showAlert('아이디는 6글자 이상 \n입력해야합니다.')
  //   return;
  // }
  // if (memberPw.value.length < 8) {
  //   showAlert('비밀번호는 8글자 이상 \n입력해야합니다.')
  //   return;
  // }
  // **테스트 이후 새 계정 생성한 뒤에 주석 해제**


  if (memberId.value.match(space) || memberPw.value.match(space)) {
    showAlert('공백을 제거해주세요.')
    return;
  }
  login();
}
const login = async () => {
  try {
    await authStore.login(memberId.value, memberPw.value);
    if (redirectPath.value) {
      await router.push(redirectPath.value);
      authStore.redirectPath = null;
    } else {
      await router.push('/');
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    showAlert('로그인에 실패하였습니다.\n아이디와 비밀번호를 확인하세요.');
  }
};
</script>