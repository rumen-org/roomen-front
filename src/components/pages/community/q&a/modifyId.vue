<template>
  <div id="container">
    <div class="contents">
      <!-- conTopArea -->
      <div class="conTopArea v2">
        <div class="btnArea">
          <backButton />
        </div>
        <h2 class="ko">문의하기 (수정)</h2>
      </div>
      <!--// conTopArea -->
      <div class="w943">
        <!-- inputTable -->
        <div class="inputTable qna">
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
                <th scope="row" class="mNone">문의유형</th>
                <td colspan="3">
                  <!-- checkboxWrap -->
                  <div class="checkboxWrap selectCate">
                    <span v-for="(item, idx) in computeTypes" :key="idx" class="checkbox">
                      <input
                        :id="`${item.name}+${idx}`"
                        v-model="datas.qnaType"
                        type="radio"
                        :name="item.name"
                        :checked="data?.qnaType === idx"
                        :value="item.value"
                      />
                      <label :for="`${item.name}+${idx}`">{{ item.label }}</label>
                    </span>
                  </div>
                  <!--// checkboxWrap -->
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
              <tr class="flexArea">
                <th scope="row">사진</th>
                <td>
                  <!-- imgUpload -->
                  <div
                    class="imgUpload"
                    :class="{ gap10: datas?.beforeImg.length > 0 || computeFiles.length > 0 }"
                  >
                    <div class="preview">
                      <ul v-if="datas?.beforeImg.length > 0">
                        <li v-for="(item, idx) in datas.beforeImg" :key="idx" class="pos-rel">
                          <img
                            :src="`https://back.roomen.r-e.kr/${item}`"
                            alt="이전에 등록된 이미지"
                          />
                          <button class="delete" @click="removeItem(idx, 'old')">
                            <em class="blind">닫기버튼</em>
                          </button>
                        </li>
                      </ul>
                      <ul v-if="computeFiles.length > 0">
                        <li v-for="(item, idx) in computeFiles" :key="idx" class="pos-rel">
                          <img :src="item.url" :alt="`${item.name}파일`" />
                          <button class="delete" @click="removeItem(idx, 'new')">
                            <em class="blind">닫기버튼</em>
                          </button>
                        </li>
                      </ul>
                    </div>
                    <input type="file" class="upload" accept="image/*" multiple @change="addFile" />
                  </div>
                  <!--// imgUpload -->
                </td>
                <th scope="row">비밀글</th>
                <td>
                  <div class="inputBtn">
                    <input
                      v-model="datas.password"
                      type="password"
                      placeholder="비밀번호를 입력하세요."
                      :disabled="!datas.secret"
                    />
                    <span class="checkbox noTxt">
                      <input id="chk0201" v-model="datas.secret" type="checkbox" />
                      <label for="chk0201">사용</label>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--// inputTable -->

        <!-- bottomBtn -->
        <div class="bottomBtn txtC">
          <button type="button" class="btn sL w230" @click="modifyQna">작성하기</button>
        </div>
        <!--// bottomBtn -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'
// Store
import { useModifyQnaStore } from '@/stores/modifyQna'
import { storeToRefs } from 'pinia'
const qnaStore = useModifyQnaStore()
const { qnaContent } = storeToRefs(qnaStore)
const data = qnaContent

// Router
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// 게시글 ID체크
const checkedId = computed(() => {
  return qnaContent?.value?.id === Number(route.params.id) ? qnaContent?.value?.id : null
})

// Config
import { qnaTypes } from '@/configs/radioOptions'

// 추후 Api 또는 반응성 필요를 고려
const computeTypes = computed(() => {
  return qnaTypes
})

// Components
import backButton from '@/components/button/backButton.vue'

// Api
import { updateQNA } from '@/api/q&a'

// ModifyData
interface dataType {
  title: string
  content: string
  secret: boolean
  password: string
  qnaType: number
  files: File[]
  beforeImg: string[]
  imagesToDelete: string[]
}
const datas = reactive<dataType>({
  title: '',
  content: '',
  secret: false,
  password: '',
  qnaType: 1,
  beforeImg: [],
  files: [],
  imagesToDelete: []
})

const modifyQna = async () => {
  try {
    console.log('checkedId.value', checkedId.value)
    for (const [key, value] of formData.value.entries()) {
      console.log(key, value)
    }
    if (checkedId.value !== null) {
      await updateQNA(formData.value)
      router.go(-1)
    }
  } catch (error) {
    console.error(error)
  }
}

// 이전 등록된 파일 url

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
  formDatas.append('id', String(qnaContent?.value?.id))
  formDatas.append('qnaType', String(datas.qnaType))
  formDatas.append('title', datas.title)
  formDatas.append('content', datas.content)
  formDatas.append('secret', datas.secret ? 'true' : 'false')
  formDatas.append('password', datas.password || '')
  datas.imagesToDelete.forEach(img => {
    formDatas.append('imagesToDelete', img)
  })
  datas.files.forEach(file => {
    formDatas.append('images', file)
  })
  return formDatas
})

// 이미지 추가
const addFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  // 파일 추가 시
  if (target.files) {
    const newFiles = Array.from(target.files)
    // 파일 중복 업로드 체크
    const uniqeFiles = newFiles.filter(
      newFile => !datas.files.some(file => file.name === newFile.name && file.size === newFile.size)
    )
    // 기존의 file들과 중복되지 않은 새로운 파일을 모두 추가하여 새롭게 정의
    datas.files = [...datas.files, ...uniqeFiles]

    console.log('event.target', event.target)
    console.log('datas.files.value', datas.files)
  }
}

// 이미지 삭제
const removeItem = (i: number, p: string) => {
  if (p === 'old') {
    datas?.imagesToDelete.push(datas?.beforeImg[i])
    datas?.beforeImg.splice(i, 1)
  } else {
    datas.files.splice(i, 1)
  }
  console.log('p', p)
}

onMounted(() => {
  if (data.value) {
    datas.title = data.value.title
    datas.content = data.value.content
    datas.qnaType = data.value.qnaType
    datas.secret = data.value.secret
    // 이미 업로드된 파일 URL이 있는 경우 처리
    if (data.value.images) {
      datas.beforeImg = [...data.value.images]
    }
  }
})

onBeforeUnmount(qnaStore.clearQnaContent)
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
