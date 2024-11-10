// 다국어 기능

import { korCategories } from './ko/categories'
import { engCategories } from './en/categories'

const ko = korCategories
const en = engCategories
export default {
  ko: ko,
  en: en
}
export type LocaleMessages = typeof ko
