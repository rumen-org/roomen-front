import { computed, type Ref, ref, unref, UnwrapRef } from 'vue'

// FetchListType 정의
type FetchListType = () => Promise<any>

// useSearch 함수
export const useSearch = <T>(
  fetchList: FetchListType,
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

  return {
    searchValue,
    searchResults,
    searchResultLength,
    searchItem
  }
}
