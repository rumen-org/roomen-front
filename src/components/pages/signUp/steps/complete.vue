<template>
  <div id="container">
    <div>
      <!-- contents-top-area -->
      <div class="contents-top-area">
        <h2 class="ko ws-nowrap">회원가입 완료</h2>
      </div>
      <!--// contents-top-area -->
      <div class="w670 mt-120">
        <!-- input-table -->
        <div class="txt-c">
          <div>
            <p>
              회원 가입이 완료 되었습니다.<br />
              로그인해주세요.
            </p>
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
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.ws-nowrap {
  white-space: nowrap;
}
</style>
