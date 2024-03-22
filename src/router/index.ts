import { createRouter, createWebHashHistory, RouteRecordRaw, } from 'vue-router'

// Ts, Vue-router - 240322 한준희 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart/index.vue')
  },
  {
    path: '/community',
    name: 'Comunnity',
    component: () => import('@/views/community/index.vue'),
    children: [
      {
        path: '/community/gallery',
        name: 'Gallery',
        component: () => import('@/views/community/gallery/index.vue'),
      },
      {
        path: '/community/notice',
        name: 'Notice',
        component: () => import('@/views/community/notice/index.vue'),
      },
      {
        path: '/community/Q&A',
        name: 'Q&A',
        component: () => import('@/views/community/q&a/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: () => import('@/views/my_page/index.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/product/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, positions) {
    return {
      top: 0,
    }
  },
  linkActiveClass: 'nav-active',
})
router.beforeEach((to, from, next) => {
  // 라우터 이동시의 처리부분
  next();
})

export default router