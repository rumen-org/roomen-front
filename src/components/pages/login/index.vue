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
            <input type="text" v-model="memberId" @keydown.enter="login" title="ID 입력" placeholder="ID">
            <input type="password" v-model="memberPw" @keydown.enter="login" title="PASSWORD 입력" placeholder="PASSWORD">
            <button type="button" @click="login" class="btn blockBtn sL">로그인</button>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/loginStores'; // Update with actual path if needed
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useUserStore();
const memberId = ref<string>('');
const memberPw = ref<string>('');

const login = async () => {
  try {
    await authStore.login(memberId.value, memberPw.value);
    await router.push('/');
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인 실패: ' + (error.message || '알 수 없는 오류'));
  }
};
</script>