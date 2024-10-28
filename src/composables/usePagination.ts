import { ref, computed } from 'vue'
type FetchListType = () => Promise<any>

export function usePagination(fetchList: FetchListType) {
  const currentSort = ref<string>('')
  const currentPage = ref<number>(0)
  const getTotalPages = ref<number | null>(null)
  const totalPages = computed(() => {
    const arr: number[] = []
    if (getTotalPages.value !== null)
      for (let i = 0; i < getTotalPages.value; i++) {
        arr.push(i)
      }
    return arr
  })

  const changePage = async (type: string, idx: number) => {
    let getCurrent: number | null = null
    getCurrent = currentPage.value
    let calc: number

    if (type === 'prev') {
      calc = getCurrent - 1
    } else if (type === 'next') {
      calc = getCurrent + 1
    } else if (type === 'go') {
      calc = idx
    } else {
      calc = 0
    }
    currentPage.value = calc
    await fetchList()
  }

  return { currentSort, getTotalPages, currentPage, totalPages, changePage }
}
