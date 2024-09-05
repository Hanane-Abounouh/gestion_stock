import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import Dashboard from '../views/Dashboards/Dashboard.vue';
import CategoryList from '../views/Dashboards/Catégories/CategoryList.vue';
import ClientList from '../views/Dashboards/clients/ClientList.vue';
import UserList from '../views/Dashboards/users/UserList.vue';
import ProduitList from '../views/Dashboards/produits/ProduitList.vue';
import FournisseurList from '../views/Dashboards/fournisseurs/FournisseurList.vue';
import CommandeList from '../views/Dashboards/Commandes/CommandeList.vue'; // Import du composant CommandeList

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoryList,
    meta: { requiresAuth: true }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientList,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: UserList,
    meta: { requiresAuth: true }
  },
  {
    path: '/produits',
    name: 'Produits',
    component: ProduitList,
    meta: { requiresAuth: true }
  },
  {
    path: '/fournisseurs',
    name: 'Fournisseurs',
    component: FournisseurList,
    meta: { requiresAuth: true }
  },
  {
    path: '/commandes',
    name: 'Commandes',
    component: CommandeList,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
