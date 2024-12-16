import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://back.roomen.kro.kr/api'
})

export default axiosInstance
