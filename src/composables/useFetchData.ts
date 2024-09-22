import { shallowRef, onMounted, Ref } from 'vue';
import axios from 'axios';

// 타입 정의
interface FetchDataResponse<T> {
    data: Ref<T | null>;
    error: Ref<any | null>;
    loading: Ref<boolean>;
    fetchData: () => Promise<void>;
}

export function useFetchData<T>(url: string): FetchDataResponse<T> {
    const data = shallowRef<T | null>(null); // shallowRef 사용
    const error = shallowRef<any | null>(null);
    const loading = shallowRef<boolean>(false);

    // Define the fetchData function
    const fetchData = async (): Promise<void> => {
        loading.value = true;
        try {
            const response = await axios.get<T>(url);
            data.value = response.data; // 직접 할당
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    // Fetch data when component is mounted
    onMounted(async () => {
        await fetchData();
    });

    // Return the values and fetchData function
    return { data, error, loading, fetchData };
}
