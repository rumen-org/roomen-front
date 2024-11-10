import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080' // 기본 URL을 여기에 설정
})

export default axiosInstance
