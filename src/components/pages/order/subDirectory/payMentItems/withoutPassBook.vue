<template>
  <!-- 무통장입금 -->
  <div>
    <!-- input-table -->
    <div class="input-table">
      <table>
        <caption>
          입금은행, 입금자명 항목으로 구성된 무통장입금 정보입력 표
        </caption>
        <colgroup>
          <col style="width: 18%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              입금은행 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td>
              <input type="text" title="입금은행" value="국민은행 790000-01-000000 루멘 스튜디오" />
            </td>
          </tr>
          <tr>
            <th scope="row">
              입금자명 <span class="req c-red"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td><input type="text" title="입금자명" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--// input-table -->
    <!-- cash-receipt -->
    <div class="cash-receipt">
      <span class="checkbox">
        <input id="chk0201" type="checkbox" />
        <label for="chk0201">현금영수증 신청</label>
      </span>
      <div class="flex">
        <!-- checkbox-wrap -->
        <div class="checkbox-wrap">
          <span class="checkbox">
            <input id="chk0301" type="radio" name="chk03" checked />
            <label for="chk0301">개인</label>
          </span>
          <span class="checkbox">
            <input id="chk0302" type="radio" name="chk03" />
            <label for="chk0302">사업자</label>
          </span>
        </div>
        <!--// checkbox-wrap -->
        <div class="phone">
          <select title="휴대전화 앞 세자리">
            <option value="">010</option>
            <option value="">02</option>
            <option value="">031</option>
          </select>
          <span>&mdash;</span>
          <input type="text" title="휴대전화 가운데 네자리" />
          <span>&mdash;</span>
          <input type="text" title="휴대전화 마지막 네자리" />
        </div>
      </div>
    </div>
    <!--// cash-receipt -->
  </div>
  <!--// 무통장입금 -->
</template>
