import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://18.206.213.208:8080' // 기본 URL을 여기에 설정
})

export default axiosInstance
