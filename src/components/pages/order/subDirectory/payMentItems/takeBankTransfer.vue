<template>
  <!-- 실시간 계좌이체 -->
  <div>
    <!-- inputTable -->
    <div class="inputTable">
      <table>
        <caption>
          예금주명 항목으로 구성된 실시간 계좌이체 정보입력 표
        </caption>
        <colgroup>
          <col style="width: 18%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              예금주명 <span class="req cRed"><span class="hide">필수입력항목</span>*</span>
            </th>
            <td><input type="text" title="예금주명" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--// inputTable -->
    <p class="mTop25">- 소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
    <!-- cashReceipt -->
    <div class="cashReceipt">
      <span class="checkbox">
        <input id="chk0201" type="checkbox" />
        <label for="chk0201">현금영수증 신청</label>
      </span>
      <div class="flex">
        <!-- checkboxWrap -->
        <div class="checkboxWrap">
          <span class="checkbox">
            <input id="chk0401" type="radio" name="chk04" checked />
            <label for="chk0401">개인</label>
          </span>
          <span class="checkbox">
            <input id="chk0402" type="radio" name="chk04" />
            <label for="chk0402">사업자</label>
          </span>
        </div>
        <!--// checkboxWrap -->
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
    <!--// cashReceipt -->
  </div>
  <!--// 실시간 계좌이체 -->
</template>
