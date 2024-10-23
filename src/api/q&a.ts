import axios from 'axios';
const BaseURL = 'http://localhost:8080/api';
import { useUserStore } from '@/stores/loginStores'

export function getQNAList() {
    return axios.get(`${BaseURL}/qna/list`)
}

export function getQNADetail(id: number, password?: string) {
    const userStore = useUserStore();
    console.log('test',id, password)
    const params = { password: password ?? "" };
    return axios.get(`${BaseURL}/qna/${id}`, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
        },
        params,
    });
}

export function writeQNA(data: any) {
    const userStore = useUserStore();

    return axios.post(`${BaseURL}/qna/write`, data, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
            'content-type': 'multipart/form-data',
        },
    });
}

export function deleteQNA(id: number) {
    const userStore = useUserStore();

    return axios.delete(`${BaseURL}/qna/${id}`, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
        },
    });
}

export function updateQNA(id: number, data: any) {
    const userStore = useUserStore();

    return axios.put(`${BaseURL}/qna/${id}`, data, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
        },
    });
}

