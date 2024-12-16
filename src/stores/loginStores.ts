import { acceptHMRUpdate, defineStore } from 'pinia'
import axiosInstance from '@/api/unUse/axiosInstance' // Axios 인스턴스를 import
import Cookies from 'js-cookie'
import axios from 'axios'
// import { logoutHandler } from '@/api/account'

interface LoginRequest {
  memberId: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: number
    memberId: string
    role: string // role 추가
  }
}
// userId = DB Id
// memberId = 사용자 id
export const useUserStore = defineStore('user', {
  state: () => ({
    token: Cookies.get('token') as string | null,
    memberId: Cookies.get('memberId') as string | null,
    isAuthenticated: !!Cookies.get('token'),
    redirectPath: null as string | null,
    userId: Cookies.get('userId') as string | null,
    role: Cookies.get('role') as string | null
    // 로그인 이후 로그인 시도한 페이지로 이동하기 위한 로직
  }),
  actions: {
    async login(memberId: string, password: string) {
      try {
        const response = await axiosInstance.post<LoginResponse>(
          '/account/login',
          {
            memberId,
            password
          } as LoginRequest,
          {
            headers: {
              ContentType: 'application/json'
            },
            withCredentials: true
          }
        )
        const { token, user } = response.data
        this.token = token
        this.memberId = user.memberId
        this.isAuthenticated = true
        this.userId = String(user.id) // 새로운 사용자 ID 상태 추가
        this.role = user.role

        Cookies.set('token', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
          path: '/'
        })
        Cookies.set('memberId', user.memberId, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
          path: '/'
        })
        Cookies.set('userId', String(user.id), {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
          path: '/'
        })
        Cookies.set('role', user.role, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
          path: '/'
        })
        console.log('로그인 성공:', response)
        console.log('process.env.NODE_ENV', process.env.NODE_ENV)
      } catch (error) {
        console.error('로그인 실패:', error)
        // throw new Error(error?.stack?.response?.data?.error)
        throw new Error(error as string)
      }
    },
    async logout() {
      try {
        const response = await axios.post(
          'https://back.rooemn.kro.kr/api/account/logout',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token
            },
            withCredentials: true
          }
        )
        console.log('logout', response)
      } catch (error) {
        console.error(error)
      } finally {
        this.token = null
        this.memberId = null
        this.isAuthenticated = false
        this.userId = null // 로그아웃 시 사용자 ID도 초기화
        Cookies.remove('token')
        Cookies.remove('memberId')
        Cookies.remove('userId') // userId
        Cookies.remove('role') // role 쿠키에 저장
      }
    },
    async checkAuthentication() {
      try {
        const response = await axios.get('https://back.rooemn.kro.kr/api/account/check', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            ContentType: 'application/json',
            Cookie: `${this.token}`
          },
          withCredentials: true
        })
        console.log('token', this.token)
        if (response.data) {
          this.isAuthenticated = true
          console.log('인증 상태 확인 성공:', response.data)
        } else {
          this.isAuthenticated = false
        }
      } catch (error) {
        console.log('token', this.token)

        console.error('인증 상태 확인 실패:', error)
        this.isAuthenticated = false
      }
    },
    // /refresh-token API를 호출하여 토큰을 갱신하는 메서드
    async refreshToken() {
      try {
        const response = await axiosInstance.post<string>(
          '/account/refresh-token',
          {},
          {
            withCredentials: true // 쿠키를 포함하여 요청
          }
        )
        const newToken = response.data.replace('Bearer ', '')

        // 새로운 토큰을 상태에 저장하고 쿠키에도 저장
        this.token = newToken
        Cookies.set('refreshToken', newToken, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          sameSite: 'none',
          secure: true,
          path: '/'
        })
        // 새로운 토큰을 Authorization 헤더에 설정
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newToken}`
      } catch (error) {
        console.error('토큰 갱신 실패:', error)
        await this.logout() // 토큰 갱신 실패 시 로그아웃 처리
      }
    },
    async checkTokenValidity() {
      try {
        // 여기서는 token이 유효한지 확인
        if (this.token) {
          await this.checkAuthentication()
          if (!this.isAuthenticated) {
            // 인증 실패 시 토큰 갱신 시도
            await this.refreshToken()
          }
        }
      } catch (error) {
        console.error('토큰 유효성 확인 실패:', error)
        await this.logout() // 유효성 검사 실패 시 로그아웃 처리
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
