const routes = [
  { path: '/', component: () => import('components/LoginPage/LoginPage.vue') },
  { path: '/test', component: () => import('components/TestTest.vue') },
  {
    path: '/HomeView',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/HomeView.vue') }],
  },
  {
    path: '/DeleteView',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/DeleteView/DeleteView.vue') }],
  },
  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/AboutPage/AboutPage.vue') }],
  },
  {
    path: '/contact-view',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/ContactView/ContactView.vue') }],
  },
  {
    path: '/AddContact',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/AddContact/AddContact.vue') }],
  },
  {
    path: '/SignUp',
    component: () => import('components/SignUp/SignUp.vue'),
  },
  {
    path: '/contact-view/:id/EditContact',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/EditContact/EditContact.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
