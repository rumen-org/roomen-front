import axios from 'axios'
const BaseURL = 'http://localhost:8080/api'

export function getGalleryList() {
  return axios.get(`${BaseURL}/gallery/list`)
}
export function getGalleryItem(id: number) {
  return axios.get(`${BaseURL}/gallery/${id}`)
}
