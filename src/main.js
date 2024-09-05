import { createApp } from 'vue';
import App from './App.vue';
import './index.css';  // Assurez-vous que le chemin est correct
import router from './router';
import store from './store';
import axios from 'axios';  // Importation d'axios

// Créez l'application Vue
const app = createApp(App);

// Configuration globale d'Axios
axios.defaults.baseURL = 'https://api.example.com';  // Remplacez par l'URL de votre API

// Ajout d'Axios aux propriétés globales de Vue
app.config.globalProperties.$axios = axios;

// Utilisation du routeur et du store
app.use(router);
app.use(store);

// Montage de l'application Vue
app.mount('#app');
