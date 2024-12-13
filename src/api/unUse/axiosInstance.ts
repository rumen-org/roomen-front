import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://roomen.p-e.kr/api'
})

export default axiosInstance
