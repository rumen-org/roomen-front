import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { i18n } from './plugins/i18n'
import '@/assets/style/style.scss'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/style.css'
// 가상 DOM 생성시 보안문제를 위한 라이브러리
import VueDOMPurifyHTML from 'vue-dompurify-html'
import gsap from 'gsap'

// if (process.env.NODE_ENV === 'development'){
//   worker.start()
// }

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(PerfectScrollbarPlugin)
app.use(VueDOMPurifyHTML)
app.use(gsap)
app.mount('#app')
