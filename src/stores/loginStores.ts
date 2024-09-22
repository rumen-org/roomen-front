import { acceptHMRUpdate, defineStore } from 'pinia';
import axiosInstance from '@/api/axiosInstance'; // Axios 인스턴스를 import

interface LoginRequest {
    memberId: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        memberId: string;
    };
}

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') as string | null,
        memberId: localStorage.getItem('memberId') as string | null,
        isAuthenticated: !!localStorage.getItem('token'),
    }),
    actions: {
        async login(memberId: string, password: string) {
            try {
                const response = await axiosInstance.post<LoginResponse>('/api/account/login', {
                    memberId,
                    password,
                } as LoginRequest);
                const { token, user } = response.data;

                this.token = token;
                this.memberId = user.memberId;
                this.isAuthenticated = true;

                localStorage.setItem('token', token);
                localStorage.setItem('memberId', user.memberId);
                console.log('로그인 성공:', response);
            } catch (error) {
                console.error('로그인 실패:', error);
            }
        },
        logout() {
            this.token = null;
            this.memberId = null;
            this.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('memberId');
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
