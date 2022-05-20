import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to) => {
        const auth = localStorage.getItem('token');
        if (auth) {
            return true
        }
        return to = '/login';
    }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
      beforeEnter: (to) => {
        const auth = localStorage.getItem('token');
        if (auth) {
            return to = "/"
        }
        return true;
    } 
      
    },
  ]
})

/* router.beforeEach(async (to, from) => {
  if (
    !statusLogin &&
    to.name !== 'login'
  ) {

    return { name: 'Login' }
  }
})
 */


export default router
