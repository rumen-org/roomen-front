// import { ref, computed } from 'vue';
import MockAdapter from 'axios-mock-adapter';
import {acceptHMRUpdate, defineStore} from 'pinia';
import axios from 'axios';

// Interface for user data
interface User {
    id: number;
    username: string;
    password: string;
}

// Mock user data
const users: User[] = [
    {
        id: 1,
        username: 'admin',
        password: 'admin2024',
    },
    {
        id: 2,
        username: 'user1',
        password: 'user12024',
    },
    {
        id: 3,
        username: 'user2',
        password: 'user22024',
    },
];
const mock = new MockAdapter(axios);
interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    data: {
        token: string;
        user: User;
    };
}

// Mock login API with typed request and response
mock.onPost<LoginRequest, LoginResponse>('/api/login').reply((config) => {
    const { username, password } = JSON.parse(config.data);
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        const token = 'mock-jwt-token'; // Replace with actual JWT logic

        return [200, {
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        }];
    } else {
        return [401, {
            message: 'Invalid username or password',
        }];
    }
});

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') as string | null,
        username: localStorage.getItem('username') as string | null,
        isAuthenticated: !!localStorage.getItem('token'),

    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await axios.post('/api/login', {
                    username,
                    password,
                });
                const { token, user }: { token: string; user: User } = response.data; // Type assertion for response data

                this.token = token;
                this.username = user.username;
                this.isAuthenticated = true;

                localStorage.setItem('token', token);
                localStorage.setItem('username', user.username);
                console.log('로그인 성공:', response);
            } catch (error) {
                console.error('로그인 실패:', error);
            }
        },
        logout() {
            this.token = null;
            this.username = null;
            this.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
