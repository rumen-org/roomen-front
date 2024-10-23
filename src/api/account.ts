import axios from 'axios';
import {useUserStore} from "@/stores/loginStores";
const BaseURL = 'http://localhost:8080/api';
const userStore = useUserStore();

export function getMyInformation() {
    return axios.get(`${BaseURL}/account/info`, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
        },
    });
}

export function updateInformation (userData: any) {
    return axios.put(`${BaseURL}/account/update`, userData, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
        },
    });

}

export function deleteAccount () {
    return axios.delete(`${BaseURL}/account/delete`, {
        headers: {
            Authorization: `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
        },
    })
}

export function updateAccountPassword (passwords: any) {
    return axios.put(`${BaseURL}/account/changePassword`, passwords,{
        headers: {
            Authorization: `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
        },
    })
}