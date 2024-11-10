import axios from 'axios'
import { path } from '@/api/urls'

export function getGalleryList(keyword?: string | null) {
  let url = `${path.gallery}/list`

  if (keyword !== null && keyword !== '' && keyword !== undefined) {
    url += `?keyword=${keyword}`
  } else {
    url = `${path.gallery}/list`
  }
  return axios.get(`${url}`)
}
export function getGalleryItem(id: number) {
  return axios.get(`${path.gallery}/${id}`)
}
