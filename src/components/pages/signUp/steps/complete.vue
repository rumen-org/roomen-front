<template>
  <div id="container">
    <div>
      <!-- conTopArea -->
      <div class="conTopArea">
        <h2 class="ko ws-nowrap">회원가입 완료</h2>
      </div>
      <!--// conTopArea -->
      <div class="w670 mt-120">
        <!-- inputTable -->
        <div class="txtC">
          <div>
            <p>
              회원 가입이 완료 되었습니다.<br />
              로그인해주세요.
            </p>
          </div>
        </div>
        <!--// inputTable -->
        <!-- bottomBtn -->
        <div class="bottomBtn txtC">
          <button type="button" class="btn sL w230" @click="$router.push('/login')">로그인</button>
        </div>
        <!--// bottomBtn -->
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
