// composables/useConfirm.ts
import { reactive } from 'vue'

type ConfirmState = {
  message: string
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const confirmState = reactive<ConfirmState>({
  message: '',
  isVisible: false,
  onConfirm: () => {},
  onCancel: () => {}
})

export function useConfirm() {
  function showConfirm(message: string, onConfirm: () => void, onCancel: () => void = () => {}) {
    confirmState.message = message
    confirmState.isVisible = true
    confirmState.onConfirm = () => {
      onConfirm()
      closeConfirm()
    }
    confirmState.onCancel = () => {
      onCancel()
      closeConfirm()
    }
  }

  function closeConfirm() {
    confirmState.isVisible = false
    confirmState.message = ''
    confirmState.onConfirm = () => {}
    confirmState.onCancel = () => {}
  }

  return { confirmState, showConfirm, closeConfirm }
}
