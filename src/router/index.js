import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/Auth/LoginView.vue";
import DashboardView from "../views/Dashboard/DashboardView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", 
      alias: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: (to) => {
        const auth = localStorage.getItem("token");
        if (auth) {
          return true;
        }
        return (to = "/login");
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: (to) => {
        const auth = localStorage.getItem("token");
        if (auth) {
          return (to = {name: 'dashboard'});
        }
        return true;
      },
    },
    {
      path: "/colaboradores/:userId?",
      name: "colaboradores",
      component: () => import("../views/Collaborators/CollaboratorsView.vue"),
      beforeEnter: (to) => {
        const auth = localStorage.getItem("token");
        if (auth) {
          return true;
        }
        return (to = "/login");
      },
    },
    {
      path: "/lista-colaboradores",
      name: "ListCollaborators",
      component: () => import("../views/Collaborators/ListCollaboratorsView.vue"),
      beforeEnter: (to) => {
        const auth = localStorage.getItem("token");
        if (auth) {
          return true;
        }
        return (to = "/login");
      },
    },
    {
      path: "/itens/:itemId?",
      name: "items",
      component: () => import("../views/items/ItemsView.vue"),
      beforeEnter: (to) => {
        const auth = localStorage.getItem("token");
        if (auth) {
          return true;
        }
        return (to = "/login");
      },
    },
    {
      path: "/lista-itens",
      name: "listItems",
      component: () => import("../views/items/ListItems.vue"),
      beforeEnter: (to) => {
        const auth = localStorage.getItem("token");
        if (auth) {
          return true;
        }
        return (to = "/login");
      },
    },
  ],
});

/* router.beforeEach(async (to, from) => {
  if (
    !statusLogin &&
    to.name !== 'login'
  ) {

    return { name: 'Login' }
  }
})
 */

export default router;
