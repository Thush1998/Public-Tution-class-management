const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { 
        path: 'dashboard', 
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'profile', 
        component: () => import('pages/ProfilePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'users', 
        component: () => import('pages/UsersPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      { 
        path: 'attendance', 
        component: () => import('pages/AttendancePage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'payments', 
        component: () => import('pages/PaymentsPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'generate-papers', 
        component: () => import('pages/PaperGeneratorPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'analytics', 
        component: () => import('pages/AnalyticsPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ],
  },

  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
