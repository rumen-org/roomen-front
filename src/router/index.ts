import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'
import FullPageLayout from '@/layouts/fullMain.vue'
import ErrorLayout from '@/layouts/error.vue'

// 로그인 상태, 토큰 상태
import { useUserStore } from '@/stores/loginStores'
import { storeToRefs } from 'pinia'

// Ts, Vue-router - 240322 한준희
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    children: [
      {
        path: '/',
        name: 'Main',
        component: () => import('@/views/main/index.vue'),
        meta: { layout: FullPageLayout, notGnb: true }
      },
      {
        path: '/about',
        name: 'ABOUT ROOMEN',
        component: () => import('@/views/about/index.vue'),
        meta: { layout: DefaultLayout }
      },
      {
        path: '/cart',
        name: 'CART',
        component: () => import('@/views/cart/index.vue'),
        meta: { layout: DefaultLayout, notGnb: true, utils: true, class: 'cart' }
      },
      {
        path: '/product',
        name: 'PRODUCT',
        component: () => import('@/views/product/index.vue'),
        meta: { layout: DefaultLayout, class: 'product' },
        children: [
          {
            path: '/product/midiDesk',
            name: 'MidiDesk',
            component: () => import('@/views/product/midiDesk/index.vue'),
            meta: { layout: DefaultLayout },
            children: [
              {
                path: '',
                name: 'MidiDeskList',
                component: () => import('@/views/product/midiDesk/list.vue')
              },
              {
                path: ':item',
                name: 'MidiDeskDetail',
                component: () => import('@/views/product/midiDesk/[item].vue')
              }
            ]
          },
          {
            path: '/product/etc',
            name: 'ETC',
            component: () => import('@/views/product/etc/index.vue'),
            meta: { layout: DefaultLayout }
          }
        ]
      },
      {
        path: '/community',
        name: 'COMMUNITY',
        component: () => import('@/views/community/index.vue'),
        meta: { class: 'commu' },
        children: [
          {
            path: '/community/gallery',
            name: 'GALLERY',
            component: () => import('@/views/community/gallery/index.vue'),
            meta: { layout: DefaultLayout }
          },
          {
            path: '/community/notice',
            name: 'NOTICE',
            component: () => import('@/views/community/notice/index.vue'),
            meta: { layout: DefaultLayout },
            children: [
              {
                path: '',
                name: 'NOTICEList',
                component: () => import('@/views/community/notice/list.vue')
              },
              {
                path: ':item',
                name: 'NoticeItem',
                component: () => import('@/views/community/notice/[item].vue')
              }
            ]
          },
          {
            path: '/community/Q&A',
            name: 'Q&A',
            component: () => import('@/views/community/q&a/index.vue'),
            meta: { layout: DefaultLayout },
            children: [
              {
                name: 'Q&AList',
                path: '',
                component: () => import('@/views/community/q&a/list.vue')
              },
              {
                name: 'Q&A_write',
                path: 'write',
                component: () => import('@/views/community/q&a/write.vue')
              },
              {
                name: 'Q&A_modify',
                path: '/modify/:id',
                component: () => import('@/views/community/q&a/modify/[id].vue')
              }
              // {
              //   path: ':id',
              //   name: 'Q&AItem',
              //   component: () => import('@/views/community/q&a/[id].vue')
              // }
            ]
          }
        ]
      },
      {
        name: 'Order',
        path: '/order',
        component: () => import('@/views/order/index.vue'),
        meta: { layout: DefaultLayout, notGnb: true }
      },
      {
        path: '/order/complete',
        name: 'OrderComplete',
        component: () => import('@/views/order/complete.vue'),
        meta: { layout: DefaultLayout, notGnb: true, utils: false, class: 'OrderComplete' }
      },
      {
        path: '/login',
        name: 'LOGIN',
        meta: { layout: DefaultLayout, notGnb: true, utils: true, class: 'login' },
        children: [
          {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue'),
            meta: { layout: DefaultLayout, notGnb: true, utils: true }
          },
          {
            path: '/login/findID',
            name: 'findID',
            component: () => import('@/views/login/findId/index.vue')
          },
          {
            path: '/login/findPW',
            name: 'findPW',
            component: () => import('@/views/login/findPw/index.vue')
          },
          {
            path: '/login/result',
            name: 'findResult',
            component: () => import('@/views/login/result/index.vue')
          }
        ]
      },
      {
        path: '/mypage',
        name: 'MY PAGE',
        component: () => import('@/views/my_page/index.vue'),
        meta: { layout: DefaultLayout, notGnb: true, utils: true, class: 'mypage' },
        children: [
          {
            path: '',
            redirect: '/mypage/purchaseHistory'
          },
          {
            path: '/mypage/:category',
            name: 'ChangePassword',
            component: () => import('@/views/my_page/[category].vue'),
            meta: { layout: DefaultLayout, notGnb: true, utils: true, class: 'mypage' }
          }
        ]
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/signUp/index.vue'),
        meta: { layout: DefaultLayout, notGnb: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    meta: {
      layout: ErrorLayout,
      notGnb: true
    },
    component: () => import('@/views/404/index.vue')
    // redirect: "/404",
  }
]

const router = createRouter({
  // history: createWebHistory (import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, positions) {
    console.log(to, from, positions)
    return { top: 0, left: 0 }
  },
  linkActiveClass: 'nav-active'
})
router.beforeEach((to, from, next) => {
  console.log(to, from)

  const userStore = useUserStore()
  const { isAuthenticated } = storeToRefs(userStore)

  const requiresAuth = [
    '/cart',
    '/community/Q&A/write',
    '/community/Q&A/modify/:id',
    '/community/Q&A/:id',
    '/mypage',
    '/mypage/:category',
    '/mypage/shipAddress',
    '/mypage/addShipAddress',
    '/mypage/purchaseHistory',
    '/mypage/memberInfo',
    '/mypage/changePassword',
    '/order',
    '/order/complete'
  ]
  const guestRoutes = ['/login', '/login/findID', '/login/findPW', '/signup']

  if (requiresAuth.includes(to.path) && !isAuthenticated.value) {
    alert('로그인이 필요한 기능입니다.')
    userStore.redirectPath = to.path

    next({ path: '/login' }) // 원래 경로를 쿼리 파라미터로 전달
  } else if (guestRoutes.includes(to.path) && isAuthenticated.value) {
    alert('잘못된 접근입니다.')
    next('/')
  } else {
    next()
  }
})

export default router
