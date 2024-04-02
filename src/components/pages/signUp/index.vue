<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea">
        <h2>SIGNUP</h2>
      </div>
      <!--// conTopArea -->
      <div class="w670">
        <!-- inputTable -->
        <div class="inputTable">
          <table>
            <caption>아이디, 비밀번호, 비밀번호 확인, 이름, 휴대전화, 이메일 항목으로 구성된 회원가입 정보입력 표</caption>
            <colgroup>
              <col style="width:25%">
              <col style="width:auto">
            </colgroup>
            <tbody>
            <tr>
              <th scope="row">아이디 <span class="req cRed"><span class="hide">필수입력항목</span>*</span></th>
              <td><input type="text" title="아이디"></td>
            </tr>
            <tr>
              <th scope="row">비밀번호 <span class="req cRed"><span class="hide">필수입력항목</span>*</span></th>
              <td><input type="password" title="비밀번호" placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8-16자)"></td>
            </tr>
            <tr>
              <th scope="row">비밀번호 확인 <span class="req cRed"><span class="hide">필수입력항목</span>*</span></th>
              <td><input type="password" title="비밀번호 확인"></td>
            </tr>
            <tr>
              <th scope="row">이름 <span class="req cRed"><span class="hide">필수입력항목</span>*</span></th>
              <td><input type="text" title="이름"></td>
            </tr>
            <tr>
              <th scope="row">휴대전화 <span class="req cRed"><span class="hide">필수입력항목</span>*</span></th>
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
            <tr>
              <th scope="row">이메일 <span class="req cRed"><span class="hide">필수입력항목</span>*</span></th>
              <td><input type="text" title="이메일"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--// inputTable -->

        <!-- termsArea -->
        <div class="termsArea">
          <!-- checkboxWrap -->
          <div class="checkboxWrap">
                            <span class="checkbox">
                                <input type="checkbox" id="chk0101" class="chckAll">
                                <label for="chk0101">이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</label>
                            </span>
          </div>
          <!--// checkboxWrap -->

          <!-- terms -->
          <div class="terms">
            <h3>[필수] 이용약관 동의</h3>
            <div class="scrollArea">
              제1조(목적)<br/>
              이 약관은 OO 회사(전자상거래 사업자)가 운영하는 OO 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷
              관련 서비스(이하 “서비스”라 한다)를 이용함에
              있어 사이버 몰과 이용자의 권리.의무 및 책임사항을 규정함을
              목적으로 합니다.
              <br/>
              <br/>
              제1조(목적)<br/>
              이 약관은 OO 회사(전자상거래 사업자)가 운영하는 OO 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷
              관련 서비스(이하 “서비스”라 한다)를 이용함에
              있어 사이버 몰과 이용자의 권리.의무 및 책임사항을 규정함을
              목적으로 합니다.

            </div>
            <div class="txtR">
              <span>이용약관에 동의하십니까?</span>
              <span class="checkbox">
                                    <input type="checkbox" id="chk0102">
                                    <label for="chk0102">동의함</label>
                                </span>
            </div>
          </div>
          <!--// terms -->
          <!-- terms -->
          <div class="terms">
            <h3>[필수] 개인정보 수집 및 이용 동의</h3>
            <div class="scrollArea">
              ** 본 양식은 쇼핑몰 운영에 도움을 드리고자 샘플로 제공되는 서식으로 쇼핑몰 운영형태에 따른 수정이
              필요합니다. 쇼핑몰에 적용하시기 전, 쇼핑몰 운영사항 등을 확인하시고 적절한 내용을 반영하여 사용하시기
              바랍니다. **
              <br/><br/>
              1. 개인정보 수집목적 및 이용목적<br/>
              2. 개인정보 수집목적 및 이용목적<br/>
              3. 개인정보 수집목적 및 이용목적
            </div>
            <div class="txtR">
              <span>개인정보 수집 및 이용에 동의하십니까?</span>
              <span class="checkbox">
                                    <input type="checkbox" id="chk0103">
                                    <label for="chk0103">동의함</label>
                                </span>
            </div>
          </div>
          <!--// terms -->
          <!-- terms -->
          <div class="terms">
            <h3>[선택] 개인정보 제3자 제공 동의</h3>
            <div class="scrollArea">
              아래 내용의 동의 여부는 회원가입에 영향을 미치지 않습니다. 단, 동의 거부시 서비스 이용에 제한이 있을
              수 있습니다.
              <br/><br/>
              - 제공 받는 자 : 하우저,CJ대한통운,경동택배 등 택배사<br/>
              - 제공 항목 : 이름,연락처,주소<br/>
              - 제공 기간 : 2024-03-17 ~ 2024-03-31
            </div>
            <div class="txtR">
              <span>개인정보 제3자 제공에 동의하십니까?</span>
              <span class="checkbox">
                                    <input type="checkbox" id="chk0104">
                                    <label for="chk0104">동의함</label>
                                </span>
            </div>
          </div>
          <!--// terms -->
          <!-- terms -->
          <div class="terms">
            <h3>[선택] 쇼핑정보 수신 동의</h3>
            <div class="scrollArea">
              할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다.
              단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이 발송됩니다.
              선택 약관에 동의하지 않으셔도 회원가입은 가능하며,
              회원가입 후 회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수 있습니다.
            </div>
            <div class="flex right mBlock txtR">
              <div>
                <span>이메일 수신을 동의하십니까?</span>
                <span class="checkbox">
                                        <input type="checkbox" id="chk0105">
                                        <label for="chk0105">동의함</label>
                                    </span>
              </div>
              <div>
                <span>SMS 수신을 동의하십니까?</span>
                <span class="checkbox">
                                        <input type="checkbox" id="chk0106">
                                        <label for="chk0106">동의함</label>
                                    </span>
              </div>
            </div>
          </div>
          <!--// terms -->
        </div>
        <!--// termsArea -->
        <!-- bottomBtn -->
        <div class="bottomBtn txtC">
          <button type="button" class="btn blockBtn sL">회원가입</button>
        </div>
        <!--// bottomBtn -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>