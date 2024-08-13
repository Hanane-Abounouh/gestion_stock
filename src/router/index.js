import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import Dashboard from '../views/Dashboards/Dashboard.vue';
import HomePage from '../views/Home.vue';

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
    meta: { requiresAuth: true } // Ajoutez cette ligne pour indiquer que cette route nécessite une authentification
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'  // Redirection pour toutes les routes inconnues
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifiez si le token est présent dans le stockage local
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  } else {
    next();
  }
});

export default router;
