import axios from 'axios';
const BaseURL = 'http://localhost:8080/api';

export function getQNAList() {
    return axios.get(`${BaseURL}/q&a/list`)
}
export function getQNADetail(id: number) {
    return axios.get(`${BaseURL}/q&a/${id}`)
}
export function deleteQNA(id: number) {
    return axios.delete(`${BaseURL}/q&a/${id}`);
}
export function updateQNA(id: number) {
    return axios.put(`${BaseURL}/q&a/${id}`, updateQNA);
}
export function writeNQNA(data: any) {
    return axios.post(`${BaseURL}/q&a/`, data);
}