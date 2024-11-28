import { type Ref, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { throttle } from 'lodash'
import { useMainStore } from '@/stores/mainPage'

export function useFullPage(sections: Ref<HTMLElement | null>[]) {
  const touchStartY = ref<number>(0)
  const touchStartX = ref<number>(0) // X축 터치 추가
  const inMove = ref(false)
  const inMoveDelay = 500 // 모바일에서는 더 빠른 반응성을 위해 딜레이 감소
  const activeSection = ref(0)
  const isSwiperActive = ref(false)
  const isScrolling = ref(false) // 스크롤 중인지 확인하는 상태 추가
  const mainStore = useMainStore()

  // 터치 민감도 설정
  const TOUCH_SENSITIVITY = 30
  const SCROLL_TIMEOUT = 1000

  const quickNavClass = computed(() => {
    return activeSection.value !== 0 ? '' : 'top'
  })

  let originalBodyStyle = ''
  let originalHtmlStyle = ''

  // body와 html의 스크롤 방지
  const setBodyOverflow = (hidden: boolean) => {
    const body = document.body
    const html = document.documentElement

    if (hidden) {
      originalBodyStyle = body.style.overflow
      originalHtmlStyle = html.style.overflow
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
      body.style.position = 'fixed' // 모바일에서 바운스 효과 방지
      body.style.width = '100%'
      body.style.height = '100%'
    } else {
      body.style.overflow = originalBodyStyle
      html.style.overflow = originalHtmlStyle
      body.style.position = ''
      body.style.width = ''
      body.style.height = ''
    }
  }

  const updateSectionsPosition = () => {
    sections.forEach((section, index) => {
      if (section.value) {
        section.value.style.transition = inMove.value ? 'transform 0.8s ease' : 'none'
        section.value.style.transform = `translateY(${(index - activeSection.value) * 100}%)`
      }
    })
  }

  // 섹션 이동 함수 개선
  const scrollToSection = (id: number, force = false) => {
    if ((inMove.value || isScrolling.value) && !force) return
    if (id < 0 || id >= sections.length) return

    inMove.value = true
    isScrolling.value = true
    activeSection.value = id
    mainStore.setActiveSection(id)
    updateSectionsPosition()

    // 스크롤 상태 리셋
    setTimeout(() => {
      inMove.value = false
    }, inMoveDelay)

    setTimeout(() => {
      isScrolling.value = false
    }, SCROLL_TIMEOUT)
  }

  const handleSwiperState = (active: boolean) => {
    isSwiperActive.value = active
  }

  // 스로틀링된 이동 함수들
  const moveUp = throttle(() => {
    if (inMove.value || isSwiperActive.value || isScrolling.value) return
    if (activeSection.value < sections.length - 1) {
      scrollToSection(activeSection.value + 1)
    }
  }, inMoveDelay)

  const moveDown = throttle(() => {
    if (inMove.value || isSwiperActive.value || isScrolling.value) return
    if (activeSection.value > 0) {
      scrollToSection(activeSection.value - 1)
    }
  }, inMoveDelay)

  // 마우스 휠 이벤트 핸들러 개선
  const handleMouseWheel = throttle((evt: Event) => {
    const e = evt as WheelEvent
    if (inMove.value || isSwiperActive.value || isScrolling.value) {
      e.preventDefault()
      return false
    }

    if (Math.abs(e.deltaY) > 10) {
      if (e.deltaY < 0) {
        moveDown()
      } else {
        moveUp()
      }
    }

    e.preventDefault()
    return false
  }, inMoveDelay)

  // 터치 이벤트 핸들러 개선
  const touchStart = (evt: Event) => {
    const e = evt as TouchEvent
    if (isSwiperActive.value) return

    touchStartY.value = e.touches[0].clientY
    touchStartX.value = e.touches[0].clientX // X축 터치 위치 저장

    if (e.cancelable) {
      e.preventDefault()
    }
  }

  const touchMove = throttle((evt: Event) => {
    const e = evt as TouchEvent
    if (inMove.value || isSwiperActive.value || isScrolling.value) return false

    const currentY = e.touches[0].clientY
    const currentX = e.touches[0].clientX
    const touchDeltaY = currentY - touchStartY.value
    const touchDeltaX = Math.abs(currentX - touchStartX.value)

    // X축 이동이 Y축보다 크면 수평 스크롤로 간주하고 무시
    if (touchDeltaX > Math.abs(touchDeltaY)) {
      return
    }

    // Y축 이동이 민감도보다 클 때만 섹션 이동
    if (Math.abs(touchDeltaY) > TOUCH_SENSITIVITY) {
      if (touchDeltaY > 0) {
        moveDown()
      } else {
        moveUp()
      }
      touchStartY.value = currentY
    }

    if (e.cancelable) {
      e.preventDefault()
    }
  }, inMoveDelay / 2) // 터치에서는 더 빠른 반응성을 위해 스로틀 시간 감소

  const touchEnd = () => {
    touchStartY.value = 0
    touchStartX.value = 0
  }

  // 리사이즈 핸들러 추가
  const handleResize = throttle(() => {
    updateSectionsPosition()
  }, 100)

  onMounted(() => {
    setBodyOverflow(true)
    updateSectionsPosition()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    setBodyOverflow(false)
    window.removeEventListener('resize', handleResize)
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
