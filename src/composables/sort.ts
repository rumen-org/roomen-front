// sorting.ts (Composables)
import { ref, computed } from 'vue';

export function useSorting(data: any[]) {
    const sortBy = ref<string>('latest');

    function sortByLatest(data: any[]) {
        return [...data].sort((a, b) => new Date(b.regDtm).getTime() - new Date(a.regDtm).getTime());
    }

    function sortByOldest(data: any[]) {
        return [...data].sort((a, b) => new Date(a.regDtm).getTime() - new Date(b.regDtm).getTime());
    }

    const sortedLists = computed(() => {
        let sortedData = data;
        if (sortBy.value === 'latest') {
            sortedData = sortByLatest(sortedData);
        } else {
            sortedData = sortByOldest(sortedData);
        }
        return sortedData;
    });

    function handleSorting(sortType: string) {
        sortBy.value = sortType;
    }

    // 검색 결과에 대한 정렬
    function sortSearchResults(searchResults: any[]) {
        if (searchResults.length > 0) {
            if (sortBy.value === 'latest') {
                return sortByLatest(searchResults);
            } else {
                return sortByOldest(searchResults);
            }
        } else {
            return searchResults;
        }
    }

    return {
        sortBy,
        sortedLists,
        handleSorting,
        sortSearchResults
    };
}
