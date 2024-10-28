import type { Ref } from 'vue'
type FetchListType = () => Promise<any>
export const useSort = (currentSort: Ref<string>, fetchList: FetchListType) => {
  const changeSorting = async (p: string) => {
    currentSort.value = p
    await fetchList()
  }

  return {
    changeSorting,
    currentSort
  }
}
