import { ref, computed } from 'vue'

export function search(lists: any[]) {
  const searchValue = ref('')

  const searchResults = computed(() => {
    return lists.filter((item) =>
      item.title.toLowerCase().includes(searchValue.value.toLowerCase())
    )
  })

  return { searchValue, searchResults }
}
