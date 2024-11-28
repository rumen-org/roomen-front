import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://roomen.p-e.kr/api' // 기본 URL을 여기에 설정
})

export default axiosInstance
