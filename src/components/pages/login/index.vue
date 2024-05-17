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
            <input type="text" v-model="memberId" title="ID 입력" placeholder="ID">
            <input type="password" v-model="memberPw" title="PASSWORD 입력" placeholder="PASSWORD">
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
import {ref, watchEffect} from "vue";
import { useUserStore } from '@/mocks/stores/loginStores';
// import { storeToRefs } from "pinia";
// const userStore = storeToRefs(useUserStore());

import { useRouter } from 'vue-router'
const router = useRouter();
// import axios from "axios";
const authStore = useUserStore();
const memberId = ref<string>('');
const memberPw = ref<string>('');
watchEffect(()=>{
  console.log('memberId',memberId.value)
  console.log('memberPw',memberPw.value)
})
const login = async () => {
  try {
    // await userStore.login(memberId.value, memberPw.value);
    // 로그인 성공 시 처리
    await authStore.login(memberId.value,memberPw.value)
    await router.push('/');
  } catch (error) {
    // 로그인 실패 시 에러 처리
    console.error('로그인 실패:', error);
    alert(error);
  }
};

// const login =  async () => {
//   try {
//     const response = await axios.post('http://15.164.101.152:3000/auth/login', {
//       email: memberId.value,
//       password: memberPw.value
//     });
//     console.log('response',response)
//   } catch (error) {
//     // Handle login error
//     console.error('Login failed:', error);
//   }
// }
</script>