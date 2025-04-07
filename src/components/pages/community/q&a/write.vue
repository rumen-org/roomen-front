<template>
  <div id="container">
    <div class="contents">
      <!-- contents-top-area -->
      <div class="contents-top-area v2">
        <div class="btn-area">
          <backButton />
        </div>
        <h2 class="ko">문의하기</h2>
      </div>
      <!--// contents-top-area -->
      <div class="w943">
        <!-- input-table -->
        <div class="input-table qna">
          <table>
            <caption>
              문의유형, 제목, 문의내용, 사진, 비밀글 비밀번호 항목으로 구성된 문의하기 입력 표
            </caption>
            <colgroup>
              <col style="width: 14%" />
              <col style="width: 36%" />
              <col style="width: 14%" />
              <col style="width: 36%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" class="m-none">문의유형</th>
                <td colspan="3">
                  <!-- checkbox-wrap -->
                  <div class="checkbox-wrap select-cate">
                    <span v-for="(item, idx) in computeTypes" :key="idx" class="checkbox">
                      <input
                        :id="`${item.name}+${idx}`"
                        v-model="datas.qnaType"
                        type="radio"
                        :name="item.name"
                        :checked="idx === 0"
                        :value="item.value"
                      />
                      <label :for="`${item.name}+${idx}`">{{ item.label }}</label>
                    </span>
                  </div>
                  <!--// checkbox-wrap -->
                </td>
              </tr>
              <tr>
                <th scope="row">제목</th>
                <td colspan="3">
                  <input
                    v-model="datas.title"
                    type="text"
                    title="제목"
                    placeholder="제목을 입력하세요."
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">문의내용</th>
                <td colspan="3">
                  <textarea
                    v-model="datas.content"
                    title="문의내용"
                    placeholder="내용을 입력하세요."
                  >
                  </textarea>
                </td>
              </tr>
              <tr class="flex-area">
                <th scope="row">사진</th>
                <td>
                  <!-- img-upload -->
                  <div class="img-upload" :class="{ gap10: computeFiles.length > 0 }">
                    <div class="preview">
                      <ul v-if="computeFiles.length > 0">
                        <li v-for="(item, idx) in computeFiles" :key="idx" class="pos-rel">
                          <img :src="item.url" :alt="`${item.name}파일`" />
                          <button class="delete" @click="removeItem(idx)">
                            <em class="blind">닫기버튼</em>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <input type="file" class="upload" accept="image/*" multiple @change="addFile" />
                  </div>
                  <!--// img-upload -->
                </td>
                <th scope="row">비밀글</th>
                <td>
                  <div class="input-button">
                    <input
                      v-model="datas.password"
                      type="password"
                      placeholder="비밀번호를 입력하세요."
                      :disabled="!datas.secret"
                      :required="datas.secret"
                    />
                    <span class="checkbox no-txt">
                      <input id="chk0201" v-model="datas.secret" type="checkbox" />
                      <label for="chk0201">사용</label>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--// input-table -->

        <!-- bottom-btn -->
        <div class="bottom-btn txt-c">
          <button type="button" class="btn s-large w230" @click="submitQna">작성하기</button>
        </div>
        <!--// bottom-btn -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
// Router

import { useRouter } from 'vue-router'
const router = useRouter()
// Config
import { qnaTypes } from '@/configs/radioOptions'
// 추후 Api 또는 반응성 필요를 고려
const computeTypes = computed(() => {
  return qnaTypes
})

// Components
import backButton from '@/components/button/backButton.vue'

// Api
import { writeQNA } from '@/api/q&a'

interface dataType {
  title: string
  content: string
  secret: boolean
  password: string
  qnaType: number
  files: File[]
}

const datas = reactive<dataType>({
  title: '',
  content: '',
  secret: false,
  password: '',
  qnaType: 1,
  files: []
})

// 현재 추가 된 파일들 상태관리
const computeFiles = computed(() => {
  return datas.files.map(file => ({
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file)
  }))
})

// FormData 상태관리
const formData = computed((): FormData => {
  const formDatas = new FormData()

  formDatas.append('qnaType', String(datas.qnaType))
  formDatas.append('title', datas.title)
  formDatas.append('content', datas.content)
  formDatas.append('secret', datas.secret ? 'true' : 'false')
  formDatas.append('password', datas.password || '')
  datas.files.forEach(file => {
    formDatas.append('images', file)
  })
  return formDatas
})

const addFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  // 파일 추가 시
  if (target.files) {
    const newFiles = Array.from(target.files)
    // 파일 중복 업로드 체크
    const uniqeFiles = newFiles.filter(
      newFile => !datas.files.some(file => file.name === newFile.name && file.size === newFile.size)
    )
    // 추가된 파일들과 중복되지 않은 새로운 파일을 추가하여 새로 주입
    datas.files = [...datas.files, ...uniqeFiles]
  }
}

const removeItem = (i: number) => {
  datas.files.splice(i, 1)
}

const submitQna = async () => {
  try {
    console.log('formData', formData.value)
    await writeQNA(formData.value)
    router.go(-1)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss">
li.pos-rel {
  position: relative;
}
.delete {
  position: absolute;
  inset: 0 0 auto auto;
  width: 24px;
  height: 24px;
  background-image: url('/src/assets/images/delete-file.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.gap10 {
  gap: 10px;
}
</style>
