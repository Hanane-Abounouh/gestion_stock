import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import store from './store';
import axios from 'axios';  // Importation d'axios

const app = createApp(App);

// Vous pouvez configurer axios ici, par exemple, pour définir une URL de base
axios.defaults.baseURL = 'https://api.example.com';  // Exemple de configuration globale

app.use(router);
app.use(store);

// Vous pouvez également ajouter axios à l'instance globale si vous voulez l'utiliser partout sans réimporter
app.config.globalProperties.$axios = axios;  // Ajout d'axios aux propriétés globales

app.mount('#app');
