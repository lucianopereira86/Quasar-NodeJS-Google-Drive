
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'Quasar Google Drive', component: () => import('pages/Index.vue'), meta: { isIndex: true } },
      { path: 'upload', name: 'Upload File', component: () => import('pages/Upload.vue') },
      { path: 'list', name: 'List Files', component: () => import('pages/List.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
