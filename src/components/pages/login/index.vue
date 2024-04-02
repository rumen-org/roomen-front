<template>
  <div><div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <h2>LOGIN</h2>
      </div>
      <!--// conTopArea -->
      <!-- loginArea -->
      <div class="loginArea w600">
        <div>
          <input type="text" title="ID 입력" placeholder="ID">
          <input type="password" title="PASSWORD 입력" placeholder="PASSWORD">
          <button type="button" class="btn blockBtn sL">로그인</button>
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
  </div></div>
</template>
<script setup lang="ts">
</script>