<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <h2 class="ko">아이디 찾기</h2>
      </div>
      <!--// conTopArea -->
      <div class="w670">
        <!-- inputTable -->
        <div class="inputTable">
          <table>
            <caption>회원유형, 이름, 휴대전화 항목으로 구성된 아이디찾기 정보입력 표</caption>
            <colgroup>
              <col style="width:25%">
              <col style="width:auto">
            </colgroup>
            <tbody>
            <tr>
              <th scope="row">회원유형</th>
              <td>
                <select title="회원유형">
                  <option value="">개인회원</option>
                  <option value="">기업회원</option>
                </select>
                <!-- checkboxWrap -->
                <div class="checkboxWrap">
                                            <span class="checkbox">
                                                <input type="radio" id="chk0101" name="chk01" checked>
                                                <label for="chk0101">휴대전화</label>
                                            </span>
                  <span class="checkbox">
                                                <input type="radio" id="chk0102" name="chk01">
                                                <label for="chk0102">이메일</label>
                                            </span>
                </div>
                <!--// checkboxWrap -->
              </td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td><input type="text" title="이름"></td>
            </tr>
            <tr>
              <th scope="row">휴대전화</th>
              <td>
                <div class="phone">
                  <select title="휴대전화 앞 세자리">
                    <option value="">010</option>
                    <option value="">02</option>
                    <option value="">031</option>
                  </select>
                  <span>&mdash;</span>
                  <input type="text" title="휴대전화 가운데 네자리">
                  <span>&mdash;</span>
                  <input type="text" title="휴대전화 마지막 네자리">
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--// inputTable -->
        <!-- bottomBtn -->
        <div class="bottomBtn txtC">
          <button type="button" class="btn blockBtn sL w230">아이디 찾기</button>
        </div>
        <!--// bottomBtn -->
      </div>
    </div>
  </div>
</template>


<script setup lang="ts"></script>