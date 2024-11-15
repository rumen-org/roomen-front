import { type Ref, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { throttle } from 'lodash'
import { useMainStore } from '@/stores/mainPage'
const useMainStores = useMainStore()
// setActiveSection
export function useFullPage(
  // onFullPage: Ref<HTMLElement | null>,
  sections: Ref<HTMLElement | null>[]
) {
  const touchStartY = ref<number>(0)
  const inMove = ref(false)
  const inMoveDelay = 800
  const activeSection = ref(0)
  const isSwiperActive = ref(false)

  // Quick Navigation 관련 상태
  const quickNavClass = computed(() => {
    return activeSection.value !== 0 ? '' : 'top'
  })

  let originalBodyStyle = ''
  let originalHtmlStyle = ''

  const setBodyOverflow = (hidden: boolean) => {
    const body = document.body
    const html = document.documentElement

    if (hidden) {
      originalBodyStyle = body.style.overflow
      originalHtmlStyle = html.style.overflow
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    } else {
      body.style.overflow = originalBodyStyle
      html.style.overflow = originalHtmlStyle
    }
  }

  const updateSectionsPosition = () => {
    sections.forEach((section, index) => {
      if (section.value) {
        section.value.style.transform = `translateY(${(index - activeSection.value) * 100}%)`
      }
    })
  }

  const scrollToSection = (id: number, force = false) => {
    if (inMove.value && !force) return
    if (id < 0 || id >= sections.length) return

    inMove.value = true
    activeSection.value = id
    useMainStores.setActiveSection(id)
    updateSectionsPosition()

    setTimeout(() => {
      inMove.value = false
    }, inMoveDelay)
  }

  const handleSwiperState = (active: boolean) => {
    isSwiperActive.value = active
  }

  const moveUp = throttle(() => {
    if (inMove.value || isSwiperActive.value) return
    if (activeSection.value < sections.length - 1) {
      scrollToSection(activeSection.value + 1)
    }
  }, inMoveDelay)

  const moveDown = throttle(() => {
    if (inMove.value || isSwiperActive.value) return
    if (activeSection.value > 0) {
      scrollToSection(activeSection.value - 1)
    }
  }, inMoveDelay)

  const handleMouseWheel = throttle((evt: Event) => {
    const e = evt as WheelEvent
    if (inMove.value || isSwiperActive.value) return false

    if (e.deltaY < 0) {
      moveDown()
    } else {
      moveUp()
    }

    e.preventDefault()
    return false
  }, inMoveDelay)

  const touchStart = (evt: Event) => {
    const e = evt as TouchEvent
    if (isSwiperActive.value) return

    if (e.cancelable) {
      e.preventDefault()
    }
    touchStartY.value = e.touches[0].clientY
  }

  const touchMove = throttle((evt: Event) => {
    const e = evt as TouchEvent
    if (inMove.value || isSwiperActive.value) return false

    const currentY = e.touches[0].clientY
    const touchDelta = currentY - touchStartY.value

    if (Math.abs(touchDelta) > 50) {
      if (touchDelta > 0) {
        moveDown()
      } else {
        moveUp()
      }
      touchStartY.value = currentY
    }

    if (e.cancelable) {
      e.preventDefault()
    }
  }, inMoveDelay)

  const touchEnd = () => {
    touchStartY.value = 0
  }

  onMounted(() => {
    setBodyOverflow(true)
    updateSectionsPosition()
  })

  onBeforeUnmount(() => {
    setBodyOverflow(false)
  })

  return {
    scrollToSection,
    activeSection,
    handleMouseWheel,
    touchStart,
    touchMove,
    touchEnd,
    handleSwiperState,
    quickNavClass
  }
}
