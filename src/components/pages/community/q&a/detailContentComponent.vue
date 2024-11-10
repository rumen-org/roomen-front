<template>
  <div class="conDetail">
    <ul class="contents-images">
      <li v-for="(item, i) in content?.images" :key="i">
        <p class="images image-box">
          <img :src="`http://localhost:8080/files/${item}`" alt="질문글 이미지" />
        </p>
      </li>
    </ul>
    <p>{{ content?.content }}</p>
    <div class="img">
      <div v-if="isOwner && content">
        <button type="button" class="btn" @click="goModify(content?.id)">수정</button>
        <button type="button" class="btn" @click="checkConfirm">삭제</button>
      </div>
    </div>
    <Confirm />
    <Alert />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

// Api
import { deleteQNA } from '@/api/q&a'

// Components
import Confirm from '@/components/notifications/confirm.vue'
import Alert from '@/components/notifications/alert.vue'

// Composable
import { useConfirm } from '@/composables/useConfirm'
import { useAlert } from '@/composables/useAlert'
const { showConfirm } = useConfirm()
const { showAlert } = useAlert()

// Router
import { useRouter } from 'vue-router'
const router = useRouter()
const getId = computed(() => {
  return props?.content?.id || null
})
// Stores
import { useModifyQnaStore } from '@/stores/modifyQna'

// import { storeToRefs } from 'pinia';
const qnaStore = useModifyQnaStore()
// Models
import { QnaContent } from '@/models/interfaces/Qna'
// Props
const props = defineProps<{
  content: QnaContent | null
  isOwner: boolean
}>()

// Emit
const emit = defineEmits(['change:delete'])

const modifyData = computed<QnaContent>(() => {
  if (!props.content) {
    throw new Error('Content is null')
  }

  return {
    id: props.content.id,
    title: props.content.title,
    content: props.content.content,
    images: props.content.images || [],
    creDate: props.content.creDate, // 추가된 필드
    author: props.content.author, // 추가된 필드
    hasReply: props.content.hasReply, // 추가된 필드
    qnaType: props.content.qnaType,
    secret: props.content.secret
  }
})

// 수정
const goModify = (p: number) => {
  if (props.content) {
    qnaStore.setQnaContent(modifyData.value)
    router.push(`/modify/${p}`)
  }
}
// 삭제
const checkConfirm = async () => {
  showConfirm(
    `게시글을 삭제합니다.\n동의하십니까?`,
    async () => {
      if (getId.value !== null) {
        await deleteItem(getId?.value)
      } else {
        showAlert('로그인 상태를 확인해 주십시오.')
      }
    },
    () => {}
  )
}
const deleteItem = async (id: number) => {
  try {
    await deleteQNA(id)
    showAlert('정상적으로 삭제 되었습니다.')
    emit('change:delete')
    await router.push('/community/Q&A')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.conDetail {
  display: block;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  padding: 3rem 0;
  font-weight: 300;
}
.conDetail img {
  display: block;
}
.contents-images {
  max-width: 100%;
  overflow: hidden;
}
.contents-images img {
  display: block;
  width: 100%;
}

.image-box {
  max-width: 100%;
  padding: 10px 0;
}
</style>
