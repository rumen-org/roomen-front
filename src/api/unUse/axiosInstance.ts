import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://back.rooemn.kro.kr/api'
})

export default axiosInstance
