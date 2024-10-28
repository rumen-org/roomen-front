import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event: { pageX: number; pageY: number }) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// 외부 사용시 - Utils(composable)의 기능을 컴포넌트에서 사용할 시
// import { useMouse } from './mouse.js'
// const { x, y } = useMouse()
