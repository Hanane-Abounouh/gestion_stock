import { createStore } from 'vuex';
import axios from 'axios'; // Importer axios

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    CLEAR_USER(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login', credentials);
        commit('SET_USER', response.data.user);
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/logout', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        commit('CLEAR_USER');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }
  }
});

export default store;
