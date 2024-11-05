import axios from 'axios'
const BaseURL = 'http://localhost:8080/api'

export function getGalleryList(keyword?: string | null) {
  let url = `${BaseURL}/gallery/list`

  console.log('keyword', keyword)
  if (keyword !== null && keyword !== '' && keyword !== undefined) {
    url += `?keyword=${keyword}`
  } else {
    url = `${BaseURL}/gallery/list`
  }
  return axios.get(`${url}`)
}
export function getGalleryItem(id: number) {
  return axios.get(`${BaseURL}/gallery/${id}`)
}
