<template>
  <div class="w670">
    <!-- inputTable -->
    <div class="inputTable">
      <table>
        <caption>
          아이디, 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 항목으로 구성된 비밀번호 변경
          정보입력 표
        </caption>
        <colgroup>
          <col style="width: 25%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">아이디</th>
            <td>{{ memberIdValue }}</td>
          </tr>
          <tr>
            <th scope="row">현재 비밀번호</th>
            <td>
              <input v-model="passwords.currentPassword" type="password" title="현재 비밀번호" />
            </td>
          </tr>
          <tr>
            <th scope="row">새 비밀번호</th>
            <td>
              <input
                v-model="passwords.newPassword"
                type="password"
                title="새 비밀번호"
                placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8-16자)"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">새 비밀번호 확인</th>
            <td>
              <input
                v-model="passwords.confirmNewPassword"
                type="password"
                title="새 비밀번호 확인"
                placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8-16자)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--// inputTable -->

    <!-- bottomBtn -->
    <div class="bottomBtn txtC">
      <button
        type="button"
        class="btn blockBtn sL w230"
        :disabled="!equalNewPasswords || !allFieldsFilled"
        @click="submitPasswordData"
      >
        비밀번호 변경
      </button>
    </div>
    <Alert />
    <!--// bottomBtn -->
  </div>
</template>
<script lang="ts" setup>
import { getMyInformation, updateAccountPassword } from '@/api/account'
import { computed, onMounted, ref } from 'vue'

// Router
import { useRouter } from 'vue-router'
const router = useRouter()

// Components
import Alert from '@/components/notifications/alert.vue'

// CustomAlert
import { useAlert } from '@/composables/useAlert'
const { showAlert } = useAlert()

interface password {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}
const passwords = ref<password>({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})
const allFieldsFilled = computed(() => {
  return (
    passwords.value.currentPassword !== '' &&
    passwords.value.newPassword !== '' &&
    passwords.value.confirmNewPassword !== ''
  )
})

const equalNewPasswords = computed(() => {
  return passwords.value.confirmNewPassword === passwords.value.newPassword
})
const memberIdValue = ref<string>('')
const fetchMemberId = async () => {
  try {
    const response = await getMyInformation()
    memberIdValue.value = response.data?.memberId
  } catch (error) {
    console.error(error)
  }
}
const submitPasswordData = async () => {
  const params = {
    currentPassword: passwords.value.currentPassword,
    newPassword: passwords.value.newPassword
  }
  try {
    await updateAccountPassword(params)
    showAlert('비밀번호 변경이\n완료 되었습니다.')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchMemberId()
})
</script>
