<template>
  <!-- contents-top-area -->
  <div class="contents-top-area">
    <h2 class="ko ws-nowrap">회원가입 완료</h2>
  </div>
  <!--// contents-top-area -->
  <div class="signup-com">
    <!-- input-table -->
    <div class="txt-c">
      <p>
        김준영님의 회원가입이 성공적으로 완료되었습니다.<br />
        회원가입 내역 확인 및 수정은 <em>마이페이지 > 회원정보수정</em>에서 가능합니다.
      </p>
      <div class="login-info">
        <dl>
          <dt>아이디</dt>
          <dd>jyk719</dd>
        </dl>
        <dl>
          <dt>가입일</dt>
          <dd>2024.02.24</dd>
        </dl>
      </div>
    </div>
    <!--// input-table -->
    <!-- bottom-btn -->
    <div class="bottom-btn txt-c">
      <button type="button" class="btn s-large w230" @click="$router.push('/login')">
        로그인
      </button>
    </div>
    <!--// bottom-btn -->
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.ws-nowrap {
  white-space: nowrap;
}
</style>
