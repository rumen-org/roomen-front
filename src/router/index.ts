import { createRouter, createWebHashHistory, RouteRecordRaw, } from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'
import FullPageLayout from '@/layouts/fullMain.vue'
import ErrorLayout from '@/layouts/error.vue'
// Ts, Vue-router - 240322 한준희
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    children: [
      {
        path: '/',
        name: 'Main',
        component: () => import('@/views/main/index.vue'),
        meta: {layout: FullPageLayout, notGnb: true}
      },
      // {
      //   path: '/:item',
      //   name: 'Main-Item',
      //   component: () => import('@/views/main/[item].vue')
      // },
      {
        path: '/about',
        name: 'ABOUT ROOMEN',
        component: () => import('@/views/about/index.vue'),
        meta: {layout: DefaultLayout}
      },
      {
        path: '/cart',
        name: 'CART',
        component: () => import('@/views/cart/index.vue'),
        meta: {layout: DefaultLayout, notGnb: true, utils: true, class: 'cart'}
      },
      {
        path: '/product',
        name: 'PRODUCT',
        component: () => import('@/views/product/index.vue'),
        meta: {layout: DefaultLayout,class: 'product'},
        children: [
          {
            path: '/product/midiDesk',
            name: 'MidiDesk',
            component: () => import('@/views/product/midiDesk/index.vue'),
            meta: {layout: DefaultLayout},
            children:[
              {
                path: '',
                name: 'MidiDeskList',
                component: () => import('@/views/product/midiDesk/list.vue'),
              },
              {
                path: ':item',
                name: 'MidiDeskDetail',
                component: () => import('@/views/product/midiDesk/[item].vue'),
              }
            ]
          },
          {
            path: '/product/etc',
            name: 'ETC',
            component: () => import('@/views/product/etc/index.vue'),
            meta: {layout: DefaultLayout}
          },
        ],
      },
      {
        path: '/community',
        name: 'COMMUNITY',
        component: () => import('@/views/community/index.vue'),
        meta: {class: 'commu'},
        children: [
          {
            path: '/community/gallery',
            name: 'GALLERY',
            component: () => import('@/views/community/gallery/index.vue'),
            meta: {layout: DefaultLayout}
          },
          {
            path: '/community/notice',
            name: 'NOTICE',
            component: () => import('@/views/community/notice/index.vue'),
            meta: {layout: DefaultLayout},
            children:[
              {
                path: '',
                name: 'NOTICE',
                component: () => import('@/views/community/notice/list.vue'),
              },
              {
                path: ':item',
                name: 'NoticeItem',
                component: () => import('@/views/community/notice/[item].vue')
              },
            ]
          },
          {
            path: '/community/Q&A',
            name: 'Q&A',
            component: () => import('@/views/community/q&a/index.vue'),
            meta: {layout: DefaultLayout},
            children: [
              {
                name: 'Q&A',
                path: '',
                component: () => import('@/views/community/q&a/list.vue'),
              },
              {
                name: 'Q&A_write',
                path: 'write',
                component: () => import('@/views/community/q&a/write.vue')
              },
              {
                path: ':id',
                name: 'Q&AItem',
                component: () => import('@/views/community/q&a/[id].vue')
              }
            ]
          },

        ],
      },
      {
        path: '/login',
        name: 'LOGIN',
        meta: {layout: DefaultLayout,notGnb: true, utils: true, class: 'login'},
        children: [
          {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue'),
            meta: {layout: DefaultLayout,notGnb: true, utils: true},
          },
          {
            path: '/login/findID',
            name: 'findID',
            component: () => import('@/views/login/findId/index.vue'),
          },
          {
            path: '/login/findPW',
            name: 'findPW',
            component: () => import('@/views/login/findPw/index.vue'),
          },
        ]
      },
      {
        path: '/mypage',
        name: 'MY PAGE',
        component: () => import('@/views/my_page/index.vue'),
        meta: {layout: DefaultLayout,notGnb: true, utils: true, class: 'mypage'},
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/signUp/index.vue'),
        meta: {layout: DefaultLayout,notGnb: true}
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    meta: {
      layout: ErrorLayout,
      notGnb: true
    },
    component: () => import('@/views/404/index.vue'),
    // redirect: "/404",
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, positions) {

    console.log(to, from, positions)
    // return {
    //   top: 0,
    // }
    },
  linkActiveClass: 'nav-active',
})
router.beforeEach((to, from, next) => {
  console.log(to,from)
  next();
})

export default router