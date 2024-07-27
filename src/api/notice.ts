import axios from 'axios';
const BaseURL = 'http://localhost:8080/api';

export function getNoticeList() {
    return axios.get(`${BaseURL}/notice/list`)
}
export function getNoticeDetail(id: number) {
    return axios.get(`${BaseURL}/notice/${id}`)
}
export function deleteNotice(id: number) {
    return axios.delete(`${BaseURL}/notice/${id}`);
}
export function updateNotice(id: number) {
    return axios.put(`${BaseURL}/notice/${id}`, updateNotice);
}
export function writeNotice(data: any) {
    return axios.post(`${BaseURL}/notice/`, data);
}