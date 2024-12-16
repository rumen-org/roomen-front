import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://back.roomen.r-e.kr/api'
})

export default axiosInstance
