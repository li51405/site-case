import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { copy } from '@/copy'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: copy.routes.home.title,
      description: copy.routes.home.description,
    },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: {
      title: copy.routes.services.title,
      description: copy.routes.services.description,
    },
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('@/views/CasesView.vue'),
    meta: {
      title: copy.routes.cases.title,
      description: copy.routes.cases.description,
    },
  },
  {
    path: '/cases/:slug',
    name: 'case-detail',
    component: () => import('@/views/CaseDetailView.vue'),
    meta: { title: copy.routes.caseDetail.title },
  },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('@/views/TechnologyView.vue'),
    meta: {
      title: copy.routes.technology.title,
      description: copy.routes.technology.description,
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: copy.routes.contact.title,
      description: copy.routes.contact.description,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: copy.routes.notFound.title },
  },
]

const router = createRouter({
  // base 跟随 Vite 的 base 配置（GitHub Pages 子路径部署时自动生效）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash)
      return {
        el: to.hash,
        top: 88,
        behavior: String(location.search).includes('noreveal') ? 'auto' : 'smooth',
      }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || copy.routes.siteTitle
  document.title = title

  const description = to.meta.description as string | undefined
  if (description) {
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', description)
  }
})

export default router
