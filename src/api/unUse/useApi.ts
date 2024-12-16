import { ref } from 'vue'
import axios, { AxiosRequestConfig } from 'axios'

// API URL
const BASE_URL = 'https://back.roomen.r-e.kr/api'

// API 상태 정의
enum ApiStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

// API 응답 데이터 타입
interface ApiResponse<T> {
  data: T
}

export function useApi() {
  const status = ref(ApiStatus.IDLE)

  async function fetchData<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T | null> {
    try {
      status.value = ApiStatus.LOADING
      const response = await axios.get<ApiResponse<T>>(`${BASE_URL}${endpoint}`, config)
      status.value = ApiStatus.SUCCESS
      console.log('response', response)
      return response.data.data // `data` 속성에서 실제 데이터를 반환
    } catch (error) {
      status.value = ApiStatus.ERROR
      console.error('API Error:', error)
      return null
    }
  }

  async function createData<T>(
    endpoint: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<boolean> {
    try {
      status.value = ApiStatus.LOADING
      await axios.post(`${BASE_URL}${endpoint}`, data, config)
      status.value = ApiStatus.SUCCESS
      return true
    } catch (error) {
      status.value = ApiStatus.ERROR
      console.error('API Error:', error)
      return false
    }
  }

  async function updateData<T>(
    endpoint: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<boolean> {
    try {
      status.value = ApiStatus.LOADING
      await axios.put(`${BASE_URL}${endpoint}`, data, config)
      status.value = ApiStatus.SUCCESS
      return true
    } catch (error) {
      status.value = ApiStatus.ERROR
      console.error('API Error:', error)
      return false
    }
  }

  async function deleteData(endpoint: string, config?: AxiosRequestConfig): Promise<boolean> {
    try {
      status.value = ApiStatus.LOADING
      await axios.delete(`${BASE_URL}${endpoint}`, config)
      status.value = ApiStatus.SUCCESS
      return true
    } catch (error) {
      status.value = ApiStatus.ERROR
      console.error('API Error:', error)
      return false
    }
  }

  return { fetchData, createData, updateData, deleteData, status }
}
