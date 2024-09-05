<!-- src/views/Auth/Login.vue -->
<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#c65a1b] to-[#8d362d] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 px-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <form @submit.prevent="login" class="flex flex-col gap-6">
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    required
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    for="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    required
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div class="relative">
                  <button type="submit" class="bg-[#c65a1b] text-white rounded-md px-2 py-1">Login</button>
                </div>
              </form>
              <div v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</div>
              <div class="text-center mt-4">
                <router-link to="/register" class="text-[#8d362d] hover:underline">Don't have an account? Register here.</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '' 
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        });

        const { token } = response.data;
        localStorage.setItem('authToken', token);

        console.log('Connexion réussie');
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles personnalisés ici */
</style>
