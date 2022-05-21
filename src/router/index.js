import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/employers/EmployersView.vue'),
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
      component: LoginView,
      beforeEnter: (to) => {
        const auth = localStorage.getItem('token');
        if (auth) {
            return to = "/"
        }
        return true;
    } 
    },
    {
      path: '/colaboradores',
      name: 'colaboradores',
      component: () => import('../views/employers/EmployersView.vue'),
      beforeEnter: (to) => {
        const auth = localStorage.getItem('token');
        if (auth) {
            return true
        }
        return to = '/login';
    },
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
