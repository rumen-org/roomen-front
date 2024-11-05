import { computed, type Ref, ref, unref, UnwrapRef } from 'vue'

// FetchListType 정의
type FetchListType<T> = () => Promise<T[]> | Promise<void>

// useSearch 함수
export const useSearch = <T>(
  fetchList: FetchListType<T>,
  getList: Ref<T[]>,
  currentPage: Ref<number>
) => {
  const searchValue = ref<string>('')
  const searchResults = ref<UnwrapRef<T[]> | T[]>([])
  const searchResultLength = computed(() => searchResults.value.length)

  const searchItem = async () => {
    try {
      currentPage.value = 0
      await fetchList()
      const list = unref(getList)

      if (Array.isArray(list)) {
        searchResults.value = list as UnwrapRef<T[]>
      } else {
        console.error('Expected getList to be an array')
      }
    } catch (error) {
      console.error('Error fetching list:', error)
    }
  }
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text // 검색어가 없으면 원본 반환
    const regex = new RegExp(`(${searchTerm})`, 'gi') // 대소문자 구분 없이 검색
    return text.replace(regex, '<mark>$1</mark>') // <mark>로 강조 처리
  }
  return {
    searchValue,
    searchResults,
    searchResultLength,
    searchItem,
    highlightText
  }
}
